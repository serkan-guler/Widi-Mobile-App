import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  VersionedTransaction,
} from '@solana/web3.js';
import {
  FilterSlippageType,
  JupPriceResponse,
  PriorityFeeType,
  QuoteResponseType,
  QuoteTrackerResponseType,
  TradeType,
} from '../types';
import {SOL_MINT} from '@env';
import {SOLANA_URLS, TOKEN_URLS} from '../constants/api';
import i18n from '../localization/i18n';
import {postService} from '../services/service';
import bs58 from 'bs58';
import {Buffer} from '@craftzdog/react-native-buffer';
import {tokenSwapService} from '../services';
import WalletManager from '../lib/WalletManager';

type QuoteParamsOld = {
  wallet: string;
  mint: string;
  type: TradeType;
  amount: number;
  priorityFee: PriorityFeeType;
  maxPriorityFee: number;
  slippage: FilterSlippageType;
  decimals: number;
};
type QuoteParams = {
  wallet: string;
  mint: string;
  type: TradeType;
  amount: number;
  priorityFee: number;
  priorityFeeLevel: PriorityFeeType | undefined;
  slippage: FilterSlippageType;
};

declare global {
  var base64FromArrayBuffer: ((buffer: ArrayBuffer) => string) | undefined;
  var base64ToArrayBuffer: ((base64: string) => ArrayBuffer) | undefined;
}

if (typeof global.base64FromArrayBuffer === 'undefined') {
  global.base64FromArrayBuffer = function (buffer: ArrayBuffer): string {
    const uint8Array = new Uint8Array(buffer);
    const binaryString = Array.from(uint8Array)
      .map(b => String.fromCharCode(b))
      .join('');
    return btoa ? btoa(binaryString) : Buffer.from(buffer).toString('base64');
  };
}

if (typeof global.base64ToArrayBuffer === 'undefined') {
  global.base64ToArrayBuffer = function (base64: string): ArrayBuffer {
    const binaryString = atob
      ? atob(base64)
      : Buffer.from(base64, 'base64').toString('binary');
    const uint8Array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }
    return uint8Array.buffer;
  };
}

const errorNs = {ns: 'errors'};

const header: RequestInit = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getPrices = async (
  mints: string[],
): Promise<JupPriceResponse | undefined> => {
  try {
    const mintString = mints.join(',');
    const tokenPrices = await fetch(
      `${SOLANA_URLS.jupiterPriceApi}?ids=${SOL_MINT},${mintString}`,
    );
    if (!tokenPrices.ok || tokenPrices.status !== 200) {
      return;
    }

    return await tokenPrices.json();
  } catch (error) {
    console.log('Error fetching prices:', error);
    return;
  }
};

export const quote = async ({
  wallet,
  mint,
  type,
  amount,
  decimals,
  priorityFee,
  maxPriorityFee,
  slippage,
}: QuoteParamsOld): Promise<QuoteResponseType | string> => {
  try {
    const ownerWallet = new PublicKey(wallet);
    const inputAddress = type === 'buy' ? SOL_MINT : mint;
    const outputAddress = type === 'sell' ? SOL_MINT : mint;
    // const totalAmount = amount * Math.pow(10, decimals);
    const totalAmount = Number(
      (amount * Math.pow(10, type === 'buy' ? 9 : decimals)).toFixed(0),
    );
    const fee = Math.floor(totalAmount / 100); // %1 komisyon (tam sayı)
    const amountAfterFee = totalAmount - fee;

    // const requiredSOL = totalAmount / LAMPORTS_PER_SOL + 0.01; // minimum buffer
    const urlSlippage = slippage
      ? `slippageBps=${slippage || 0 * 100}`
      : 'dynamicSlippage=true';

    const response = await fetch(
      `${SOLANA_URLS.jupiterSwapApi}/quote?inputMint=${inputAddress}&outputMint=${outputAddress}&amount=${type === 'buy' ? amountAfterFee : totalAmount}&${urlSlippage}&restrictIntermediateTokens=true${type === 'buy' ? '' : '&platformFeeBps=100'}`,
    );

    if (!response.ok || response.status !== 200) {
      const rrr = await response.json();
      console.log('Fail Response', rrr);
      return i18n.t('solana.failedPrepareTransaction', {ns: 'errors'});
    }

    const result = await response.json();
    const tokenAmountLamport: number = Number(
      result.routePlan[0].swapInfo.outAmount,
    );
    const calcDecimals = type === 'sell' ? 9 : decimals;
    const tokenAmount = tokenAmountLamport / Math.pow(10, calcDecimals);

    const transactionUrl = `${SOLANA_URLS.jupiterSwapApi}/swap`;

    const transactionResponse = await fetch(transactionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quoteResponse: result,
        userPublicKey: ownerWallet,

        // ADDITIONAL PARAMETERS TO OPTIMIZE FOR TRANSACTION LANDING
        // See next guide to optimize for transaction landing
        dynamicComputeUnitLimit: true,
        // dynamicSlippage: true,
        prioritizationFeeLamports: {
          priorityLevelWithMaxLamports: {
            maxLamports: maxPriorityFee * LAMPORTS_PER_SOL,
            priorityLevel: priorityFee,
          },
        },
      }),
    });

    if (!transactionResponse.ok || transactionResponse.status !== 200) {
      const rrr = await transactionResponse.json();
      console.log('Fail transactionResponse', rrr);
      return i18n.t('solana.failedPrepareTransaction', {ns: 'errors'});
    }

    const body = await transactionResponse.json();

    const prices = await getPrices([mint]);

    const totalFeeLamports = 5000 + body.prioritizationFeeLamports;
    const solPrice = prices ? prices[SOL_MINT].usdPrice : 0;
    const mintPrice = prices ? prices[mint].usdPrice : 0;
    const networkFeeLamport = totalFeeLamports / LAMPORTS_PER_SOL; // Convert network fee to USD
    const networkFee = networkFeeLamport * solPrice;

    const returnedTransaction: QuoteResponseType = {
      prices,
      priceImpact: Number(result.priceImpactPct),
      networkFee,
      swapTransaction: body.swapTransaction as string,
      tokenAmount,
      tokenAmountUsd: tokenAmount * (type === 'buy' ? mintPrice : solPrice),
      simulationError: body.simulationError,
    };

    return returnedTransaction;
  } catch (error) {
    console.error('Quote operation failed:', error);
    return i18n.t('unknownError', {ns: 'errors'});
  }
};

