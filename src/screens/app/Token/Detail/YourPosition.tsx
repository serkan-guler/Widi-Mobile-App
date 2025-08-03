import {memo, useMemo} from 'react';
import styles from './styles';
import {PageHeaderCard, TwoColorBadge} from '../../../../components';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {PnLData} from '../../../../types';

type Props = {
  data: PnLData;
  decimals: number;
  price: number;
  solPrice: number;
};

const YourPosition = ({data, decimals, price, solPrice}: Props) => {
  const {t} = useTranslation(['content']);

  const percentage = useMemo(() => {
    const total = data.total;
    return (total / data.total_invested) * 100;
  }, [data.total, data.total_invested]);

  return (
    <View style={[styles.paddingHorizontal, styles.auditWrapper]}>
      <PageHeaderCard title={t('content:yourPosition')} />
      <View style={styles.statsContainer}>
        <View style={styles.statsHeaderWrapper}>
          <View style={styles.row}>
            <TwoColorBadge
              title={data.holding.toFixed(decimals)}
              description={t('content:positionSize')}
            />
          </View>
          <View style={styles.row}>
            <TwoColorBadge
              title={`SOL ${Number(data.total_invested / solPrice).toFixed(5)}`}
              description={t('content:totalBought')}
            />
            <TwoColorBadge
              title={`$${data.total_sold.toFixed(2)}`}
              description={t('content:totalSold')}
            />
          </View>
          <View style={styles.row}>
            <TwoColorBadge
              title={`$${data.cost_basis.toFixed(decimals)}`}
              description={t('content:averageCost')}
            />
          </View>
          <View style={styles.row}>
            <TwoColorBadge
              title={`$${price.toFixed(decimals)}`}
              description={t('content:currentPrice')}
            />
          </View>
          <View style={styles.row}>
            <TwoColorBadge
              title={`$${data.total.toFixed(2)} (${percentage.toFixed(2)}%)`}
              description={t('content:currentTradePL')}
              titleDanger={percentage < 0}
              titleSuccess={percentage > 0}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(YourPosition);
