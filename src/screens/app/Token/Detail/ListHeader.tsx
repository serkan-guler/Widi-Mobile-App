import {memo, useEffect, useMemo} from 'react';
import styles from './styles';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CreationBadge,
  Header,
  Img,
  Modal,
  PageHeaderCard,
  SolanaAbsoluteImage,
} from '../../../../components';
import type {
  AppStackParamList,
  PnLData,
  TokenDetailResponse,
} from '../../../../types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {
  copyToClipboard,
  ellipsizeString,
  formatNumber,
} from '../../../../utils';
import {DocumentsIcon} from '../../../../assets/icons';
import {COLORS} from '../../../../constants/colors';
import {useSize} from '../../../../hooks';
import {utcOffsets} from '../../../../lib/data';
import Chart from './Chart';
import {useTokenContext} from './context';
import About from './About';
import Holders from './Holders';
import Stats from './Stats';
import YourPosition from './YourPosition';

type Props = {
  navigation: NativeStackNavigationProp<
    AppStackParamList,
    'TokenDetail',
    undefined
  >;
  tokenData: TokenDetailResponse;
  pnlData?: PnLData;
  solPrice: number;
};

const ListHeader = ({navigation, tokenData, pnlData, solPrice}: Props) => {
  const {t} = useTranslation(['navigation', 'common', 'content']);
  const {safeHeight} = useSize();
  const {
    mint,
    selectedTime,
    timeZoneModalVisible,
    toggleTimeZoneModal,
    marketCapModalVisible,
    toggleMarketCapModal,
    selectedTimeZone,
    onChangeTimeZone,
    chartDataType,
    onChangeChartDataType,
    selectedTab,
    onChangeSelectedTab,
    holdersCount,
    onSetHoldersCount,
    statsData,
  } = useTokenContext();

  const lpBurn = useMemo(
    () => (tokenData ? tokenData.pools[0].lpBurn : 0),
    [tokenData],
  );

  const labelNames = [
    t('content:about'),
    t('content:yourPosition'),
    t('content:stats'),
    `${t('content:holders')} (${holdersCount.toLocaleString()})`,
  ];

  const labels = useMemo(() => {
    if (pnlData) {
      return labelNames;
    }

    return labelNames.filter((_, index) => index !== 1);
  }, [pnlData, mint, labelNames]);

  const statsTabIndex = useMemo(() => (labels.length === 4 ? 2 : 1), [labels]);

  const showStatsTab = useMemo(() => {
    if (labels.length === 4) return selectedTab === 2;

    return selectedTab === 1;
  }, [labels, selectedTab]);

  const showHoldersTab = useMemo(() => {
    if (labels.length === 4) return selectedTab === 3;

    return selectedTab === 2;
  }, [labels, selectedTab]);

  useEffect(() => {
    onSetHoldersCount(tokenData.holders || 0);
  }, [tokenData]);

  return (
    <View>
      <Modal visible={marketCapModalVisible} onClose={toggleMarketCapModal}>
        <View style={styles.modalContainer}>
          <PageHeaderCard title={t('content:chartType')} />
          <TouchableOpacity
            style={styles.modalTextContainer}
            onPress={() => onChangeChartDataType('marketCap')}>
            <Text
              style={[
                styles.modalText,
                chartDataType === 'marketCap'
                  ? styles.modalTextSelected
                  : styles.modalTextUnselected,
              ]}>
              {t('common:marketCap')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalTextContainer}
            onPress={() => onChangeChartDataType('price')}>
            <Text
              style={[
                styles.modalText,
                chartDataType === 'price'
                  ? styles.modalTextSelected
                  : styles.modalTextUnselected,
              ]}>
              {t('common:price')}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal visible={timeZoneModalVisible} onClose={toggleTimeZoneModal}>
        <ScrollView
          style={[
            styles.modalContainer,
            {minHeight: safeHeight / 2, maxHeight: safeHeight / 2},
          ]}>
          <PageHeaderCard title={t('content:chartZone')} />
          {utcOffsets.map(utcOffsets => (
            <TouchableOpacity
              style={styles.modalTextContainer}
              key={utcOffsets.value}
              onPress={() => {
                onChangeTimeZone(utcOffsets.value);
              }}>
              <Text
                style={[
                  styles.modalText,
                  selectedTimeZone === utcOffsets.value
                    ? styles.modalTextSelected
                    : styles.modalTextUnselected,
                ]}>
                {utcOffsets.zone} {t(`content:zone.${utcOffsets.i18Label}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Modal>
      <View style={styles.paddingHorizontal}>
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
        <View style={styles.contentContainer}>
          <View style={styles.contentLeftContainer}>
            <TouchableOpacity
              style={styles.titleRightContainer}
              onPress={toggleTimeZoneModal}>
              <Text style={styles.copyText}>UTC{selectedTimeZone}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.titleRightContainer}
              onPress={toggleMarketCapModal}>
              <Text style={styles.copyText}>
                {t(`common:${chartDataType}`)}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentRightContainer}>
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
        </View>
        <Chart navigation={navigation} />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.triggerScroll}
        contentContainerStyle={styles.triggerContainer}>
        {labels.map((label, index) => (
          <TouchableOpacity
            key={index}
            disabled={statsTabIndex === index && !statsData}
            style={[
              styles.triggerButton,
              index === 0 && styles.firstTrigger,
              selectedTab === index
                ? styles.triggerButtonActive
                : styles.triggerButtonDefault,
            ]}
            onPress={() => onChangeSelectedTab(index)}>
            {statsTabIndex === index && !statsData ? (
              <ActivityIndicator size="small" color={COLORS.WHITE} />
            ) : (
              <Text
                style={[
                  styles.triggerText,
                  selectedTab === index
                    ? styles.triggerTextActive
                    : styles.triggerTextDefault,
                ]}>
                {label}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedTab === 0 && (
        <About data={tokenData.risk.risks} lpBurn={lpBurn} />
      )}
      {pnlData && selectedTab === 1 && (
        <YourPosition
          data={pnlData}
          decimals={tokenData.token.decimals}
          price={tokenData.pools[0].price.usd}
          solPrice={solPrice}
        />
      )}
      {showStatsTab && <Stats pool={tokenData.pools[0]} />}
      {showHoldersTab && <Holders />}
    </View>
  );
};

export default memo(ListHeader);
