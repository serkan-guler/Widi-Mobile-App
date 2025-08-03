import {memo, useMemo} from 'react';
import styles from './styles';
import {PageHeaderCard, TwoColorBadge} from '../../../../components';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {PoolInfo, TokenEvents, TokenStats} from '../../../../types';
import {formatNumber} from '../../../../utils';
import {useSize} from '../../../../hooks';
import {BORDER_WIDTH, SPACING} from '../../../../constants/dimensions';
import {useTokenContext} from './context';

type Props = {
  pool: PoolInfo;
};

const TabStats = ({pool}: Props) => {
  const {t} = useTranslation(['content', 'common']);
  const {statsData, selectedTime} = useTokenContext();
  const {width} = useSize();

  if (!statsData) {
    return (
      <View style={{borderWidth: 1, borderColor: 'red', padding: 30}}>
        // NOTE: No stats data dillere göre çevirilecek
        <Text style={{color: 'red'}}>No Stats Data</Text>
      </View>
    );
  }

  const cardWidth = useMemo(
    () => width - SPACING.LG * 2 - SPACING.MD_LG * 2 - BORDER_WIDTH.DEFAULT * 2,
    [width, SPACING.LG, SPACING.MD_LG, BORDER_WIDTH.DEFAULT],
  );

  const buyVolume = useMemo(
    () => statsData[selectedTime]?.volume.buys || 0,
    [statsData, selectedTime],
  );
  const sellVolume = useMemo(
    () => statsData[selectedTime]?.volume.sells || 0,
    [statsData, selectedTime],
  );

  const totalVolume = useMemo(
    () => buyVolume + sellVolume,
    [buyVolume, sellVolume],
  );

  const buy = useMemo(
    () => statsData[selectedTime]?.buys || 0,
    [statsData, selectedTime],
  );
  const sell = useMemo(
    () => statsData[selectedTime]?.sells || 0,
    [statsData, selectedTime],
  );
  const totalBuys = useMemo(() => buy + sell, [buy, sell]);

  const buyVolumePercentage = useMemo(() => {
    return totalVolume > 0 ? (buyVolume / totalVolume) * 100 : 0;
  }, [buyVolume, totalVolume]);

  const sellVolumePercentage = useMemo(() => {
    return totalVolume > 0 ? (sellVolume / totalVolume) * 100 : 0;
  }, [sellVolume, totalVolume]);

  const buyVolumeWidth = useMemo(
    () => (cardWidth / 100) * buyVolumePercentage,
    [cardWidth, buyVolumePercentage],
  );

  const sellVolumeWidth = useMemo(
    () => (cardWidth / 100) * sellVolumePercentage,
    [cardWidth, sellVolumePercentage],
  );

  const buyPercentage = useMemo(
    () => (totalBuys > 0 ? (buy / totalBuys) * 100 : 0),
    [buy, totalBuys],
  );

  const sellPercentage = useMemo(
    () => (totalBuys > 0 ? (sell / totalBuys) * 100 : 0),
    [sell, totalBuys],
  );

  const buyWidth = useMemo(
    () => (cardWidth / 100) * buyPercentage,
    [cardWidth, buyPercentage],
  );

  const sellWidth = useMemo(
    () => (cardWidth / 100) * sellPercentage,
    [cardWidth, sellPercentage],
  );

  return (
    <View style={[styles.holdersWrapper, styles.paddingHorizontal]}>
      <PageHeaderCard title={t('content:stats')} />
      <View style={styles.statsContainer}>
        <View style={styles.statsHeaderWrapper}>
          <View style={styles.row}>
            <TwoColorBadge
              title={formatNumber(pool.marketCap.usd, 2)}
              description={t('common:marketCap')}
            />
            <TwoColorBadge
              title={formatNumber(pool.txns?.volume, 2)}
              description={`${t('common:h', {value: 24})} ${t('common:volume')}`}
            />
          </View>
          <View style={styles.row}>
            <TwoColorBadge
              title={formatNumber(pool.liquidity.usd, 2)}
              description={t('common:liquidity')}
            />
            <TwoColorBadge
              title={formatNumber(pool.tokenSupply, 2)}
              description={t('common:supply')}
            />
          </View>
        </View>
        <View style={styles.statsBodyWrapper}>
          <View style={[styles.statsBodyRow]}>
            <View style={[styles.statsBodyTitleWrapper]}>
              <Text style={styles.statsBodyTitleText}>
                {t('content:buyVolume')}
              </Text>
              <Text
                style={[
                  styles.statsBodyTitleColorodText,
                  styles.statsBodyTitleSuccess,
                ]}>
                {formatNumber(statsData[selectedTime]?.volume.buys, 2)}
              </Text>
              <View
                style={[
                  styles.rangeContainer,
                  styles.rangeSuccess,
                  {width: buyVolumeWidth},
                ]}
              />
            </View>
            <View
              style={[
                styles.statsBodyTitleWrapper,
                styles.statsBodyTitleEndWrapper,
              ]}>
              <Text style={styles.statsBodyTitleText}>
                {t('content:sellVolume')}
              </Text>
              <Text
                style={[
                  styles.statsBodyTitleColorodText,
                  styles.statsBodyTitleDanger,
                ]}>
                {formatNumber(sellVolume, 2)}
              </Text>
              <View
                style={[
                  styles.rangeContainer,
                  styles.rangeDanger,
                  {width: sellVolumeWidth},
                ]}
              />
            </View>
          </View>
          <View style={styles.statsBodyRow}>
            <View style={[styles.statsBodyTitleWrapper]}>
              <Text style={styles.statsBodyTitleText}>{t('content:buys')}</Text>
              <Text
                style={[
                  styles.statsBodyTitleColorodText,
                  styles.statsBodyTitleSuccess,
                ]}>
                {formatNumber(buy, 2)}
              </Text>
              <View
                style={[
                  styles.rangeContainer,
                  styles.rangeSuccess,
                  {width: buyWidth},
                ]}
              />
            </View>
            <View
              style={[
                styles.statsBodyTitleWrapper,
                styles.statsBodyTitleEndWrapper,
              ]}>
              <Text style={styles.statsBodyTitleText}>
                {t('content:sells')}
              </Text>
              <Text
                style={[
                  styles.statsBodyTitleColorodText,
                  styles.statsBodyTitleDanger,
                ]}>
                {formatNumber(sell, 2)}
              </Text>
              <View
                style={[
                  styles.rangeContainer,
                  styles.rangeDanger,
                  {width: sellWidth},
                ]}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(TabStats);
