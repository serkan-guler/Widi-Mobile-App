import {TOKEN_URLS} from '../constants/api';
import type {
  ChartResponse,
  ChartTimeType,
  Holder,
  MinMax,
  QuoteResponseType,
  TokenDetailServiceType,
  TokenPriceData,
  TokenResponse,
  TokenStats,
  TradeType,
} from '../types';
import {getService, postService} from './service';

type TokensServiceParams = {
  type: string;
  marketCap: MinMax;
  volume: MinMax;
  liquidity: MinMax;
  timeRange: string;
  startCount: string;
};

export const tokensService = async (data: TokensServiceParams) => {
  return await postService<{tokens: TokenResponse[]; hasMore: boolean}>({
    url: TOKEN_URLS.tokensUrl,
    data,
  });
};

export const tokenDetailService = async (mint: string, pool: string) =>
  getService<TokenDetailServiceType>({
    url: `${TOKEN_URLS.tokenDetail}/${mint}/${pool}`,
  });

export const tokenChartDataService = async (
  mint: string,
  pool: string,
  time: ChartTimeType,
  type: 'marketCap' | 'price',
) =>
  getService<ChartResponse[]>({
    url: `${TOKEN_URLS.tokenChartData}/${mint}/${pool}/${time}/${type}`,
  });

export const tokenStatsDataService = async (mint: string, pool: string) =>
  await getService<TokenStats>({
    url: `${TOKEN_URLS.tokenStatsData}/${mint}/${pool}`,
  });

export const tokenHoldersDataService = async (mint: string) =>
  await getService<Holder[]>({
    url: `${TOKEN_URLS.tokenHoldersData}/${mint}`,
  });

export const tokenPnlDataService = async (mint: string) =>
  await getService<Holder[]>({
    url: `${TOKEN_URLS.tokenPnlData}/${mint}`,
  });

export const tokenQuoteService = async (data: unknown) =>
  postService<QuoteResponseType>({url: TOKEN_URLS.tokenQuote, data});

export const tokenSearchHistoryService = async (
  searchHistory: {mint: string; pool: string}[],
) =>
  await postService<TokenResponse[]>({
    url: TOKEN_URLS.tokenSearchHistory,
    data: {ids: searchHistory},
  });

export const tokenPriceService = async (mint: string) => {
  return await postService<TokenPriceData>({
    url: `${TOKEN_URLS.tokenPrice}`,
    data: {mint},
  });
};

export const tokenSwapService = async (txn: string) =>
  await postService<string>({
    url: TOKEN_URLS.tokenSwap,
    data: {txn},
  });
export const tokenSwapPoolService = async (
  txn: string,
  wallet: string,
  amount: string,
  tradeType: TradeType,
  mint: string,
  symbol: string,
  solPrice: number,
  mintPrice: number,
  image?: string,
) =>
  await postService<string>({
    url: TOKEN_URLS.tokenSwapPool,
    data: {
      txn,
      tokenWallet: wallet,
      amount,
      tradeType,
      mint,
      symbol,
      image,
      solPrice,
      mintPrice,
    },
  });
