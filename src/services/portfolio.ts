import {PORTFOLIO_URLS} from '../constants/api';
import {
  AddPortfolioType,
  HasMoreDataResponseType,
  LeadersServiceType,
  Portfolio,
  PortfolioDetailType,
} from '../types';
import {getService, postService} from './service';

export const checkPortfolioNameService = async (name: string) =>
  await postService<boolean>({
    url: `${PORTFOLIO_URLS.checkPortfolioNameUrl}`,
    data: {name},
  });

export const createPortfolioService = async (data: AddPortfolioType) =>
  await postService<{poolId: string; tx: string}>({
    url: PORTFOLIO_URLS.createPortfolioUrl,
    data,
  });

export const activePortfoliosService = async () =>
  await getService<Portfolio[]>({
    url: PORTFOLIO_URLS.activePortfoliosUrl,
  });

export const passivePortfoliosService = async (length: number) => {
  const params = new URLSearchParams({
    count: length.toString(),
  });
  return await getService<HasMoreDataResponseType<Portfolio>>({
    url: `${PORTFOLIO_URLS.passivePortfoliosUrl}?${params.toString()}`,
  });
};

export const getTrendingLeadersService = async (count: number) =>
  await getService<{havePortfolio: boolean; portfolios: LeadersServiceType}>({
    url: `${PORTFOLIO_URLS.trendingLeadersUrl}/${count}`,
  });

export const getMostCopiedLeadersService = async (count: number) =>
  await getService<LeadersServiceType>({
    url: `${PORTFOLIO_URLS.mostCopiedLeadersUrl}/${count}`,
  });

export const getFavoritedLeadersService = async (count: number) =>
  await getService<LeadersServiceType>({
    url: `${PORTFOLIO_URLS.favoritedLeadersUrl}/${count}`,
  });

export const checkPortfolioCodeService = async (id: string, code: string) =>
  await postService<string>({
    url: PORTFOLIO_URLS.checkPortfolioCodeUrl,
    data: {
      portfolio: id,
      code,
    },
  });

export const copyDetailService = async (id: string) =>
  await getService<PortfolioDetailType>({
    url: `${PORTFOLIO_URLS.copyDetailUrl}/${id}`,
  });

export const copyPortfolioService = async (data: unknown) =>
  await postService<string>({
    url: PORTFOLIO_URLS.copyPortfolioUrl,
    data,
  });

export const getSignMessageService = async () =>
  getService<string>({url: PORTFOLIO_URLS.signMessageUrl});
