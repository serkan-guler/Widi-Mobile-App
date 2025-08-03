import {memo, useCallback, useState} from 'react';
import styles from './styles';
import {
  BaseButton,
  FilterButton,
  Header,
  Layout,
  PageHeaderCard,
} from '../../../../components';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {AppStackScreenProps, TokenEvents} from '../../../../types';
import {useFocusEffect} from '@react-navigation/native';
import {useFilter} from '../../../../hooks';
import {timeData} from '../../../../lib/data';

const SortTimeScreen = ({
  route,
  navigation,
}: AppStackScreenProps<'SortTime'>) => {
  const {t} = useTranslation('common');
  const {setTimeRange: setContextTimeRange} = useFilter();

  const [timeRange, setTimeRange] = useState<keyof TokenEvents | undefined>();

  const handleFilter = useCallback(() => {
    setContextTimeRange(timeRange ?? '24h');
    setTimeout(() => navigation.goBack(), 100);
  }, [navigation, timeRange, setContextTimeRange]);

  const handleFocus = useCallback(() => {
    setTimeRange(route.params?.range);
  }, [route.params]);

  useFocusEffect(handleFocus);

  return (
    <Layout>
      <Header title={t('filters')} onPressBack={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={styles.content}>
          <PageHeaderCard title={t('timePeriod')} />
          {timeData.map((item, index) => {
            const timeRangeKey =
              `${item.key}${item.value}` as keyof TokenEvents;
            return (
              <FilterButton
                key={index}
                title={t(item.value, {value: item.key})}
                selected={timeRange === timeRangeKey}
                onPress={() => {
                  setTimeRange(timeRangeKey);
                }}
              />
            );
          })}
        </View>
        <BaseButton label={t('filterResult')} onPress={handleFilter} />
      </View>
    </Layout>
  );
};

export default memo(SortTimeScreen);
