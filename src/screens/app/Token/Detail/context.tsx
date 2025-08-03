import {
  createContext,
  memo,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import type {ChartTimeType, Holder, TokenStats} from '../../../../types';
import {
  tokenHoldersDataService,
  tokenPnlDataService,
  tokenStatsDataService,
} from '../../../../services';
import {showErrorAlert} from '../../../../utils/alert';

type TokenContextType = {
  selectedTime: ChartTimeType;
  onChangeTime: (time: ChartTimeType) => void;
  timeZoneModalVisible: boolean;
  toggleTimeZoneModal: () => void;
  marketCapModalVisible: boolean;
  toggleMarketCapModal: () => void;
  selectedTimeZone: string;
  onChangeTimeZone: (timeZone: string) => void;
  chartDataType: 'marketCap' | 'price';
  onChangeChartDataType: (type: 'marketCap' | 'price') => void;
  selectedTab: number;
  onChangeSelectedTab: (tabIndex: number) => void;
  mint: string;
  pool: string;
  holdersCount: number;
  onSetHoldersCount: (count: number) => void;
  holdersData: Holder[];
  statsData?: TokenStats;
};

const TokenContext = createContext<TokenContextType | undefined>(undefined);

const TokenProvider = ({
  mint,
  pool,
  children,
}: PropsWithChildren<{mint: string; pool: string}>) => {
  const [selectedTime, setSelectedTime] = useState<ChartTimeType>('1h');
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>('+3');
  const [chartDataType, setChartDataType] = useState<'marketCap' | 'price'>(
    'marketCap',
  );
  const [timeZoneModalVisible, setTimeZoneModalVisible] = useState(false);
  const [marketCapModalVisible, setMarketCapModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [holdersCount, setHoldersCount] = useState(0);
  const [holdersData, setHoldersData] = useState<Holder[]>([]);
  const [statsData, setStatsData] = useState<TokenStats>();

  useEffect(() => {
    const getDeviceTimeZone = async () => {
      const offset = new Date().getTimezoneOffset();
      const hours = Math.abs(Math.floor(offset / 60));
      const sign = offset > 0 ? '-' : '+';
      setSelectedTimeZone(`${sign}${hours}`);
    };
    getDeviceTimeZone();
  }, []);

  const handleSetSelectedTab = useCallback((tabIndex: number) => {
    setSelectedTab(tabIndex);
  }, []);

  const handleChangeTime = (time: ChartTimeType) => {
    setSelectedTime(time);
  };

  const handleChangeTimeZone = (timeZone: string) => {
    setSelectedTimeZone(timeZone);
    setTimeZoneModalVisible(false);
  };

  const handleChangeChartDataType = (type: 'marketCap' | 'price') => {
    setChartDataType(type);
    setMarketCapModalVisible(false);
  };

  const handleCloseTimeZoneModal = useCallback(() => {
    setTimeZoneModalVisible(prev => !prev);
  }, []);

  const handleCloseMarketCapModal = useCallback(() => {
    setMarketCapModalVisible(prev => !prev);
  }, []);

  const handleSetHoldersCount = useCallback((count: number) => {
    setHoldersCount(count);
  }, []);

  const getStatsData = useCallback(async () => {
    if (mint && pool) {
      const response = await tokenStatsDataService(mint, pool);
      if (response.status === 'success') {
        setStatsData(response.data);
      } else {
        showErrorAlert(response);
      }
    } else {
      console.error('Mint or pool is not defined for stats data');
    }
  }, [mint, pool]);

  const getHoldersData = useCallback(async () => {
    const response = await tokenHoldersDataService(mint);
    if (response.status === 'success') {
      setHoldersData(response.data);
    } else {
      showErrorAlert(response);
    }
  }, [mint]);

  const getTokenPnlData = useCallback(async () => {
    const response = await tokenPnlDataService(mint);
  }, [mint]);

  useEffect(() => {
    getHoldersData();
  }, [getHoldersData]);

  useEffect(() => {
    getStatsData();
  }, [getStatsData]);

  const value: TokenContextType = {
    mint,
    pool,
    selectedTime,
    onChangeTime: handleChangeTime,
    timeZoneModalVisible,
    toggleTimeZoneModal: handleCloseTimeZoneModal,
    marketCapModalVisible,
    toggleMarketCapModal: handleCloseMarketCapModal,
    selectedTimeZone,
    onChangeTimeZone: handleChangeTimeZone,
    chartDataType,
    onChangeChartDataType: handleChangeChartDataType,
    selectedTab,
    onChangeSelectedTab: handleSetSelectedTab,
    holdersCount,
    onSetHoldersCount: handleSetHoldersCount,
    holdersData,
    statsData,
  };

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  const context = useContext(TokenContext);
  const {t} = useTranslation('errors');
  if (!context) {
    throw new Error(t('context', {context: 'Token'}));
  }
  return context;
};

export default memo(TokenProvider);
