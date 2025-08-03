import {memo, useCallback, useEffect, useState} from 'react';
import styles from './styles_old';
import {FlatList, Text, View} from 'react-native';
import {
  BaseButton,
  Card,
  CopyTraderCard,
  IconButton,
  Img,
  LayoutStatusBar,
  PageHeaderCard,
  PageLoading,
  SearchInput,
  Tabs,
  TwoColorBadge,
} from '../../../../components';
import {
  HasMoreDataResponseType,
  MainTabParamList,
  MainTabScreenProps,
  Portfolio,
  PortfolioKeyType,
} from '../../../../types';
import {useSession, useSize} from '../../../../hooks';
import {useTranslation} from 'react-i18next';
import {
  NotificationIcon,
  LockIcon,
  SolanaBridgeIcon,
  XConnectIcon,
} from '../../../../assets/icons';
import {COLORS} from '../../../../constants/colors';
import {scaleSize} from '../../../../constants/dimensions';
import {SCREEN_NAMES} from '../../../../constants/navigation';
import {exampleTokens} from '../../../../lib/exampleData';
import {toLocaleUpperCase} from '../../../../utils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {leadersService} from '../../../../services';
import {showAlert} from '../../../../utils/alert';
import {
  getIpAddress,
  getMacAddress,
  getManufacturer,
  getUserAgent,
} from 'react-native-device-info';

type StateDataType = {
  [id in PortfolioKeyType]: HasMoreDataResponseType<Portfolio>;
};

const labels: PortfolioKeyType[] = ['trend', 'mostCopied', 'favorites'];

const TrendRoute = ({
  portfolio,
  navigation,
}: {
  portfolio: Portfolio;
  navigation: NativeStackNavigationProp<MainTabParamList, 'Leader', undefined>;
}) => {
  const {t} = useTranslation(['common', 'content']);
  const day = toLocaleUpperCase(t('common:d', {value: 7}));

  return (
    <Card
      headers={[
        {
          left: (
            <View style={styles.cardTitle}>
              <Img
                source={portfolio.traderInfo.profilePicture}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <Text style={styles.cardTitleText}>
                {portfolio.traderInfo.username}
              </Text>
              <View style={styles.connectIcon}>
                <XConnectIcon width={scaleSize(24)} height={scaleSize(24)} />
              </View>
              {portfolio.type === 'private' && (
                <View style={styles.connectIcon}>
                  <LockIcon
                    width={scaleSize(24)}
                    height={scaleSize(24)}
                    color={COLORS.WHITE}
                  />
                </View>
              )}
            </View>
          ),
          right: (
            <BaseButton
              size="small"
              label={t(portfolio.isActive ? 'common:copy' : 'common:closed')}
              disabled={!portfolio.isActive}
              onPress={() =>
                navigation
                  .getParent()
                  ?.navigate(SCREEN_NAMES.APP.COPY_DETAIL, {id: portfolio._id})
              }
            />
          ),
        },
      ]}
      content={{
        header: {
          left: (
            <TwoColorBadge
              title={portfolio.participantCount.toString()}
              description={portfolio.maxParticipants.toString()}
              bracket="/"
            />
          ),
          right: (
            <View style={styles.trendCardContentHeaderContainer}>
              <Text style={styles.trendCardContentHeaderTitle}>+$33707.82</Text>
              <Text style={styles.trendCardContentHeaderDescription}>
                {`${day} PNL`}
              </Text>
            </View>
          ),
        },
        items: [
          [
            {
              title: t('common:days', {value: portfolio.durationDays}),
              description: t('content:lockPeriod'),
              bracket: '-',
            },
            {
              title: `${portfolio.minInvestment} SOL`,
              description: t('content:minCopyAmt'),
              bracket: '-',
              leading: (
                <SolanaBridgeIcon
                  width={scaleSize(11.8)}
                  height={scaleSize(10.6)}
                />
              ),
            },
          ],
          [
            {
              title: '65.65%',
              description: `${day} ROI`,
              bracket: '-',
              titleSuccess: true,
            },
            {
              title: '302,313.26 SOL',
              description: 'AUM',
              bracket: '-',
            },
          ],
        ],
      }}
    />
  );
};

