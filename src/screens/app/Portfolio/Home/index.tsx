import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles';
import {
  BaseButton,
  PageHeaderCard,
  PortfolioCard,
  PortfolioUserCard,
  Layout,
  Tabs,
  ListLoading,
} from '../../../../components';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {MainTabScreenProps, Portfolio} from '../../../../types';
import {SCREEN_NAMES} from '../../../../constants/navigation';
import {
  activePortfoliosService,
  passivePortfoliosService,
} from '../../../../services';
import {showAlert} from '../../../../utils/alert';

const PortfolioScreen = ({navigation}: MainTabScreenProps<'Portfolio'>) => {
  const {t} = useTranslation(['common', 'content']);
  const labels = [t('active'), t('passive')];

  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [activePortfolios, setActivePortfolios] = useState<Portfolio[]>([]);
  const [passivePortfolios, setPassivePortfolios] = useState<Portfolio[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const passivePortfoliosLengthRef = useRef(passivePortfolios.length);

  const getActiveData = useCallback(async () => {
    const response = await activePortfoliosService();
    if (response.status === 'success') {
      setActivePortfolios(response.data);
    } else {
      showAlert(response.status, response.message);
    }
    // setIsLoading(false);
  }, []);

  const getPassiveData = useCallback(async (refresh: boolean = false) => {
    const response = await passivePortfoliosService(
      refresh ? 0 : passivePortfoliosLengthRef.current,
    );
    if (response.status === 'success') {
      if (refresh) {
        setPassivePortfolios(response.data.data);
      } else {
        setPassivePortfolios(prev => [...prev, ...response.data.data]);
      }
      setHasMore(response.data.hasMore);
    } else {
      showAlert(response.status, response.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    passivePortfoliosLengthRef.current = passivePortfolios.length;
  }, [passivePortfolios.length]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (activeTab === 0) {
      await getActiveData();
    } else {
      await getPassiveData(true);
    }
    setRefreshing(false);
  }, [getActiveData, activeTab, getPassiveData]);

  useEffect(() => {
    getActiveData();
    getPassiveData(true);
  }, [getActiveData]);

  const createButton = useMemo(
    () => (
      <BaseButton
        label={t('common:createNewPortfolio')}
        onPress={() =>
          navigation.getParent()?.navigate(SCREEN_NAMES.APP.BE_A_LEADER)
        }
      />
    ),
    [t, navigation],
  );

  const passiveTabChildren = useMemo(() => {
    if (passivePortfolios.length > 0) {
      return (
        <Tabs.FlatContent<Portfolio>
          data={passivePortfolios}
          refreshing={refreshing}
          onEndReached={async () =>
            hasMore ? await getPassiveData(false) : null
          }
          onRefresh={onRefresh}
          onEndReachedThreshold={0.9}
          renderItem={({item}) => <PortfolioCard data={item} />}
          ListFooterComponent={hasMore ? () => <ListLoading /> : null}
        />
      );
    } else {
      return (
        <Tabs.Content>
          <View style={styles.emptyTab}>
            <Text
              style={styles.emptyText}
              numberOfLines={2}
              ellipsizeMode="tail">
              {t('content:noPassivePortfolios')}
            </Text>
          </View>
        </Tabs.Content>
      );
    }
  }, [passivePortfolios]);

  const activeRenderItem = useCallback(
    ({item}: {item: Portfolio}) => (
      <View style={styles.tabContentWrapper}>
        <PortfolioCard data={item} />
        {activePortfolios.length < 2 && createButton}
      </View>
    ),
    [activePortfolios, createButton],
  );

  return (
    <Layout isLoading={isLoading}>
      <View style={styles.container}>
        <PageHeaderCard title={t('common:myTradingPortfolio')} />
        <PortfolioUserCard showWelcome />
        <View style={styles.tabContainer}>
          <Tabs
            labels={labels}
            type="status"
            activeIndex={activeTab}
            onTabPress={index => setActiveTab(index)}>
            {activePortfolios.length === 0 ? (
              <Tabs.Content>{createButton}</Tabs.Content>
            ) : (
              <Tabs.FlatContent<Portfolio>
                data={activePortfolios}
                refreshing={refreshing}
                onEndReached={null}
                onRefresh={onRefresh}
                renderItem={activeRenderItem}
              />
            )}
            {passiveTabChildren}
          </Tabs>
        </View>
      </View>
    </Layout>
  );
};

export default memo(PortfolioScreen);
