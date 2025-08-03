import {WALLET_URLS} from '../constants/api';
import {PnLResponse, TokenPriceData, WalletResponse} from '../types';
import {getService, postService} from './service';

export const searchDomain = async (data: string) => {
  return await postService<string>({
    url: WALLET_URLS.searchDomainUrl,
    data: {subdomain: data},
  });
};

export const getWalletService = async () =>
  await getService<{
    pnl: PnLResponse;
    solPrice?: TokenPriceData;
  }>({
    url: WALLET_URLS.walletUrl,
  });

export const getWidiDomainService = async () =>
  getService<string[]>({
    url: WALLET_URLS.widiDomainUrl,
  });

export const getTokensService = async () =>
  getService<WalletResponse>({
    url: WALLET_URLS.tokensUrl,
  });

export const checkToWalletAddress = async (address: string) =>
  await getService<boolean | string>({
    url: `${WALLET_URLS.checkToWalletAddressUrl}/${address}`,
  });

export const getWalletBalance = async () =>
  await getService<number>({url: WALLET_URLS.walletBalanceUrl});

export const getTradeBalance = async (walletAddress: string) =>
  // await postService<{balance: number; solPrice: number}>({
  await postService<number>({
    url: WALLET_URLS.walletTradeBalanceUrl,
    data: {walletAddress},
  });

export const sendTransactionService = async (data: unknown) =>
  await postService<string>({
    url: WALLET_URLS.sendTransactionUrl,
    data,
  });

export const buildSendTransactionService = async (
  mint: string,
  amount: number,
  recipient: string,
  decimals: number,
) =>
  await postService<{feeEstimate: number; transaction: string}>({
    url: WALLET_URLS.buildTransactionUrl,
    data: {
      mint,
      amount,
      recipient,
      decimals,
    },
  });
