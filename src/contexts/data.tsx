import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  DataContextType,
  LeadersServiceType,
  PortfolioKeyType,
  SubscribePoolType,
  TabName,
  TokenEvents,
  TokenResponse,
} from '../types';
import {
  getFavoritedLeadersService,
  getMostCopiedLeadersService,
  getTrendingLeadersService,
  tokensService,
} from '../services';
import {useFilter} from '../hooks';
import {showErrorAlert} from '../utils/alert';
import {tabNames} from '../lib/data';

export const DataContext = createContext<DataContextType | undefined>(
  undefined,
);

export const DataProvider = ({children}: PropsWithChildren) => {
  const {tokenFilter} = useFilter();

  // TOKENS
  const [trendingData, setTrendingData] = useState<TokenResponse[]>([]);
  const [volumeData, setVolumeData] = useState<TokenResponse[]>([]);
  const [newData, setNewData] = useState<TokenResponse[]>([]);
  const [marketCapData, setMarketCapData] = useState<TokenResponse[]>([]);
  const [graduateData, setGraduateData] = useState<TokenResponse[]>([]);
  const [toGraduateData, setToGraduateData] = useState<TokenResponse[]>([]);
  const [hasMoreToken, setHasMoreToken] = useState<{[key in TabName]: boolean}>(
    {
      ...tabNames.reduce(
        (acc, name) => {
          acc[name] = false;
          return acc;
        },
        {} as {[key in TabName]: boolean},
      ),
    },
  );

  const [sendingPools, setSendingPools] = useState<SubscribePoolType[]>([]);
  const [subscribePools, setSubscribePools] = useState<SubscribePoolType[]>([]);

  // LEADERS
  const [userHavePortfolio, setUserHavePortfolio] = useState(false);
  const [trendingPortfolios, setTrendingPortfolios] =
    useState<LeadersServiceType>();
  const [mostCopiedPortfolios, setMostCopiedPortfolios] =
    useState<LeadersServiceType>();
  const [favoritePortfolios, setFavoritePortfolios] =
    useState<LeadersServiceType>();
  const [leaderRefreshing, setLeaderRefreshing] = useState(false);

  const updateLeaderData = useCallback(
    (prevData: LeadersServiceType | undefined, newData: LeadersServiceType) =>
      prevData
        ? {
            ...prevData,
            hasMore: newData.hasMore,
            totalCount: newData.totalCount,
            page: newData.page,
            data: [...prevData.data, ...newData.data],
          }
        : newData,
    [],
  );

  // LEADERS FETCHING
  const handleTrendingData = useCallback(
    async (size?: number) => {
      const count = size
        ? size
        : trendingPortfolios
          ? trendingPortfolios.data.length
          : 0;
      const response = await getTrendingLeadersService(count);

      if (response.status === 'success') {
        const data = response.data.portfolios;
        setUserHavePortfolio(response.data.havePortfolio);
        setTrendingPortfolios(prev =>
          size === 0 ? data : updateLeaderData(prev, data),
        );
      } else {
        showErrorAlert(response);
      }
    },
    [getTrendingLeadersService, trendingPortfolios],
  );

  const handleMostCopiedData = useCallback(
    async (size?: number) => {
      const count = size
        ? size
        : mostCopiedPortfolios
          ? mostCopiedPortfolios.data.length
          : 0;
      const response = await getMostCopiedLeadersService(count);
      if (response.status === 'success') {
        setMostCopiedPortfolios(prev =>
          size === 0 ? response.data : updateLeaderData(prev, response.data),
        );
      } else {
        showErrorAlert(response);
      }
    },
    [getMostCopiedLeadersService, mostCopiedPortfolios],
  );

  const handleFavoritedData = useCallback(
    async (size?: number) => {
      const count = size
        ? size
        : favoritePortfolios
          ? favoritePortfolios.data.length
          : 0;
      const response = await getFavoritedLeadersService(count);
      if (response.status === 'success') {
        setFavoritePortfolios(prev =>
          size === 0 ? response.data : updateLeaderData(prev, response.data),
        );
      } else {
        showErrorAlert(response);
      }
    },
    [getFavoritedLeadersService, favoritePortfolios],
  );

  const refreshFavoriteData = useCallback(async () => {
    setLeaderRefreshing(true);
    await handleFavoritedData(0);
    setLeaderRefreshing(false);
  }, []);

  const refreshLeadersData = useCallback(async () => {
    setLeaderRefreshing(true);
    await handleTrendingData(0);
    await handleMostCopiedData(0);
    setLeaderRefreshing(false);
  }, [handleTrendingData, handleMostCopiedData]);

  const leaderLoadMore = useCallback(
    async (type: PortfolioKeyType) => {
      if (type === 'trend') {
        await handleTrendingData();
      }
      if (type === 'mostCopied') {
        await handleMostCopiedData();
      }
      if (type === 'favorites') {
        await handleFavoritedData();
      }
    },
    [handleTrendingData, handleMostCopiedData, handleFavoritedData],
  );

  // TOKENS FETCHING
  const tokenTabStates = useCallback(
    (name: TabName) => {
      switch (name) {
        case 'trending':
          return {
            data: trendingData,
            setData: setTrendingData,
            dataString: trendingData.map(token => token.mint),
            hasMore: hasMoreToken.trending,
          };
        case 'volume':
          return {
            data: volumeData,
            setData: setVolumeData,
            dataString: volumeData.map(token => token.mint),
            hasMore: hasMoreToken.volume,
          };
        case 'marketCap':
          return {
            data: marketCapData,
            setData: setMarketCapData,
            dataString: marketCapData.map(token => token.mint),
            hasMore: hasMoreToken.marketCap,
          };
        case 'new':
          return {
            data: newData,
            setData: setNewData,
            dataString: newData.map(token => token.mint),
            hasMore: hasMoreToken.new,
          };
        case 'aboutToGraduate':
          return {
            data: toGraduateData,
            setData: setToGraduateData,
            dataString: toGraduateData.map(token => token.mint),
            hasMore: hasMoreToken.aboutToGraduate,
          };
        case 'graduate':
          return {
            data: graduateData,
            setData: setGraduateData,
            dataString: graduateData.map(token => token.mint),
            hasMore: hasMoreToken.graduate,
          };
        default:
          return {data: [], setData: () => {}, dataString: [], hasMore: false};
      }
    },
    [
      trendingData,
      volumeData,
      marketCapData,
      newData,
      toGraduateData,
      graduateData,
      hasMoreToken,
      setTrendingData,
      setVolumeData,
      setMarketCapData,
      setNewData,
      setToGraduateData,
      setGraduateData,
    ],
  );

  const handleSetSubscribePools = useCallback(
    (data: SubscribePoolType[]) => {
      const existingPoolIds = new Set(sendingPools.map(pool => pool.poolId));

      const newPools = data.filter(pool => !existingPoolIds.has(pool.poolId));

      if (newPools.length > 0) {
        setSendingPools(prev => [...prev, ...newPools]);
        setSubscribePools([...newPools]);
      }
    },
    [sendingPools, setSendingPools, setSubscribePools],
  );

  const fetchTokenData = useCallback(
    async (name: TabName, timeRange: keyof TokenEvents, count?: number) => {
      const {data, setData, dataString} = tokenTabStates(name);
      const response = await tokensService({
        type: name,
        ...tokenFilter,
        timeRange,
        startCount:
          typeof count === 'number' ? count.toString() : data.length.toString(),
      });

      if (response.status === 'success') {
        const newTokenData = response.data.tokens.filter(
          token => !dataString.includes(token.mint),
        );
        const updateData =
          count === 0 ? newTokenData : [...data, ...newTokenData];
        setData([...updateData]);
        setHasMoreToken(prev => ({
          ...prev,
          [name]: response.data.hasMore,
        }));
        const pools = response.data.tokens.map(token => ({
          wallet: token.mint,
          poolId: token.poolId,
        }));
        handleSetSubscribePools(pools);
      } else {
        showErrorAlert(response);
      }
    },
    [tokensService, tokenFilter, tokenTabStates],
  );

  useEffect(() => {
    const getData = async () => {
      await fetchTokenData('trending', '24h');
      await handleTrendingData();
      for (const tabName of tabNames) {
        if (tabName !== 'trending') {
          fetchTokenData(tabName, '24h', 0);
        }
      }
      handleMostCopiedData();
      handleFavoritedData();
    };

    getData();
  }, []);

  const value: DataContextType = {
    // Tokens
    trendingData,
    setTrendingData,
    volumeData,
    setVolumeData,
    newData,
    setNewData,
    marketCapData,
    setMarketCapData,
    graduateData,
    setGraduateData,
    toGraduateData,
    subscribePools,
    sendingSubscribePools: sendingPools,
    setToGraduateData,
    fetchTokenData,
    tokenTabStates,
    // Leaders
    haveUserPortfolio: userHavePortfolio,
    trendingPortfolios,
    mostCopiedPortfolios,
    favoritePortfolios,
    leaderRefreshing,
    refreshFavoriteData,
    refreshLeadersData,
    leaderLoadMore,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
