import {FEE_ACCOUNT} from '@env';
import WalletManager from './WalletManager';
import {VersionedTransaction} from '@solana/web3.js';

type TriggerStatusType = 'active' | 'history';

class Jupiter {
  static jupiterUrl: string = 'https://lite-api.jup.ag/trigger/v1';
  static createOrderUrl: string = '/createOrder';
  static executeOrderUrl: string = '/execute';
  static cancelOrderUrl: string = '/cancelOrder';
  static getTriggerOrdersUrl: string = '/getTriggerOrders';

  static readonly requestInit: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  /**
   * Create a new order on the Jupiter API.
   * Minimum inputAmount 5.01 $ olmalı.
   * @param inputMint The mint address of the input token.
   * @param outputMint The mint address of the output token.
   * @param inputAmount The amount of the input token to swap.
   * @param outputAmount The amount of the output token to receive.
   * @param expiredAt The expiration time of the order in unix seconds.
   */
  static async createOrder(
    inputMint: string,
    outputMint: string,
    inputAmount: number, //NOTE: amount * inputMint Decimals
    outputAmount: number, //NOTE: amount * outputMint Decimals
    expiredAt?: number, // In unix seconds (e.g. Date.now()/1_000) or optional
  ) {
    try {
      const walletData = await WalletManager.getWalletSecret();

      if (!walletData || !walletData.keypair || !walletData.publicKey) {
        return;
      }

      const response = await fetch(
        `${Jupiter.jupiterUrl}${Jupiter.createOrderUrl}`,
        {
          ...Jupiter.requestInit,
          body: JSON.stringify({
            inputMint: inputMint,
            outputMint: outputMint,
            maker: walletData.publicKey,
            payer: walletData.publicKey,
            params: {
              makingAmount: inputAmount.toString(),
              takingAmount: outputAmount.toString(),
              // slippageBps: "", // Optional, by nature, trigger orders execute with 0 slippage
              // expiredAt: "", // In unix seconds (e.g. Date.now()/1_000) or optional
              //   feeBps: '10', // Requires referral account or optional
            },
            computeUnitPrice: 'auto',
            // feeAccount: FEE_ACCOUNT, // Optional but if specified it is the referral token account of the output mint
            // wrapAndUnwrapSol: true, // Default true or optional
          }),
        },
      );
      //* Response dönecek
      if (!response.ok || response.status !== 200) {
        // throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      //* Success response example:
      // NOTE: Buradaki veriler veritabanına kayıt edilecek.
      // {
      //   "order": "CFG9Bmppz7eZbna96UizACJPYT3UgVgps3KkMNNo6P4k",
      //   "transaction": "AQAAAAAAAAAAAAAAAAAAAAAA......AgAKCAkBAQsPAAADBAEMCwcKCQkIBg0LIoVuSq9wn/WfdskdmHlfUulAQg8AAAAAAICpAwAAAAAAAAAJAwEAAAEJAA==",
      //   "requestId": "370100dd-1a85-421b-9278-27f0961ae5f4"
      // }
      //! Error response example:
      // {
      //   "error": "invalid create order request",
      //   "cause": "input mint making amount must be at least 5 USD, received: 2",
      //   "code": 400
      // }

      //* Error response dönecek
      if (result.error) {
      }

      const transaction = VersionedTransaction.deserialize(
        Buffer.from(result.transaction, 'base64'),
      );

      transaction.sign([walletData.keypair]);

      const signedTransaction = Buffer.from(transaction.serialize()).toString(
        'base64',
      );

      const executeResponse = await fetch(
        `${this.jupiterUrl}${this.executeOrderUrl}`,
        {
          ...this.requestInit,
          body: JSON.stringify({
            signedTransaction: signedTransaction,
            requestId: result.requestId,
          }),
        },
      );
      //! Error dönecek
      if (!executeResponse.ok || executeResponse.status !== 200) {
        // throw new Error(`HTTP error! status: ${executeResponse.status}`);
      }
      const executeResult = await executeResponse.json();
    } catch (error) {}
  }

  static async getTriggerOrders(status: TriggerStatusType = 'active') {
    try {
      const walletData = await WalletManager.getWalletSecret();

      if (!walletData.publicKey) {
        return;
      }
      const response = await fetch(
        `${Jupiter.jupiterUrl}${Jupiter.getTriggerOrdersUrl}?user=${walletData.publicKey}&orderStatus=${status}`,
      );
    } catch (error) {}
  }

  static async cancelOrder() {
    try {
      const walletData = await WalletManager.getWalletSecret();

      if (!walletData || !walletData.keypair || !walletData.publicKey) {
        return;
      }

      const response = await fetch(
        `${Jupiter.jupiterUrl}${Jupiter.cancelOrderUrl}`,
        {
          ...Jupiter.requestInit,
          body: JSON.stringify({
            maker: 'FL8pjVuM4NKExhE4o2NKYQ6SEfjGBtogWpNfiFu4D1ph',
            computeUnitPrice: 'auto',
            order: 'GHUUynvPauAACRMdZrk5s8tFR3zdiHDaUu9AfhVYJ4MJ',
          }),
        },
      );
      const result = await response.json();

      const transaction = VersionedTransaction.deserialize(
        Buffer.from(result.transaction, 'base64'),
      );

      transaction.sign([walletData.keypair]);

      const signedTransaction = Buffer.from(transaction.serialize()).toString(
        'base64',
      );

      const executeResponse = await fetch(
        `${this.jupiterUrl}${this.executeOrderUrl}`,
        {
          ...this.requestInit,
          body: JSON.stringify({
            signedTransaction: signedTransaction,
            requestId: result.requestId,
          }),
        },
      );
      const executeResult = await executeResponse.json();
      console.log('Execute cancel order response:', executeResult);
    } catch (error) {
      console.log('Error canceling order:', error);
    }
  }
}

export default Jupiter;
