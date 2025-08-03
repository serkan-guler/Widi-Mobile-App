import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  PnLResponse,
  WalletContextType,
  WalletDomainDataType,
  WalletModalDataType,
  WalletResponse,
  WalletTabType,
} from '../types';
import {
  getTokensService,
  getWalletService,
  getWidiDomainService,
} from '../services';
import {showErrorAlert} from '../utils/alert';
import {AppState, AppStateStatus} from 'react-native';

export const WalletContext = createContext<WalletContextType | undefined>(
  undefined,
);

export const WalletProvider = ({children}: PropsWithChildren) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [pnlData, setPnlData] = useState<PnLResponse>();
  const [balance, setBalance] = useState<number>();
  const [totalChange, setTotalChange] = useState<number>();
  const [widiDomains, setWidiDomains] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [tokens, setTokens] = useState<WalletResponse>();
  const [tabExampleData, setTabExampleData] = useState<WalletTabType[]>([
    {
      name: 'Serkan',
      surname: 'Güler',
    },
    {
      name: 'Serdar',
      surname: 'Güler',
    },
    {
      name: 'Dilek',
      surname: 'Güler',
    },
  ]);
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendModal, setSendModal] = useState<WalletModalDataType>();
  const [modalRefresh, setModalRefresh] = useState(false);
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [domainModalData, setDomainModalData] =
    useState<WalletDomainDataType>();
  const [refreshing, setRefreshing] = useState(false);

  const handleSelectTab = useCallback((index: number) => {
    setSelectedTabIndex(index);
  }, []);

  const handleSearchTextChange = useCallback((text: string) => {
    setSearchText(text.trim());
  }, []);

  const tokensFiltered = useMemo(() => {
    if (!tokens || tokens.tokens.length === 0) {
      return [];
    }
    if (!searchText) {
      return tokens.tokens;
    }
    const normalizedSearchText = searchText.toLowerCase().trim();
    return tokens.tokens.filter(
      token =>
        token.token.name.toLowerCase().includes(normalizedSearchText) ||
        token.token.symbol.toLowerCase().includes(normalizedSearchText) ||
        token.token.mint.includes(searchText),
    );
  }, [tokens, searchText]);

  const tabData = useMemo(() => {
    if (selectedTabIndex === 0) {
      return tokensFiltered;
    } else {
      return tabExampleData;
    }
  }, [selectedTabIndex, tokensFiltered, tabExampleData]);

  const tokensIsLoading = useMemo(() => (!tokens ? true : false), [tokens]);

  const sendTokenData = useMemo(() => {
    if (tokens && tokens.tokens.length > 0) {
      return tokens.tokens.map(token => ({
        mint: token.token.mint,
        image: token.token.image,
        name: token.token.name,
        symbol: token.token.symbol,
        count: token.balance,
        decimal: token.token.decimals,
      }));
    }

    return [];
  }, [tokens]);

  const getData = useCallback(async () => {
    const response = await getWalletService();

    if (response.status === 'success') {
      // setTokens(response.data.tokens);
      const pnl = response.data.pnl;
      setPnlData(pnl);
      setTotalChange(pnl.historic.summary['30d'].totalChange);
      const balanceSol = pnl.summary.realized;
      const solPrice = response.data.solPrice?.price || 0;
      setBalance(balanceSol * solPrice);
    } else {
      setBalance(0);
      setTotalChange(0);
      showErrorAlert(response);
    }
  }, []);

  const getWidiDomains = useCallback(async () => {
    const response = await getWidiDomainService();

    if (response.status === 'success') {
      setWidiDomains(response.data);
    } else {
      console.error('Failed to fetch Widi domains:', response);
    }
  }, []);

  const getTokens = useCallback(async () => {
    const response = await getTokensService();

    if (response.status === 'success') {
      setTokens(response.data);
    } else {
      console.error('Failed to fetch tokens:', response);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await getData();
    await getTokens();
    setRefreshing(false);
  }, [getData, getTokens]);

  const setSendModalData = useCallback(
    (data: WalletModalDataType | undefined) => {
      setSendModal(data);
      setShowSendModal(!!data);
      setModalRefresh(true);
    },
    [],
  );

  const handleCloseDomainModal = useCallback(() => {
    setShowDomainModal(false);
    setDomainModalData(undefined);
  }, []);

  const handleDomainModalData = useCallback((data: WalletDomainDataType) => {
    setDomainModalData(data);
    setShowDomainModal(true);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (balance) {
      getWidiDomains();
    }
  }, [balance, getWidiDomains]);

  useEffect(() => {
    if (balance) {
      getTokens();
    }
  }, [balance, getTokens]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {

      if (nextAppState === 'background') {
        console.log('App moved to background');
        // Uygulaması arka plana alındığında yapılacak işlemler
      } else if (nextAppState === 'active') {
        console.log('App became active');
        // Uygulaması ön plana geldiğinde yapılacak işlemler
        // Örneğin: verileri yenile
        if (modalRefresh) {
          handleRefresh();
          setModalRefresh(false);
        }
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription?.remove();
    };
  }, [modalRefresh, handleRefresh]);

  const value: WalletContextType = {
    selectedTabIndex,
    setSelectedTabIndex: handleSelectTab,
    balance,
    totalChange,
    widiDomains,
    tabData: tabData as WalletTabType[],
    searchText,
    handleSearchTextChange,
    tokens,
    tokensIsLoading,
    sendTokenData,
    pnlData,
    sendModalData: sendModal,
    setSendModalData,
    showTransactionModal: showSendModal,
    handleRefresh,
    refreshing,
    showDomainModal,
    handleDomainModalData,
    domainModalData,
    closeDomainModal: handleCloseDomainModal,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
