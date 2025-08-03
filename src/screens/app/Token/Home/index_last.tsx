import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles_last';
import {
  Header,
  ListLoading,
  PageHeaderCard,
  PageLoading,
  TokenCard,
} from '../../../../components';
import {useTranslation} from 'react-i18next';
import {useApp, useFilter, useSize, useWebSocket} from '../../../../hooks';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SCREEN_NAMES} from '../../../../constants/navigation';
import {FilterIcon, RouteSplitIcon, SearchIcon} from '../../../../assets/icons';
import {
  MainTabScreenProps,
  PoolInfo,
  TabName,
  TokenEvents,
  TokenResponse,
  Trade,
} from '../../../../types';
import {parseTimeRange, sleep} from '../../../../utils';
import {COLORS} from '../../../../constants/colors';
import {scaleFont, scaleSize} from '../../../../constants/dimensions';
import Loading from './Loading';
import {tokensService} from '../../../../services';
import {showErrorAlert} from '../../../../utils/alert';
import {BlurView} from '@react-native-community/blur';
import {useFocusEffect} from '@react-navigation/native';

const tabNames: TabName[] = [
  'trending',
  'volume',
  'marketCap',
  'new',
  'aboutToGraduate',
  'graduate',
];

const TokenScreen = ({navigation}: MainTabScreenProps<'Token'>) => {
  const {t} = useTranslation(['navigation', 'common', 'content']);
  const {
    height,
    safeArea: {top},
  } = useSize();
  const {bottomTabBarHeight} = useApp();
  const {
    tokenFilter,
    timeRange: contextTimeRange,
    clearTimeRange,
  } = useFilter();
  const {sendMessage, onPool, offPool, onTransaction, offTransaction} =
    useWebSocket();

  const flatListRef = useRef<FlatList>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState<{[key in TabName]: boolean}>({
    ...tabNames.reduce(
      (acc, name) => {
        acc[name] = false;
        return acc;
      },
      {} as {[key in TabName]: boolean},
    ),
  });
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedTabName, setSelectedTabName] = useState<TabName>('trending');
  const [topContentHeight, setTopContentHeight] = useState(0);
  const [timeRange, setTimeRange] = useState<keyof TokenEvents>('24h');

  const [trendingData, setTrendingData] = useState<TokenResponse[]>([]);
  const [volumeData, setVolumeData] = useState<TokenResponse[]>([]);
  const [newData, setNewData] = useState<TokenResponse[]>([]);
  const [marketCapData, setMarketCapData] = useState<TokenResponse[]>([]);
  const [graduateData, setGraduateData] = useState<TokenResponse[]>([]);
  const [toGraduateData, setToGraduateData] = useState<TokenResponse[]>([]);

  const {number, unit} = parseTimeRange(timeRange) || {number: '24', unit: 'h'};

  const containerHeight = useMemo(
    () => height - bottomTabBarHeight,
    [height, bottomTabBarHeight],
  );

  const contentHeight = useMemo(
    () => containerHeight - topContentHeight,
    [containerHeight, topContentHeight],
  );

  const tabHasMore = useMemo(
    () => hasMore[selectedTabName],
    [hasMore, selectedTabName],
  );

  const tabStates = useCallback(
    (name?: TabName) => {
      const cbName = name || selectedTabName;

      switch (cbName) {
        case 'trending':
          return {
            data: trendingData,
            setData: setTrendingData,
            dataString: trendingData.map(token => token.mint),
          };
        case 'volume':
          return {
            data: volumeData,
            setData: setVolumeData,
            dataString: volumeData.map(token => token.mint),
          };
        case 'marketCap':
          return {
            data: marketCapData,
            setData: setMarketCapData,
            dataString: marketCapData.map(token => token.mint),
          };
        case 'new':
          return {
            data: newData,
            setData: setNewData,
            dataString: newData.map(token => token.mint),
          };
        case 'aboutToGraduate':
          return {
            data: toGraduateData,
            setData: setToGraduateData,
            dataString: toGraduateData.map(token => token.mint),
          };
        case 'graduate':
          return {
            data: graduateData,
            setData: setGraduateData,
            dataString: graduateData.map(token => token.mint),
          };
        default:
          return {data: [], setData: () => {}, dataString: []};
      }
    },
    [
      selectedTabName,
      trendingData,
      volumeData,
      marketCapData,
      newData,
      toGraduateData,
      graduateData,
    ],
  );

  const tabData = useMemo(() => {
    const {data} = tabStates();
    return data;
  }, [tabStates]);

  const fetchData = useCallback(
    async (name?: TabName) => {
      const selectedName = name || selectedTabName;
      const {data, setData, dataString} = tabStates(name);
      const response = await tokensService({
        type: selectedName,
        ...tokenFilter,
        timeRange,
        startCount: data.length.toString(),
      });

      if (response.status === 'success') {
        console.log('Tokens response:', response);
        const newTokenData = response.data.tokens.filter(
          token => !dataString.includes(token.mint),
        );
        setData([...data, ...newTokenData]);
        setHasMore(prev => ({
          ...prev,
          [selectedName]: response.data.hasMore,
        }));
        const pools = response.data.tokens.map(token => ({
          wallet: token.mint,
          poolId: token.poolId,
        }));
        sendMessage('subscribeToPool', pools);
        setIsLoading(false);
      } else {
        showErrorAlert(response);
      }
    },
    [tokensService, selectedTabName, tokenFilter, timeRange, tabStates],
  );

  const handleTabPress = useCallback(
    (index: number) => {
      const selectedName = tabNames[index];
      setSelectedTabIndex(index);
      setSelectedTabName(selectedName);

      const {data} = tabStates(selectedName);
      if (data.length === 0) {
        fetchData(selectedName);
      }
    },
    [tabNames, fetchData],
  );

  const handleRenderItem = useCallback(
    ({item}: {item: TokenResponse}) => (
      <TokenCard
        token={item}
        time={timeRange}
        onPress={() =>
          navigation.getParent()?.navigate(SCREEN_NAMES.APP.TOKEN_DETAIL, {
            mint: item.mint,
            pool: item.poolId,
          })
        }
      />
    ),
    [timeRange, navigation],
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    // await sleep(500);
    const response = await tokensService({
      type: selectedTabName,
      ...tokenFilter,
      timeRange,
      startCount: '0',
    });

    if (response.status === 'success') {
      const {setData} = tabStates();
      setIsLoading(false);
      setData(response.data.tokens);
      setHasMore(prev => ({
        ...prev,
        [selectedTabName]: response.data.hasMore,
      }));
    } else {
      showErrorAlert(response);
    }
    setRefreshing(false);
  }, [tokensService, selectedTabName, tokenFilter, timeRange, tabStates]);

  useEffect(() => {
    setTrendingData([]);
    setVolumeData([]);
    handleRefresh();
  }, [tokenFilter]);

  const handleLoadMore = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({offset: 0, animated: false});
    }
  }, [selectedTabIndex]);

  const handleContextTimeRange = useCallback(() => {
    if (contextTimeRange) {
      if (contextTimeRange !== timeRange) {
        setTimeRange(contextTimeRange);
        clearTimeRange();
        setTrendingData([]);
        setVolumeData([]);
        handleRefresh();
      }
    }
  }, [contextTimeRange, tabData, timeRange]);

  useFocusEffect(handleContextTimeRange);

  useEffect(() => {
    if (tabData.length === 0) return;
    const currentPools = tabData.map(token => token.poolId);
    const currentWallets = tabData.map(token => token.mint);

    const updateTokenInData = (pollData: PoolInfo) => {
      const {setData} = tabStates();

      setData(prevTokens => {
        const updatedTokens = prevTokens.map(token =>
          token.poolId === pollData.poolId
            ? {
                ...token,
                liquidityUsd: pollData.liquidity.usd,
                marketCapUsd: pollData.marketCap.usd,
                priceUsd: pollData.price.usd,
              }
            : token,
        );

        return updatedTokens;
      });
    };

    const updateTransactionInData = (tradeData: Trade) => {
      const {setData} = tabStates();

      setData(prevTokens => {
        const updatedTokens = prevTokens.map(token =>
          token.mint === tradeData.wallet
            ? {
                ...token,
                volume: tradeData.volume,
              }
            : token,
        );

        return updatedTokens;
      });
    };

    currentPools.forEach(poolId => {
      onPool(poolId, updateTokenInData);
    });

    currentWallets.forEach(wallet => {
      onTransaction(wallet, updateTransactionInData);
    });

    return () => {
      console.log('*** TokenScreen unmounted, cleaning up listeners ***');
      currentPools.forEach(poolId => {
        offPool(poolId, updateTokenInData);
      });
      currentWallets.forEach(wallet => {
        offTransaction(wallet, updateTransactionInData);
      });
    };
  }, [selectedTabName, tabData.length]);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <View
      style={[
        styles.container,
        {
          height: containerHeight,
        },
      ]}>
      <View
        style={[styles.topWrapper, {paddingTop: top}]}
        onLayout={e => {
          const {height} = e.nativeEvent.layout;
          setTopContentHeight(height);
          console.log('Top content height: ', height);
        }}>
        <Header title={t('navigation:token')} />
        <View style={styles.pageHeaderContainer}>
          <PageHeaderCard title={t(`navigation:token`)}>
            <View style={styles.pageHeaderRightContainer}>
              <TouchableOpacity
                style={[styles.headerButton, styles.headerLeftButton]}
                onPress={() =>
                  navigation.getParent()?.navigate(SCREEN_NAMES.APP.SORT_TIME, {
                    range: timeRange,
                  })
                }>
                <Text style={styles.headerButtonText}>
                  {t(`common:${unit}`, {value: number})}
                </Text>
                <RouteSplitIcon
                  width={scaleFont(11)}
                  height={scaleFont(9)}
                  color={COLORS.WHITE}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.headerButton, styles.headerRightButton]}
                onPress={() =>
                  navigation
                    .getParent()
                    ?.navigate(SCREEN_NAMES.APP.TOKEN_FILTER)
                }>
                <FilterIcon color={COLORS.WHITE} />
              </TouchableOpacity>
            </View>
          </PageHeaderCard>
        </View>
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={() =>
            navigation.getParent()?.navigate(SCREEN_NAMES.APP.TOKEN_SEARCH)
          }>
          <SearchIcon
            width={scaleSize(17)}
            height={scaleSize(17)}
            color={COLORS.WHITE}
          />
          <Text style={styles.searchText}>{t('common:searchToken')}</Text>
        </TouchableOpacity>
        <ScrollView
          style={[styles.tabTriggerContainer]}
          contentContainerStyle={styles.tabTriggerContent}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces>
          {tabNames.map((name, index) => (
            <TouchableOpacity
              key={index}
              disabled={refreshing}
              style={[
                styles.tabButton,
                styles.tabButtonDefault,
                index === 0 && styles.tabButtonFirst,
                index === tabNames.length - 1 && styles.tabButtonLast,
                index === selectedTabIndex && styles.tabButtonActive,
              ]}
              onPress={() => handleTabPress(index)}>
              <Text
                style={[
                  styles.tabText,
                  styles.tabTextDefault,
                  index === selectedTabIndex && styles.tabTextActive,
                ]}>
                {t(`content:${name}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={[styles.contentWrapper, {height: contentHeight}]}>
        {tabData.length > 0 ? (
          <>
            {refreshing && (
              <>
                <BlurView
                  style={[
                    styles.refreshContainer,
                    styles.absoluteContainer,
                    {zIndex: 100},
                  ]}
                  blurAmount={10}
                  blurType="dark"
                  reducedTransparencyFallbackColor="rgba(0,0,0,0.5)"
                />
                <View style={[styles.absoluteContainer, {zIndex: 200}]}>
                  <Loading text={t('common:reloading')} />
                </View>
              </>
            )}
            <FlatList
              ref={flatListRef}
              data={tabData}
              style={styles.flatList}
              contentContainerStyle={styles.flatListContentContainer}
              keyExtractor={item => item.mint.toString()}
              keyboardShouldPersistTaps="handled"
              renderItem={handleRenderItem}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              onEndReachedThreshold={0.1}
              onEndReached={handleLoadMore}
              ListFooterComponent={tabHasMore ? <ListLoading /> : null}
            />
          </>
        ) : (
          <Loading />
        )}
      </View>
    </View>
  );
};

export default memo(TokenScreen);
