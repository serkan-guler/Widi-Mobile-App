import {z} from 'zod';
import {addPortfolioSchema} from '../validations/porfolio';
import {DefaultModel} from './model';
import {UserRole, UserType} from './user';
import {PnLResponse} from './token';

export type PortfolioKeyType = 'trend' | 'mostCopied' | 'favorites';
export type PortfolioType = 'public' | 'private';
// export type PortfolioStatus = 'active' | 'completed' | 'cancelled';
export type PortfolioStatus = 'active' | 'completed' | 'cancelled';
export type PortfolioTradeTypes = 'buy' | 'sell';

export type AddPortfolioType = z.infer<typeof addPortfolioSchema>;

type PNLRoiType = {
  roi: number;
  realizedPnl: number;
  unrealizedPnl: number;
  pnl: number;
  pnl7d: number;
  pnl14d: number;
  pnl21d: number;
  pnl30d: number;
};

export type BaseTokenMetaDataType = {
  asset: string;
  assetMint: string;
  assetDecimals: number;
  assetImage?: string;
  tradeDate: Date;
};

type BaseTokenType = BaseTokenMetaDataType & {
  quantity: number;
  fee: number;
  percentageOfTrader: number;
};

type BaseTokenTradeType = BaseTokenType & {
  tradeType: PortfolioTradeTypes;
  price: number;
  priceUsd: number;
  size: number;
  sizeUsd: number;
};

type TokenCostType = BaseTokenMetaDataType & {
  quantity: number;
  avarageCostPrice: number;
  avarageClosePrice: number;
  entryPrice: number;
  closePrice: number;
};

type TraderProfitShareType = {
  trader: string;
  pool: string;
  profitShare: number;
};

export type Portfolio = DefaultModel &
  PNLRoiType & {
    trader: string;
    traderInfo: UserType;
    type: PortfolioType;
    name: string;
    openingDate: string;
    closingDate?: string;
    lockPeriod: number;
    profitShare: number;
    maxParticipants: number;
    minInvestment: number;
    isActive: boolean;
    status: PortfolioStatus;

    participantCount: number;
    initialAmount: number;
    totalInvestment: number;
    currentBalance: number;

    totalPositions: number;
    profitablePositions: number;
    aum: number;

    code?: string;
    walletAddress?: string;
  };

export type PoolParticipantType = Document & {
  pool: string;
  user: string;
  participantType: UserRole;
  investmentAmount: number;
  investmentRate: number;
  joinedDate: string;
  departureDate?: string;
  isActive: boolean;
  currentBalance: number;
  profitLoss: number;
  totalProfit: number;
  totalLoss: number;
  totalTradesCount: number;
  totalTradesProfitCount: number;
  totalTradesLossCount: number;
  totalTradesFee: number;
  unrealizedPnL: number;
  unrealizedPnlRate: number;
  lockPeriodEndDate: string;
};

export type PortfolioDetailType = Portfolio & {
  isLiked: boolean;
  favoriteCount: number;
};

export type PortfolioWithPnL = {
  pool: Portfolio & {
    isParticipant: boolean;
  };
  pnl: PnLResponse;
};

export type PortfolioWithIsParticipant = Portfolio & {
  isParticipant: boolean;
};

export type LeadersServiceType = {
  data: PortfolioWithIsParticipant[];
  hasMore: boolean;
  totalCount: number;
  page: number;
  pageSize: number;
};
