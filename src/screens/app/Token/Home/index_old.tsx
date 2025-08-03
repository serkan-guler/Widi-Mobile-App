import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import styles from './styles_old';
import {
  Header,
  IconButton,
  PageHeaderCard,
  Layout,
  SearchInput,
  SortButton,
  Tabs,
  TokenCard,
  ListLoading,
} from '../../../../components';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {FilterIcon} from '../../../../assets/icons';
import {COLORS} from '../../../../constants/colors';
import {tokensService} from '../../../../services/token';
import {
  AppStackScreenProps,
  TokenResponse,
  TokenEvents,
} from '../../../../types';
import {showAlert} from '../../../../utils/alert';
import {parseTimeRange} from '../../../../utils';
import {SCREEN_NAMES} from '../../../../constants/navigation';
import {useDebounce, useFilter} from '../../../../hooks';
import {useFocusEffect} from '@react-navigation/native';

type TabName =
  | 'trending'
  | 'volume'
  | 'marketCap'
  | 'new'
  | 'aboutToGraduate'
  | 'graduate';

const tabNames: TabName[] = [
  'trending',
  'volume',
  'marketCap',
  'new',
  'aboutToGraduate',
  'graduate',
];

const TokenScreen = ({navigation}: AppStackScreenProps<'Tab'>) => {
  const {t} = useTranslation(['navigation', 'common', 'content', 'errors']);
  const {
    tokenFilter,
    timeRange: contextTimeRange,
    clearTimeRange,
  } = useFilter();

  const [isLoading, setIsLoading] = useState(true);
  const [tabIsLoading, setTabIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState<{[key in TabName]: boolean}>({
    ...tabNames.reduce(
      (acc, name) => {
        acc[name] = false;
        return acc;
      },
      {} as {[key in TabName]: boolean},
    ),
  });
  const [refreshing, setRefreshing] = useState(false);
  const [trendingData, setTrendingData] = useState<TokenResponse[]>([]);
  const [volumeData, setVolumeData] = useState<TokenResponse[]>([]);
  const [newData, setNewData] = useState<TokenResponse[]>([]);
  const [marketCapData, setMarketCapData] = useState<TokenResponse[]>([]);
  const [graduateData, setGraduateData] = useState<TokenResponse[]>([]);
  const [toGraduateData, setToGraduateData] = useState<TokenResponse[]>([]);

  const [searchText, setSearchText] = useState('');
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<TabName>('trending');
  const [timeRange, setTimeRange] = useState<keyof TokenEvents>('24h');

  const debouncedSearchText = useDebounce(searchText, 500);

  const labels = tabNames.map(name => t(`content:${name}`));

  const tabData = useCallback(
    (name: TabName) => {
      switch (name) {
        case 'trending':
          return {data: trendingData, setData: setTrendingData};
        case 'volume':
          return {data: volumeData, setData: setVolumeData};
        case 'marketCap':
          return {data: marketCapData, setData: setMarketCapData};
        case 'new':
          return {data: newData, setData: setNewData};
        case 'aboutToGraduate':
          return {data: toGraduateData, setData: setToGraduateData};
        case 'graduate':
          return {data: graduateData, setData: setGraduateData};
        // default:
        //   return {data: [], setData: () => {}};
      }
    },
    [
      trendingData,
      volumeData,
      marketCapData,
      newData,
      toGraduateData,
      graduateData,
    ],
  );

  const fetchData = useCallback(async () => {
    const {data, setData} = tabData(selectedTab);
    console.log('Fetch Current tab data:', data.length);
    const response = await tokensService({
      type: selectedTab,
      ...tokenFilter,
      timeRange,
      startCount: data.length.toString(),
    });

    if (response.status === 'success') {
      console.log('Tokens response:', response);
      setData(prev => [...prev, ...response.data.tokens]);
      setHasMore(prev => ({
        ...prev,
        [selectedTab]: response.data.hasMore,
      }));
    } else {
      showAlert(t('errors:error'), response.message);
    }

    console.log({
      selectedTab,
      tabData,
      tokenFilter,
      timeRange,
      debouncedSearchText,
    });
  }, [selectedTab, tokenFilter, timeRange, tabData]);

  const getData = useCallback(async () => {
    console.log('Fetching data getData:', selectedTab);
    const {data, setData} = tabData(selectedTab);
    console.log('Current tab data:', data.length);
    if (data.length === 0) {
      await fetchData();
      // setIsLoading(false);
      // setTabIsLoading(false);
    } else {
      console.log('Tab data is not empty, skipping fetch:', data.length);
    }
    setIsLoading(false);
    setTabIsLoading(false);
    setRefreshing(false);
  }, [fetchData]);

  const onTabPress = useCallback(
    (index: number) => {
      if (tabIndex !== index) {
        const tabName = tabNames[index];
        setSelectedTab(tabName);
        setTabIndex(index);
        const {data} = tabData(tabName);

        if (data.length === 0) {
          setTabIsLoading(true);
        }
      }
    },
    [tabIndex, tabNames, tabData],
  );

  const handleSearch = useCallback((text: string) => {
    console.log('Search text:', text);
    setSearchText(text);
    // setTabIsLoading(true);
  }, []);

  const handleRenderItem = useCallback(
    ({item}: {item: TokenResponse}) => (
      <TokenCard
        token={item}
        time={timeRange}
        onPress={() =>
          navigation.getParent()?.navigate(SCREEN_NAMES.APP.TOKEN_DETAIL, {
            mint: item.mint,
          })
        }
      />
    ),
    [timeRange],
  );

  const handleContextTimeRange = useCallback(() => {
    if (contextTimeRange) {
      if (contextTimeRange !== timeRange) {
        setTimeRange(contextTimeRange);
        clearTimeRange();
        const {data, setData} = tabData(selectedTab);
        if (data.length > 0) {
          setTabIsLoading(true);
          setData([]);
        }
      }
    }
  }, [contextTimeRange, tabData, timeRange]);

  useEffect(() => {
    console.log('UseEffect: Initializing data fetch');
    getData();
  }, [getData]);

  useEffect(() => {
    console.log('UseEffect: Filter change data fetch');
    const {data, setData} = tabData(selectedTab);
    if (data.length > 0) {
      setTabIsLoading(true);
      setData([]);
    }
  }, [tokenFilter]);

  useFocusEffect(handleContextTimeRange);

  const onRefresh = useCallback(async () => {
    console.log('Refreshing data...');
    setTabIsLoading(true);
    setRefreshing(true);
    const {setData} = tabData(selectedTab);
    setData([]);
  }, []);

  const {number, unit} = parseTimeRange(timeRange) || {number: '24', unit: 'h'};

  const tabChildren = useMemo(
    () =>
      tabNames.map(name => {
        const {data} = tabData(name);
        const tabHasMore = hasMore[name];
        return (
          <Tabs.FlatContent<TokenResponse>
            key={name}
            data={data}
            refreshing={refreshing}
            onEndReached={tabHasMore ? fetchData : null}
            onRefresh={onRefresh}
            onEndReachedThreshold={0.1}
            renderItem={handleRenderItem}
            ListFooterComponent={tabHasMore ? () => <ListLoading /> : null}
          />
        );
      }),
    [
      tabNames,
      tabData,
      handleRenderItem,
      refreshing,
      onRefresh,
      hasMore,
      fetchData,
    ],
  );

  return (
    <Layout isLoading={isLoading}>
      <Header title={t('navigation:token')} />
      <View style={styles.container}>
        <PageHeaderCard title={t(`navigation:token`)}>
          <View style={styles.titleContainer}>
            <SortButton
              text={t(`common:${unit}`, {value: number})}
              disabled={tabIndex > 1}
              onPress={() =>
                navigation.navigate(SCREEN_NAMES.APP.SORT_TIME, {
                  range: timeRange,
                })
              }
            />
            <IconButton
              bgColor="dark"
              disabled={tabIndex > 1}
              onPress={() =>
                navigation.navigate(SCREEN_NAMES.APP.TOKEN_FILTER)
              }>
              <FilterIcon color={COLORS.WHITE} />
            </IconButton>
          </View>
        </PageHeaderCard>
        <SearchInput
          placeholder={t('common:searchToken')}
          value={searchText}
          onChangeText={handleSearch}
        />
        <Tabs
          labels={labels}
          scrollAnimation
          isLoading={tabIsLoading}
          onTabPress={onTabPress}>
          {tabChildren}
        </Tabs>
      </View>
    </Layout>
  );
};

export default memo(TokenScreen);
