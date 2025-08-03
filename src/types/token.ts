import {PoolTypes} from './pool';
import {WalletTokenData} from './wallet';

export type TabName =
  | 'trending'
  | 'volume'
  | 'marketCap'
  | 'new'
  | 'aboutToGraduate'
  | 'graduate';

export type TradeType = 'buy' | 'sell';

export type TokenSearchResult = {
  id: string;
  name: string;
  symbol: string;
  mint: string;
  image?: string;
  decimals: number;
  hasSocials: boolean;
  poolAddress: string;
  liquidityUsd: number;
  marketCapUsd: number;
  priceUsd: number;
  lpBurn: number;
  market: string;
  quoteToken: string;
  freezeAuthority: string | null;
  mintAuthority: string | null;
  deployer: string;
  status: string;
  createdAt: number;
  lastUpdated: number;
  holders: number;
  buys: number;
  sells: number;
  totalTransactions: number;
  volume: number;
  volume_5m: number;
  volume_15m: number;
  volume_30m: number;
  volume_1h: number;
  volume_6h: number;
  volume_12h: number;
  volume_24h: number;
  tokenDetails?: {
    creator: string;
    tx: string;
    time: number;
  };
};

export type TokenDetailResponse = {
  token: TokenInfo;
  pools: PoolInfo[];
  events: TokenEvents;
  risk: TokenRisk;
  buys: number;
  sells: number;
  txns: number;
  holders?: number;
};

export type TokenInfo = {
  name: string;
  symbol: string;
  mint: string;
  uri?: string;
  decimals: number;
  description?: string;
  image?: string;
  hasFileMetaData?: boolean;
  strictSocials?: {
    twitter?: string;
    telegram?: string;
    discord?: string;
    website?: string;
  };
  showName?: boolean;
  twitter?: string;
  telegram?: string;
  website?: string;
  discord?: string;
  createdOn?: string;
  creation?: {
    creator: string;
    created_tx: string;
    created_time: number;
  };
  [key: string]: any;
};

export type TokenValuePair = {
  quote: number;
  usd: number;
};

type TokenSecurity = {
  freezeAuthority: string | null;
  mintAuthority: string | null;
};

export type TokenPoolTxns = {
  buys: number;
  total: number;
  volume: number;
  sells: number;
};

export type PoolInfo = {
  poolId: string;
  liquidity: TokenValuePair;
  price: TokenValuePair;
  tokenSupply: number;
  lpBurn: number;
  tokenAddress: string;
  marketCap: TokenValuePair;
  market: string;
  quoteToken: string;
  decimals: number;
  security: TokenSecurity;
  lastUpdated: number;
  deployer?: string;
  txns?: TokenPoolTxns;
  curvePercentage?: number;
  curve?: string;
  createdAt?: number;
  bundleId?: string;
};

type PriceChangeData = {
  priceChangePercentage: number;
};

export type TokenEvents = {
  '1m'?: PriceChangeData;
  '5m'?: PriceChangeData;
  '15m'?: PriceChangeData;
  // '30m'?: PriceChangeData;
  '1h'?: PriceChangeData;
  // '2h'?: PriceChangeData;
  // '3h'?: PriceChangeData;
  '4h'?: PriceChangeData;
  // '5h'?: PriceChangeData;
  '6h'?: PriceChangeData;
  // '12h'?: PriceChangeData;
  '24h'?: PriceChangeData;
};

export type TokenRiskFactor = {
  name: string;
  description: string;
  level: 'warning' | 'danger';
  score: number;
};

export type TokenRiskFactorWidthValue = TokenRiskFactor & {
  value?: string;
};

export type TokenRisk = {
  rugged: boolean;
  risks: TokenRiskFactorWidthValue[];
  score: number;
  jupiterVerified?: boolean;
};

export type TokenRiskDataType = TokenRiskFactor & {
  nameData: string;
  descriptionData: string;
  value?: string;
};

export type TokenResponse = {
  poolId: string;
  symbol: string;
  name?: string;
  mint: string;
  image?: string;
  liquidityUsd: number;
  marketCapUsd: number;
  priceUsd: number;
  market?: string;
  createdAt: number;
  volume: number;
  events?: TokenEvents;
  decimals: number;
  uri?: string;
};

export type TokenDetailServiceType = {
  tokenInfo: TokenDetailResponse;
  pnl?: PnLData;
  solPrice: number;
  poolData: PoolTraderTokenType[];
};

export type ChartResponse = {
  open: number;
  close: number;
  low: number;
  high: number;
  volume: number;
  time: number;
};

export type Holder = {
  address: string;
  amount: number;
  value: TokenValuePair;
  percentage: number;
};

export type TokenHoldersResponse = {
  total: number;
  accounts: Holder[];
};

