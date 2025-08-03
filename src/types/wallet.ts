import {
  PnLResponse,
  PoolInfo,
  TokenEvents,
  TokenInfo,
  TokenRisk,
  TokenValuePair,
} from './token';

export type WalletTokenDetail = {
  token: TokenInfo;
  pools?: PoolInfo[];
  events?: TokenEvents;
  risk?: TokenRisk;
  balance: number;
  value: number;
};

export type WalletResponse = {
  tokens: WalletTokenDetail[];
  total: number;
  totalSol: number;
  timestamp: string;
};

export type WalletServiceType = {
  tokens: WalletResponse;
  widiDomain: string[];
  pnl: PnLResponse;
};

export type WalletTokenData = {
  address: string;
  balance: number;
  value: number;
  price: TokenValuePair;
  marketCap: TokenValuePair;
  liquidity: TokenValuePair;
};
