import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import styles from './styles_old';
import {
  CreationBadge,
  Header,
  Img,
  Layout,
  SolanaAbsoluteImage,
  Tabs,
} from '../../../../components';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AppStackScreenProps,
  ChartResponse,
  ChartTimeType,
  PoolInfo,
  TokenDetailResponse,
  TokenEvents,
  TokenHoldersResponse,
  TokenPoolTxns,
  TokenStats,
  Trade,
} from '../../../../types';
import {SPACING} from '../../../../constants/dimensions';
import {BlurView} from '@react-native-community/blur';
import {useTranslation} from 'react-i18next';
import {
  copyToClipboard,
  ellipsizeString,
  formatNumber,
} from '../../../../utils';
import {DocumentsIcon} from '../../../../assets/icons';
import {COLORS} from '../../../../constants/colors';
import {chartTimeData} from '../../../../lib/data';
import {tokenChartDataService, tokenDetailService} from '../../../../services';
import {showAlert} from '../../../../utils/alert';
import TabStats from './Stats';
import YourPosition from './YourPosition';
import Holders from './Holders';
import About from './About';
import Chart from './Chart';
import {useWebSocket} from '../../../../hooks';

const TokenDetailScreen = ({
  route,
  navigation,
}: AppStackScreenProps<'TokenDetail'>) => {
  const {t} = useTranslation(['navigation', 'common', 'content']);
  const {sendMessage, onPool, offPool, onTransaction, offTransaction} =
    useWebSocket();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedTime, setSelectedTime] = useState<ChartTimeType>('1h');
  const [tokenData, setTokenData] = useState<TokenDetailResponse>();
  const [chartData, setChartData] = useState<{
    [key in ChartTimeType]: ChartResponse[];
  }>({
    '1m': [],
    '15m': [],
    '1h': [],
    '4h': [],
    '24h': [],
  });
  const [chartDataIsLoading, setChartDataIsLoading] = useState(false);
  const [statsData, setStatsData] = useState<TokenStats>();
  const [holdersData, setHoldersData] = useState<TokenHoldersResponse>();
  const [haveToken, setHaveToken] = useState(false);

  const lpBurn = useMemo(
    () => (tokenData ? tokenData.pools[0].lpBurn : 0),
    [tokenData],
  );

  const labels = [
    t('content:about'),
    t('content:yourPosition'),
    t('content:stats'),
    `${t('content:holders')} (${holdersData?.total || 0})`,
  ];

  const getChartData = useCallback(async () => {
    if (chartDataIsLoading && chartData[selectedTime].length === 0) {
      const {mint, pool} = route.params;
      const response = await tokenChartDataService(mint, pool, selectedTime);
      console.log('Chart data response:', response);
      if (response.status === 'success') {
        setChartData(prev => ({
          ...prev,
          [selectedTime]: response.data,
        }));
      } else {
        showAlert(response.status, response.message, [
          {
            text: t('common:close'),
            style: 'cancel',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      }
    }
    setChartDataIsLoading(false);
  }, [route.params, selectedTime, chartDataIsLoading, chartData]);

  const getData = useCallback(async () => {
    const {mint, pool} = route.params;
    const response = await tokenDetailService(mint, pool, selectedTime);
    console.log('Token detail response:', response);
    if (response.status === 'success') {
      let tokenInfo = response.data.tokenInfo;
      const pools = [{wallet: mint, poolId: pool}];
      sendMessage('subscribeToPool', pools);
      if (tokenInfo.pools.length > 0) {
        const foundPool = tokenInfo.pools.find(
          pool => pool.poolId === route.params.pool,
        );

        if (foundPool) {
          tokenInfo.pools = [foundPool];
        }
      }
      setTokenData(tokenInfo);
      setChartData(prev => ({
        ...prev,
        [selectedTime]: response.data.chartData,
      }));
      setStatsData(response.data.stats);
      setHoldersData(response.data.holders);
      const tokens = response.data.tokens || [];
      const foundToken = tokens.find(token => token.address === mint);
      if (foundToken) {
        setHaveToken(true);
      }
    } else {
      showAlert(response.status, response.message, [
        {
          text: t('common:close'),
          style: 'cancel',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }

    setIsLoading(false);
  }, []);
  useEffect(() => {
    getData();

    return () => {
      console.log('TokenDetailScreen unmounted: ', route.params);
    };
  }, [route.params, getData]);

  useEffect(() => {
    const updateTokenInData = (pollData: PoolInfo) => {
      console.log('Pool data received:', pollData);
      setTokenData(prevData => {
        if (prevData) {
          const updatedPools = prevData.pools.map(pool => {
            if (pool.poolId === pollData.poolId) {
              return {
                ...pool,
                marketCap: pollData.marketCap,
                price: pollData.price,
                liquidity: pollData.liquidity,
              };
            }
            return pool;
          });
          return {...prevData, pools: updatedPools};
        }
        return prevData;
      });
    };

    const updateTransactionInData = (tradeData: Trade) => {
      // console.log('Trade data received:', tradeData);
      setTokenData(prevData => {
        if (prevData) {
          const updatedPools = prevData.pools.map((pool, index) => {
            if (index === 0) {
              const oldBuys = pool.txns?.buys || 0;
              const oldSells = pool.txns?.sells || 0;
              const buys = tradeData.type === 'buy' ? oldBuys + 1 : oldBuys;
              const sells = tradeData.type === 'sell' ? oldSells + 1 : oldSells;
              const total = buys + sells;
              return {
                ...pool,
                txns: {
                  buys,
                  total,
                  volume: tradeData.volume,
                  sells,
                } as TokenPoolTxns,
                price: {
                  ...pool.price,
                  usd: tradeData.priceUsd,
                },
              };
            }
            return pool;
          });
          return {...prevData, pools: updatedPools};
        }
        return prevData;
      });
    };

    if (!isLoading) {
      if (tokenData && tokenData.pools.length > 0) {
        const poolId = tokenData?.pools[0]?.poolId;
        console.log('Subscribing to pool:', poolId);
        onPool(poolId, updateTokenInData);
        onTransaction(tokenData.token.mint, updateTransactionInData);
      }
    }

    return () => {
      if (tokenData && tokenData.pools.length > 0) {
        const poolId = tokenData?.pools[0]?.poolId;
        console.log('Unsubscribing from pool:', poolId);
        offPool(poolId, updateTokenInData);
        offTransaction(tokenData.token.mint, updateTransactionInData);
      }
    };
  }, [isLoading]);

  useEffect(() => {
    getChartData();
  }, [getChartData]);

  return (
    <Layout isLoading={isLoading} padding={false}>
      {tokenData && holdersData && statsData && (
        <View style={styles.container}>
          <ScrollView style={styles.scrollContainer}>
            <Header
              onPressBack={() => navigation.goBack()}
              title={t('navigation:tokenDetails')}
            />
            <View style={styles.titleContainer}>
              <View style={styles.titleLeftContainer}>
                <View style={[styles.imageContainer, styles.imageSize]}>
                  <Img
                    source={tokenData.token.image}
                    style={styles.imageSize}
                    resizeMode="cover"
                  />
                  <SolanaAbsoluteImage />
                </View>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameText}>{tokenData.token.symbol}</Text>
                  <View style={styles.creationContainer}>
                    <CreationBadge
                      createdAt={tokenData.token.creation?.created_time}
                    />
                    {tokenData.pools[0]?.market
                      .toLowerCase()
                      .includes('pumpfun') && (
                      <View style={styles.marketContainer}>
                        <Img source="capsule" />
                      </View>
                    )}
                    {tokenData.pools[0]?.market
                      .toLowerCase()
                      .includes('raydium') && (
                      <View style={styles.marketContainer}>
                        <Img source="raydium" />
                      </View>
                    )}
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.titleRightContainer}
                onPress={() => {
                  copyToClipboard(tokenData.token.mint);
                }}>
                <Text style={styles.copyText}>
                  {ellipsizeString(tokenData.token.mint, 4, 4, 3)}
                </Text>
                <DocumentsIcon color={COLORS.WHITE} />
              </TouchableOpacity>
            </View>
            <View style={styles.marketCapContainer}>
              <Text style={styles.marketCapText}>
                {formatNumber(tokenData.pools[0]?.marketCap.usd, 2)}
              </Text>
              <View style={styles.rateContainer}>
                <View
                  style={[
                    styles.badgeStyle,
                    tokenData.events[selectedTime] &&
                    tokenData.events[selectedTime].priceChangePercentage < 0
                      ? styles.badgeDanger
                      : styles.badgeSuccess,
                  ]}>
                  <Text
                    style={[
                      styles.badgeText,
                      styles.fontTelegraph,
                      tokenData.events[selectedTime] &&
                      tokenData.events[selectedTime].priceChangePercentage < 0
                        ? styles.badgeTextDanger
                        : styles.badgeTextSuccess,
                    ]}>
                    {tokenData.events[
                      selectedTime
                    ]?.priceChangePercentage.toFixed(2) || 0}
                    <Text
                      style={[
                        styles.badgeText,
                        styles.fontNeueu,
                        tokenData.events[selectedTime] &&
                        tokenData.events[selectedTime].priceChangePercentage < 0
                          ? styles.badgeTextDanger
                          : styles.badgeTextSuccess,
                      ]}>
                      %
                    </Text>
                  </Text>
                </View>
                <Text style={styles.rateText}>
                  $
                  {tokenData.pools[0]?.price.usd.toFixed(
                    tokenData.token.decimals,
                  ) || 0}
                </Text>
              </View>
            </View>
            <View style={styles.chartContainer}>
              {chartDataIsLoading && (
                <>
                  <BlurView
                    style={[styles.absolute, styles.chartBlur]}
                    blurType="dark"
                    blurAmount={2}
                    reducedTransparencyFallbackColor="black"
                  />
                  <View style={[styles.absolute, styles.chartContainerLoading]}>
                    <ActivityIndicator color={COLORS.PRIMARY} />
                  </View>
                </>
              )}
              <View style={styles.chartHeader}>
                {chartTimeData.map((item, index) => {
                  const timeRangeKey =
                    `${item.key}${item.value}` as ChartTimeType;
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.timeButton,
                        timeRangeKey === selectedTime
                          ? styles.timeButtonActiveColor
                          : styles.timeButtonColor,
                      ]}
                      onPress={() => {
                        setSelectedTime(timeRangeKey);
                        setChartDataIsLoading(true);
                      }}>
                      <Text
                        style={[
                          styles.timeText,
                          timeRangeKey === selectedTime
                            ? styles.timeTextActiveColor
                            : styles.timeTextColor,
                        ]}>
                        {t(`common:${item.value}`, {value: item.key})}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View style={styles.chartWrapper}>
                <Chart data={chartData[selectedTime]} />
              </View>
            </View>
            <View style={styles.tabsContainer}>
              <Tabs labels={labels}>
                <Tabs.Content>
                  <About data={tokenData.risk.risks} lpBurn={lpBurn} />
                </Tabs.Content>
                <Tabs.Content>
                  <YourPosition />
                </Tabs.Content>
                <Tabs.Content>
                  <TabStats
                    statsData={statsData}
                    time={selectedTime}
                    pool={tokenData.pools[0]}
                  />
                </Tabs.Content>
                <Tabs.Content>
                  <Holders holdersData={holdersData.accounts} />
                </Tabs.Content>
              </Tabs>
            </View>
          </ScrollView>
          <View
            style={[
              styles.buttonsContainer,
              {
                paddingBottom: SPACING.PAGE_BOTTOM,
              },
            ]}>
            <BlurView
              style={[styles.absolute, styles.blurContainer]}
              blurType="dark"
              blurAmount={30}
              reducedTransparencyFallbackColor="black"
            />
            <TouchableOpacity
              style={[styles.button, styles.buyButton]}
              onPress={() => {
                navigation.navigate('TokenTrade', {
                  mint: tokenData.token.mint,
                  symbol: tokenData.token.symbol,
                  type: 'buy',
                  image: tokenData.token.image,
                });
              }}>
              <Text style={[styles.buttonText, styles.buyButtonText]}>
                {t('common:buy')}
              </Text>
            </TouchableOpacity>
            {haveToken && (
              <TouchableOpacity
                style={[styles.button, styles.sellButton]}
                onPress={() => {
                  navigation.navigate('TokenTrade', {
                    mint: tokenData.token.mint,
                    symbol: tokenData.token.symbol,
                    type: 'sell',
                    image: tokenData.token.image,
                  });
                }}>
                <Text style={[styles.buttonText, styles.sellButtonText]}>
                  {t('common:sell')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </Layout>
  );
};

export default memo(TokenDetailScreen);
