import * as Keychain from 'react-native-keychain';
import {TOKEN_SERVICE, WALLET_SERVICE} from '@env';

const accessible: Keychain.ACCESSIBLE =
  Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY;

export const setToken = async (token: string) => {
  try {
    await Keychain.setGenericPassword('widiToken', token, {
      service: TOKEN_SERVICE,
      accessible,
    });
    return true;
  } catch (error) {
    console.error('Error setting token:', error);
    return false;
  }
};

export const getToken = async () => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: TOKEN_SERVICE,
    });
    if (credentials) {
      return credentials.password;
    }
  } catch (error) {
    console.error('Error getting token:', error);
  }
  return null;
};

export const clearToken = async () => {
  try {
    await Keychain.resetGenericPassword({service: TOKEN_SERVICE});
    return true;
  } catch (error) {
    console.error('Error clearing token:', error);
    return false;
  }
};

// export const setSecret = async (secret: string) => {
//   try {
//     await Keychain.setGenericPassword('widiSecret', secret, {
//       service: WALLET_SERVICE,
//       accessible,
//     });
//     return true;
//   } catch (error) {
//     console.error('Error setting secret:', error);
//     return false;
//   }
// };

// export const getSecret = async () => {
//   try {
//     const credentials = await Keychain.getGenericPassword({
//       service: WALLET_SERVICE,
//     });
//     if (credentials) {
//       return credentials.password;
//     }
//   } catch (error) {
//     console.error('Error getting secret:', error);
//   }
//   return null;
// };
