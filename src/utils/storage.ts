import AsyncStorage from '@react-native-async-storage/async-storage';
import {RecentSentWalletType, TokenResponse} from '../types';

const RECENT_SENT_WALLETS_KEY = 'recentSentWallets';
const SEARCH_TOKEN_KEY = 'searchToken';

export const getRecentSentWallets = async (): Promise<
  RecentSentWalletType[]
> => {
  try {
    const recentWallets = await AsyncStorage.getItem(RECENT_SENT_WALLETS_KEY);
    if (recentWallets) {
      return JSON.parse(recentWallets);
    }
    return [];
  } catch (error) {
    console.error('Error fetching recent sent wallets:', error);
    return [];
  }
};

export const setRecentSentWallets = async (
  address: string,
): Promise<boolean> => {
  try {
    let recentWallets = await getRecentSentWallets();
    const newWallet: RecentSentWalletType = {
      date: new Date().toISOString(), // Store date as ISO string for consistency
      address, // Example address, replace with actual
    };

    recentWallets = recentWallets.filter(wallet => wallet.address !== address);

    // Add the new wallet to the beginning of the array
    recentWallets.unshift(newWallet);

    // Limit to the last 5 wallets
    if (recentWallets.length > 5) {
      recentWallets.length = 5;
    }

    await AsyncStorage.setItem(
      RECENT_SENT_WALLETS_KEY,
      JSON.stringify(recentWallets),
    );
    return true;
  } catch (error) {
    console.error('Error setting recent sent wallets:', error);
    return false;
  }
};

export const getSearchToken = async (): Promise<TokenResponse[]> => {
  try {
    const searchToken = await AsyncStorage.getItem(SEARCH_TOKEN_KEY);
    if (searchToken) {
      return JSON.parse(searchToken);
    }
    return [];
  } catch (error) {
    console.error('Error fetching search token:', error);
    return [];
  }
};

export const setSearchToken = async (
  token: TokenResponse,
): Promise<boolean> => {
  try {
    const recentTokens = await getSearchToken();
    const combinedTokens = recentTokens.filter(
      t => t.mint !== token.mint && t.poolId !== token.poolId,
    );
    combinedTokens.unshift(token);

    // Limit to the last 5 tokens
    if (combinedTokens.length > 5) {
      combinedTokens.length = 5;
    }

    await AsyncStorage.setItem(
      SEARCH_TOKEN_KEY,
      JSON.stringify(combinedTokens),
    );
    return true;
  } catch (error) {
    console.error('Error setting search token:', error);
    return false;
  }
};
