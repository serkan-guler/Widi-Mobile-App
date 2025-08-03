import {Dispatch, SetStateAction} from 'react';
import {SendTokenDataType} from './navigator';
import {LeadersServiceType, PortfolioKeyType} from './portfolio';
import {WebsocketMessageType} from './socket';
import {
  PoolInfo,
  TokenResponse,
  TokenEvents,
  Trade,
  FilterSlippageType,
  FilterFeeType,
  PriorityFeeType,
  PnLResponse,
  SlippageType,
  SpeedFeeType,
  TabName,
  SubscribePoolType,
} from './token';
import {UserType} from './user';
import {WalletResponse, WalletTokenDetail} from './wallet';

export type MinMax = {
  min: number;
  max: number;
};

export type AppContextType = {
  bottomTabBarHeight: number;
  setBottomTabBarHeight: (height: number) => void;
};

export type SessionContextType = {
  sessionIsLoading: boolean;
  isAuth: boolean;
  user?: UserType;
  setUser: (user: UserType | undefined) => void;
  editUser: (user: Partial<UserType>) => void;
  logout: () => Promise<void>;
  deviceId?: string;
};

export type FilterContextType = {
  tokenFilter: {
    marketCap: MinMax;
    volume: MinMax;
    liquidity: MinMax;
  };
  setTokenFilter: (filter: FilterContextType['tokenFilter']) => void;
  resetTokenFilter: () => void;
  timeRange?: keyof TokenEvents;
  setTimeRange: (timeRange: keyof TokenEvents) => void;
  clearTimeRange: () => void;
};

export type WebSocketContextType = {
  socket: WebSocket | null;
  isConnected: boolean;
  sendMessage: (type: WebsocketMessageType, payload: unknown) => void;
  closeSocket: () => void;
  onPool: (poolId: string, callback: (data: PoolInfo) => void) => void;
  offPool: (poolId: string, callback: (data: PoolInfo) => void) => void;
  onTransaction: (wallet: string, callback: (data: Trade) => void) => void;
  offTransaction: (wallet: string, callback: (data: Trade) => void) => void;
  onTokenSearchResult: (callback: (data: TokenResponse[]) => void) => void;
  offTokenSearchResult: (callback: (data: TokenResponse[]) => void) => void;
};

export type TransactionContextHandleSetProps = {
  selectedSlippage: SlippageType;
  customSlippageValue: string;
  selectedSpeedFee: SpeedFeeType;
  customSpeedFeeValue: string;
};

export type TransactionContextType = {
  // slippage: SlippageType;
  // customSlippage: number;
  // speedFee: SpeedFeeType;
  // maxSpeedFee: number;
  handleSet: (props: TransactionContextHandleSetProps) => void;
  resetTransactionSettings: () => void;
  getTransactionSettingsValues: {
    slippage: SlippageType;
    customSlippage: string;
    speedFee: SpeedFeeType;
    maxSpeedFee: string;
  };
  transactionOptions: {
    priorityFeeLevel: PriorityFeeType | undefined;
    priorityFee: number;
    slippage: FilterSlippageType;
  };
  settingsName: {
    label: string;
    value?: FilterSlippageType;
  };
};

export type WalletTabType = {name: string; surname: string};
export type WalletTabDataType = WalletTokenDetail | WalletTabType;

export type WalletModalDataType = {
  mintImage?: string;
  mint: string;
  to: string;
  symbol: string;
  networkFee: number;
  amount: number;
  amountUsd: number;
  tx: string;
};

export type WalletDomainDataType = {
  tx: string;
  domain: string;
};

export type WalletContextType = {
  selectedTabIndex: number;
  setSelectedTabIndex: (index: number) => void;
  balance?: number;
  totalChange?: number;
  widiDomains: string[];
  searchText: string;
  handleSearchTextChange: (text: string) => void;
  tabData: WalletTabType[];
  // handleRenderItem: ListRenderItem<TabDataType>;
  tokens: WalletResponse | undefined;
  tokensIsLoading: boolean;
  sendTokenData: SendTokenDataType[];
  pnlData: PnLResponse | undefined;
  showTransactionModal: boolean;
  sendModalData: WalletModalDataType | undefined;
  setSendModalData: (data: WalletModalDataType | undefined) => void;
  handleRefresh: () => Promise<void>;
  refreshing: boolean;
  showDomainModal: boolean;
  domainModalData: WalletDomainDataType | undefined;
  handleDomainModalData: (data: WalletDomainDataType) => void;
  closeDomainModal: () => void;
};

export type DataContextType = {
  // TOKENS
  trendingData: TokenResponse[];
  setTrendingData: (data: TokenResponse[]) => void;
  volumeData: TokenResponse[];
  setVolumeData: (data: TokenResponse[]) => void;
  newData: TokenResponse[];
  setNewData: (data: TokenResponse[]) => void;
  marketCapData: TokenResponse[];
  setMarketCapData: (data: TokenResponse[]) => void;
  graduateData: TokenResponse[];
  setGraduateData: (data: TokenResponse[]) => void;
  toGraduateData: TokenResponse[];
  setToGraduateData: (data: TokenResponse[]) => void;
  subscribePools: SubscribePoolType[];
  sendingSubscribePools: SubscribePoolType[];
  fetchTokenData: (
    name: TabName,
    timeRange: keyof TokenEvents,
    count?: number,
  ) => Promise<void>;
  tokenTabStates: (name: TabName) => {
    data: TokenResponse[];
    setData: Dispatch<SetStateAction<TokenResponse[]>>;
    dataString: string[];
    hasMore: boolean;
  };
  // LEADERS
  haveUserPortfolio: boolean;
  trendingPortfolios: LeadersServiceType | undefined;
  mostCopiedPortfolios: LeadersServiceType | undefined;
  favoritePortfolios: LeadersServiceType | undefined;
  leaderRefreshing: boolean;
  refreshFavoriteData: () => Promise<void>;
  refreshLeadersData: () => Promise<void>;
  leaderLoadMore: (type: PortfolioKeyType) => Promise<void>;
};
