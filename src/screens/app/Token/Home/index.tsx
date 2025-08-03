import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles';
import {
  Header,
  IconButton,
  ListLoading,
  PageHeaderCard,
  TokenCard,
} from '../../../../components';
import {useTranslation} from 'react-i18next';
import {useApp, useData, useFilter, useSize} from '../../../../hooks';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SCREEN_NAMES} from '../../../../constants/navigation';
import {
  FilterIcon,
  NotificationIcon,
  RouteSplitIcon,
  SearchIcon,
} from '../../../../assets/icons';
import {
  MainTabScreenProps,
  TabName,
  TokenEvents,
  TokenResponse,
} from '../../../../types';
import {parseTimeRange} from '../../../../utils';
import {COLORS} from '../../../../constants/colors';
import {scaleFont, scaleSize} from '../../../../constants/dimensions';
import Loading from './Loading';
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
    safeArea: {top, bottom},
  } = useSize();
  const {bottomTabBarHeight} = useApp();
  const {fetchTokenData, tokenTabStates} = useData();
  const {timeRange: contextTimeRange, clearTimeRange} = useFilter();

  const flatListRef = useRef<FlatList>(null);

  const [topContentHeight, setTopContentHeight] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedTabName, setSelectedTabName] = useState<TabName>('trending');
  const [timeRange, setTimeRange] = useState<keyof TokenEvents>('24h');

  const {number, unit} = parseTimeRange(timeRange) || {number: '24', unit: 'h'};

  const contentHeight = useMemo(
    () => height - bottomTabBarHeight - top - topContentHeight,
    [height, bottomTabBarHeight, top, topContentHeight],
  );

  const handleTabPress = useCallback(
    (index: number) => {
      const selectedName = tabNames[index];
      setSelectedTabIndex(index);
      setSelectedTabName(selectedName);
    },
    [tabNames],
  );

  const tabData = useMemo(() => {
    const {data} = tokenTabStates(selectedTabName);
    return data;
  }, [tokenTabStates, selectedTabName]);

  const tabHasMore = useMemo(
    () => tokenTabStates(selectedTabName).hasMore,
    [tokenTabStates, selectedTabName],
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

  const handleLoadMore = useCallback(async () => {
    await fetchTokenData(selectedTabName, timeRange);
  }, [fetchTokenData]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTokenData(selectedTabName, timeRange, 0);
    setRefreshing(false);
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
        handleRefresh();
      }
    }
  }, [contextTimeRange, tabData, timeRange]);

  useFocusEffect(handleContextTimeRange);

  return (
    <View
      style={[
        styles.container,
        {
          marginTop: top,
          height: height - bottomTabBarHeight - top,
        },
      ]}>
      <View
        onLayout={e => {
          const {height} = e.nativeEvent.layout;
          setTopContentHeight(height);
        }}>
        <View style={styles.header}>
          <Header
            title={t('navigation:token')}
            trailing={
              <IconButton
                onPress={() =>
                  navigation
                    .getParent()
                    ?.navigate(SCREEN_NAMES.APP.NOTIFICATIONS)
                }>
                <NotificationIcon
                  color={COLORS.WHITE}
                  width={scaleSize(18)}
                  height={scaleSize(21)}
                />
              </IconButton>
            }
          />
        </View>
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