const MainScreen = ({navigation}: MainTabScreenProps<'Leader'>) => {
  const {user} = useSession();
  const {t} = useTranslation(['content', 'common', 'navigation']);
  const {
    safeArea: {top},
  } = useSize();

  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [havePortfolio, setHavePortfolio] = useState(true);

  const [leadersData, setLeadersData] = useState<Portfolio[]>([]);
  const [data, setData] = useState<StateDataType>();

  const labelNames = labels.map(label => t(`common:${label}`));

  const getData = useCallback(async () => {
    const response = await leadersService();

    if (response.status === 'success') {
      const data = response.data;

      const result: Partial<StateDataType> = {};

      (['trend', 'mostCopied', 'favorites'] as PortfolioKeyType[]).forEach(
        key => {
          const original = data.portfolios[key];

          const flattenedData = original.data.flatMap(item => item.portfolios);

          result[key] = {
            hasMore: original.hasMore,
            totalCount: original.totalCount,
            page: original.page,
            pageSize: original.pageSize,
            data: flattenedData,
          };
        },
      );

      setData(result as StateDataType);

      setHavePortfolio(data.havePortfolio);
      setIsLoading(false);
      console.log('Leaders data:', response.data);
    } else {
      showAlert(response.status, response.message);
    }
  }, []);

  useEffect(() => {
    if (user) {
      getData();
      getUserAgent().then(agent => {
        console.log('User Agent: ', agent);
      });

      getIpAddress().then(ip => {
        console.log('IP Address: ', ip);
      });

      getMacAddress().then(mac => {
        console.log('MAC Address: ', mac);
      });

      getManufacturer().then(manufacturer => {
        console.log('Manufacturer: ', manufacturer);
      });
    }
  }, [user, getData]);

  if (isLoading || !user || !data) {
    return <PageLoading />;
  }

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <LayoutStatusBar />
      <FlatList
        data={[]}
        renderItem={() => null}
        onEndReachedThreshold={0.1} // %10 kala tetikler (0.1 = %10)
        onEndReached={distanceFromEnd => {
          console.log('Listenin sonuna ulaşıldı! ', distanceFromEnd);
          // Daha fazla veri çek veya işlem yap
        }}
        style={[styles.flatContainer]}
        ListHeaderComponent={
          <View style={styles.container}>
            {/* User Information */}
            <View style={styles.header}>
              <Img
                source={user.profilePicture}
                style={styles.img}
                resizeMode="cover"
              />
              <View style={styles.userInfo}>
                <Text style={styles.userWelcome}>
                  {t('content:welcomeAgain')}
                </Text>
                <Text style={styles.username}>{user.username}</Text>
              </View>
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
            </View>
            {/* Copy Card */}
            <View style={styles.copyCardContainer}>
              <CopyTraderCard />
              <BaseButton
                label={t(
                  havePortfolio
                    ? 'navigation:viewMyLeaderPortfolio'
                    : 'navigation:beALeader',
                )}
                onPress={() =>
                  havePortfolio
                    ? navigation.navigate('Portfolio')
                    : navigation
                        .getParent()
                        ?.navigate(SCREEN_NAMES.APP.BE_A_LEADER)
                }
              />
            </View>
            <View style={styles.pageTitleContainer}>
              <PageHeaderCard title={t('common:tradingLeaders')} />
            </View>
            <View style={styles.searchContainer}>
              <SearchInput placeholder={t('content:searchFavTrader')} />
            </View>
            <View style={styles.tabContainer}>
              <Tabs
                labels={labelNames}
                activeIndex={activeTab}
                onTabPress={index => setActiveTab(index)}>
                <Tabs.Content>
                  {data.trend.data.length > 0 ? (
                    data.trend.data.map((portfolio, index) => (
                      <TrendRoute
                        key={index}
                        navigation={navigation}
                        portfolio={portfolio}
                      />
                    ))
                  ) : (
                    <View style={styles.noFavoritesContainer}>
                      <Text style={styles.noFavoritesText}>
                        {t('common:noDataAvailable')}
                      </Text>
                    </View>
                  )}
                </Tabs.Content>
                <Tabs.Content>
                  {data.mostCopied.data.length > 0 ? (
                    data.mostCopied.data.map((portfolio, index) => (
                      <TrendRoute
                        key={index}
                        navigation={navigation}
                        portfolio={portfolio}
                      />
                    ))
                  ) : (
                    <View style={styles.noFavoritesContainer}>
                      <Text style={styles.noFavoritesText}>
                        {t('common:noDataAvailable')}
                      </Text>
                    </View>
                  )}
                </Tabs.Content>
                <Tabs.Content>
                  {data.favorites.data.length > 0 ? (
                    data.favorites.data.map((portfolio, index) => (
                      <TrendRoute
                        key={index}
                        navigation={navigation}
                        portfolio={portfolio}
                      />
                    ))
                  ) : (
                    <View style={styles.noFavoritesContainer}>
                      <Text style={styles.noFavoritesText}>
                        {t('content:noFavoritesTraders')}
                      </Text>
                    </View>
                  )}
                </Tabs.Content>
              </Tabs>
            </View>
            <View style={styles.emptyView} />
          </View>
        }
      />
    </View>
  );
};

export default memo(MainScreen);