export const quoteTracker = async ({
  wallet,
  mint,
  type,
  amount,
  priorityFee,
  priorityFeeLevel,
  slippage,
}: QuoteParams): Promise<QuoteTrackerResponseType | string> => {
  /**
   * auto => priorityFee: auto, priorityFeeLevel: high
   * eco => priorityFee: auto, priorityFeeLevel: low
   * fast => priorityFee: auto, priorityFeeLevel: veryHigh
   * custom => priorityFee number olacak, priorityFeeLevel olmayacak
   *
   * Tüm değerler min,low,medium,high,veryHigh,unsafeMax
   */

  const from = type === 'buy' ? SOL_MINT : mint;
  const to = type === 'sell' ? SOL_MINT : mint;
  try {
    const init = {
      ...header,
      body: JSON.stringify({
        from,
        to,
        amount,
        slippage,
        payer: wallet,
        txVersion: 'v0',
        priorityFee:
          typeof priorityFeeLevel === 'undefined' ? priorityFee : 'auto',
        priorityFeeLevel,
        feeType: 'deduct',
        fee: 'J2Kpp2TzarnqSpnHmeJZBfeEnffPqbDFM3qzPRKLvxPf:1', // NOTE: Backend'ten istenecek
      }),
    };
    const response = await fetch(`${SOLANA_URLS.trackerApi}/swap`, init);

    if (!response.ok || response.status !== 200) {
      const rrr = await response.json();
      console.log('Fail Response', rrr);
      return i18n.t('unknownError', errorNs);
      // return i18n.t('solana.failedPrepareTransaction', {ns: 'errors'});
    }

    const result = await response.json();

    const simulate = await postService({
      url: TOKEN_URLS.simulateTransaction,
      data: {txn: result.txn},
    });

    if (simulate.status === 'error') {
      return simulate.message;
    } else {
      const transactionFee: number = result.rate.fee;
      const priorityFee: number =
        result.rate.priorityFeeLamports / LAMPORTS_PER_SOL;
      const totalFee = transactionFee + priorityFee;
      return {
        txn: result.txn,
        outAmount: result.rate.minAmountOut,
        impact: result.rate.priceImpact,
        fee: totalFee,
        mintPrice: result.rate.price.usd,
      };
    }
  } catch (error) {
    console.error('Quote operation failed:', error);
    return i18n.t('unknownError', errorNs);
  }
};

export const singTransaction = async (tx: string) => {
  try {
    const walletData = await WalletManager.getWalletSecret();

    if (!walletData.keypair) {
      console.error('Wallet data not found');
      // return false;
      return 'walletManager.walletDataNotFound';
    }
    // const secret = walletData.privateKey;
    // const senderWalletKeypair = Keypair.fromSecretKey(bs58.decode(secret));
    const buffer = Buffer.from(tx, 'base64');
    const transaction = VersionedTransaction.deserialize(buffer);
    transaction.sign([walletData.keypair]);
    const signedTxBase64 = Buffer.from(transaction.serialize()).toString(
      'base64',
    );
    return signedTxBase64;
  } catch (error) {
    return 'walletManager.walletError';
  }
};

export const doTransaction = async (tx: string) => {
  try {
    const signedTxBase64 = await singTransaction(tx);
    if (
      typeof signedTxBase64 === 'string' &&
      signedTxBase64.startsWith('walletManager.')
    ) {
      return signedTxBase64; // Return error message
    }
    const response = await tokenSwapService(signedTxBase64);
    return response;
  } catch (error) {
    console.log('Transaction failed:', error);
    // return false;
    return 'solana.failedToSend';
  }
};
