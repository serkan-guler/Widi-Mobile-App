import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import styles from './styles';
import {FlatList, View} from 'react-native';
import {
  LayoutStatusBar,
  PageLoading,
  RefreshIndicator,
} from '../../../../components';
import ListHeader from './ListHeader';
import {
  MainTabScreenProps,
  PortfolioKeyType,
  PortfolioWithIsParticipant,
} from '../../../../types';
import {useData, useSize} from '../../../../hooks';
import Card from './Card';
import EmptyCart from './Empty';
import {SCREEN_NAMES} from '../../../../constants/navigation';
import {useTranslation} from 'react-i18next';

const LeadersScreen = (props: MainTabScreenProps<'Leader'>) => {
  const {navigation} = props;
  const {
    safeArea: {top},
  } = useSize();
  const {t} = useTranslation(['common', 'content']);
  const {
    haveUserPortfolio,
    trendingPortfolios,
    mostCopiedPortfolios,
    favoritePortfolios,
    leaderRefreshing,
    refreshFavoriteData,
    refreshLeadersData,
  } = useData();

  const [activeTab, setActiveTab] = useState<PortfolioKeyType>('trend');

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const emptyFavoriteLabel = useMemo(
    () => t('content:noFavoritesTraders'),
    [t],
  );
  const emptyDataLabel = useMemo(() => t('common:noDataAvailable'), [t]);

  const handleTabPress = useCallback(async (key: PortfolioKeyType) => {
    setActiveTab(key);
  }, []);

  const flatListData = useMemo(
    () =>
      activeTab === 'trend' && trendingPortfolios
        ? trendingPortfolios.data
        : activeTab === 'mostCopied' && mostCopiedPortfolios
          ? mostCopiedPortfolios.data
          : favoritePortfolios
            ? favoritePortfolios.data
            : [],
    [activeTab, trendingPortfolios, mostCopiedPortfolios, favoritePortfolios],
  );

  const hasMore = useMemo(
    () =>
      activeTab === 'trend' && trendingPortfolios
        ? trendingPortfolios.hasMore
        : activeTab === 'mostCopied' && mostCopiedPortfolios
          ? mostCopiedPortfolios.hasMore
          : favoritePortfolios
            ? favoritePortfolios.hasMore
            : false,
    [activeTab, trendingPortfolios, mostCopiedPortfolios, favoritePortfolios],
  );

  const handleNavigate = useCallback(
    (id: string) =>
      navigation.getParent()?.navigate(SCREEN_NAMES.APP.COPY_DETAIL, {id}),
    [navigation],
  );

  const emptyComponent = useMemo(
    () => (
      <EmptyCart
        label={activeTab === 'favorites' ? emptyFavoriteLabel : emptyDataLabel}
      />
    ),
    [activeTab, emptyFavoriteLabel, emptyDataLabel],
  );

  const renderItem = useCallback(
    ({item}: {item: PortfolioWithIsParticipant}) => {
      return <Card portfolio={item} onPress={handleNavigate} />;
    },
    [
      flatListData,
      activeTab,
      emptyFavoriteLabel,
      emptyDataLabel,
      handleNavigate,
    ],
  );

  const handleRefresh = useCallback(async () => {
    if (activeTab === 'favorites') {
      await refreshFavoriteData();
    } else {
      await refreshLeadersData();
    }
  }, [activeTab, refreshFavoriteData, refreshLeadersData]);

  useEffect(() => {
    if (trendingPortfolios) {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <>
      <LayoutStatusBar />
      <View style={styles.container}>
        <FlatList
          style={[styles.flatContainer, {marginTop: top}]}
          contentContainerStyle={styles.flatContentContainer}
          data={flatListData}
          renderItem={renderItem}
          refreshControl={
            <RefreshIndicator
              refreshing={leaderRefreshing}
              onRefresh={handleRefresh}
            />
          }
          ListHeaderComponent={
            <ListHeader
              {...props}
              activeTab={activeTab}
              onTabPress={handleTabPress}
              havePortfolio={haveUserPortfolio}
            />
          }
          ListEmptyComponent={emptyComponent}
        />
      </View>
    </>
  );
};

export default memo(LeadersScreen);
