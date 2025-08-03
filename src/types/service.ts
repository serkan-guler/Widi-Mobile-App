import {Asset} from 'react-native-image-picker/lib/typescript/types';
import {Portfolio} from './portfolio';
import {UserType} from './user';

export type ErrorResponseType = {
  message: string;
  // type: string;
  logs: unknown[];
};

export type SuccessResponseType<T> = {
  status: 'success';
  message: string;
  data: T;
};

export type ErrorResponseWrapper = {
  status: 'error';
  message: string;
  error: ErrorResponseType;
};

export type AppResponseType<T> = SuccessResponseType<T> | ErrorResponseWrapper;

export type RegisterServiceResponseType = {
  token: string;
  user: UserType;
};

export type HasMoreDataResponseType<T> = {
  hasMore: boolean;
  totalCount: number;
  page: number;
  pageSize: number;
  data: T[];
};

/* export type PortfolioKeyType = 'trend' | 'mostCopied' | 'favorites';

export type LeadersServiceType = {
  havePortfolio: boolean;
  portfolios: {
    [key in PortfolioKeyType]: HasMoreDataResponseType<{
      portfolios: Portfolio[];
      trader: string;
    }>;
  };
}; */

export type FileDataType = {
  [key: string]: Asset;
};

// export type LeadersServiceType = {
//   [key: string]: {
//     trader: string;
//     portfolios: Portfolio[];
//   };
// };