export type TokenStats = {
  '1m'?: TimeframeStats;
  '5m'?: TimeframeStats;
  '15m'?: TimeframeStats;
  '30m'?: TimeframeStats;
  '1h'?: TimeframeStats;
  '4h'?: TimeframeStats;
  '24h'?: TimeframeStats;
};

export type TimeframeStats = {
  buyers: number;
  sellers: number;
  volume: {
    buys: number;
    sells: number;
    total: number;
  };
  transactions: number;
  buys: number;
  sells: number;
  wallets: number;
  price: number;
  priceChangePercentage: number;
};

export type SearchResult = {
  id: string;
  name: string;
  symbol: string;
  mint: string;
  image?: string;
  decimals: number;
  hasSocials: boolean;
  poolAddress: string;
  liquidityUsd: number;
  marketCapUsd: number;
  priceUsd: number;
  lpBurn: number;
  market: string;
  quoteToken: string;
  freezeAuthority: string | null;
  mintAuthority: string | null;
  deployer: string;
  status: string;
  createdAt: number;
  lastUpdated: number;
  holders: number;
  buys: number;
  sells: number;
  totalTransactions: number;
  volume: number;
  volume_5m: number;
  volume_15m: number;
  volume_30m: number;
  volume_1h: number;
  volume_6h: number;
  volume_12h: number;
  volume_24h: number;
  tokenDetails?: {
    creator: string;
    tx: string;
    time: number;
  };
};

export type PnLData = {
  holding: number;
  held: number;
  sold: number;
  realized: number;
  unrealized: number;
  total: number;
  total_sold: number;
  total_invested: number;
  average_buy_amount: number;
  current_value: number;
  cost_basis: number;
  sold_usd?: number;
  first_buy_time?: number;
  last_buy_time?: number;
  last_sell_time?: number;
  last_trade_time?: number;
  buy_transactions?: number;
  sell_transactions?: number;
  total_transactions?: number;
};
export type PnLSummary = {
  realized: number;
  unrealized: number;
  total: number;
  totalInvested: number;
  averageBuyAmount: number;
  totalWins: number;
  totalLosses: number;
  winPercentage: number;
  lossPercentage: number;
  neutralPercentage?: number;
};

export type SummaryNewTokens = {
  count: number;
  pnl_percentage: number;
  tokens: {
    [tokenAddress: string]: {
      current_value: number;
      first_buy_ammount: number;
      first_buy_value: number;
      realized: number;
      total: number;
      unrealizzed: number;
    };
  };
  total_current_value: number;
  total_invested: number;
  total_pnl: number;
};

export type HistoricSummary = {
  lossPercentage: number;
  losses: number;
  newTokens: SummaryNewTokens;
  percentageChange: number;
  realizedChange: number;
  totalChange: number;
  totalPnl: number;
  unrealizedChange: number;
  winPercentage: number;
  wins: number;
};

export type PnLResponse = {
  tokens: {
    [tokenAddress: string]: PnLData;
  };
  summary: PnLSummary;
  historic: {
    summary: {
      '1d': HistoricSummary;
      '7d': HistoricSummary;
      '30d': HistoricSummary;
    };
  };
  pnl_since: number;
};

export type SearchDataType = SearchResult & {
  events?: TokenEvents;
};

export type SearchResultType = {
  status: string;
  data: SearchDataType[];
};

export type Trade = {
  tx: string;
  amount: number;
  priceUsd: number;
  volume: number;
  // volumeSol: number;
  type: TradeType;
  wallet: string;
  time: number;
  program: string;
  // pools: string[];
  // meta?: TradeMetadata;
};
export type ChartTimeType = keyof Omit<TokenEvents, '5m' | '6h'>;

export type PoolTraderTokenType = {
  id: string;
  quantity: number | undefined;
  assetMint: string;
  walletAddress: string;
  type: PoolTypes;
};

export type JupPriceResponse = {
  [tokenMint: string]: {
    usdPrice: number;
    blockId: number;
    decimals: number;
    priceChange24h: number;
  };
};

export type QuoteResponseType = {
  prices?: JupPriceResponse;
  priceImpact: number;
  networkFee: number;
  swapTransaction: string;
  tokenAmount?: number;
  tokenAmountUsd?: number;
  simulationError: {
    errorCode: string;
    error: string;
  } | null;
};

export type QuoteTrackerResponseType = {
  txn: string;
  outAmount: number;
  impact: number;
  fee: number;
  mintPrice: number;
};

export type TokenPriceData = {
  price: number;
  priceQuote: number;
  liquidity: number;
  marketCap: number;
  lastUpdated: number;
};

export type SubscribePoolType = {
  wallet: string;
  poolId: string;
};

export type FilterFeeType = 'auto' | 'fast' | 'econ';
export type FilterSlippageType = number | 'auto';
export type PriorityFeeType = 'low' | 'high' | 'veryHigh';
export type SlippageType = FilterSlippageType | 'custom';
export type SpeedFeeType = FilterFeeType | 'custom';
