import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {NavigatorScreenParams} from '@react-navigation/native';
import {UserType} from './user';
import {TokenEvents} from './token';
import {PortfolioTradeTypes} from './portfolio';

export type AuthStackParamList = {
  Onboarding: undefined;
  ConnectAccount: undefined;
  GetUsername: {token: string; secret: string; username: string};
  WidiCode: {
    token: string;
    secret: string;
    username: string;
    isRegistered: boolean;
    bio?: string;
  };
  TermsModal: undefined;
  PrivacyModal: undefined;
};

export type SendTokenDataType = {
  mint: string;
  image: string | undefined;
  name: string;
  symbol: string;
  count: number;
  decimal: number;
};

type WalletScreenCommonParams = {
  mint: string;
  decimal: number;
  count: number;
  symbol: string;
  image?: string;
};

export type AppStackParamList = {
  Tab: NavigatorScreenParams<MainTabParamList>;
  // Profile
  EditProfile: undefined;
  Language: undefined;
  Notifications: undefined;
  Privacy: undefined;
  Terms: undefined;
  // Token
  TokenFilter: undefined;
  TokenSearch: undefined;
  TokenDetail: {mint: string; pool: string};
  TokenTrade: {
    mint: string;
    price: number;
    symbol: string;
    type: PortfolioTradeTypes;
    wallet: string;
    image?: string;
    decimal: number;
    tokenCount?: number;
    solPrice: number;
  };
  TransactionSetting: undefined;
  SortTime: {range: keyof TokenEvents} | undefined;
  // Wallet
  Domain: undefined;
  ExportWallet: undefined;
  SelectSendToken: {
    data: SendTokenDataType[];
  };
  CheckSendWallet: WalletScreenCommonParams;
  Send: WalletScreenCommonParams & {
    to: string;
  };
  SendSummary: WalletScreenCommonParams & {
    to: string;
    amount: number;
    feeEstimate: number;
  };
  // Copied
  CopyDetail: {id: string};
  PrivateCode: {
    id: string;
    favoriteCount: number;
    isLiked: boolean;
    trader: UserType;
    openingDate: string;
    totalCopiers: number;
    maxParticipants: number;
    minCopyAmount: number;
    profitShare: number;
    lockPeriod: number;
  };
  CopyAmount: {
    id: string;
    favoriteCount: number;
    isLiked: boolean;
    trader: UserType;
    openingDate: string;
    totalCopiers: number;
    maxParticipants: number;
    minCopyAmount: number;
    profitShare: number;
    lockPeriod: number;
  };
  // Portfolio
  BeLeader: undefined;
};

export type MainTabParamList = {
  Token: undefined;
  Leader: undefined;
  Wallet: undefined;
  Copied: undefined;
  Portfolio: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppStackParamList>;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  NativeStackScreenProps<MainTabParamList, T>;

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
