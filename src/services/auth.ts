import {API_URLS} from '../constants/api';
import {clearToken, setToken} from '../lib/store';
import WalletManager from '../lib/WalletManager';
import {
  AppResponseType,
  GetUserDataType,
  RegisterServiceResponseType,
  UserType,
  WalletDataType,
} from '../types';
import {unknownErrorMessage} from '../utils';
import {getService, postService} from './service';

const handleSetToken = async (
  data: AppResponseType<RegisterServiceResponseType>,
): Promise<AppResponseType<UserType>> => {
  if (data.status !== 'success') {
    return data;
  }

  try {
    const {token, user} = data.data;
    await setToken(token);

    return {
      ...data,
      data: user,
    };
  } catch (error) {
    console.error('Error setting token:', error);
    throw error;
  }
};

export const signInWithGoogleService = async <T>(data: unknown) => {
  return await postService<T>({
    url: API_URLS.signInWithGoogleUrl,
    data,
  });
};

export const signInWithMicrosoftService = async <T>(data: unknown) => {
  return await postService<T>({
    url: API_URLS.signInWithMicrosoftUrl,
    data,
  });
};

export const registerService = async (
  data: Object,
): Promise<AppResponseType<UserType> | undefined> => {
  try {
    let response = await postService<RegisterServiceResponseType>({
      url: API_URLS.registerUrl,
      data,
    });

    return await handleSetToken(response);
  } catch (error) {
    console.error('Error during registration:', error);
    return;
  }
};

export const getTokenService = async (
  data: Object,
): Promise<AppResponseType<UserType> | undefined> => {
  try {
    let response = await postService<RegisterServiceResponseType>({
      url: API_URLS.getTokenUrl,
      data,
    });

    return await handleSetToken(response);
  } catch (error) {
    console.error('Error getting token:', error);
    return;
  }
};

export const getUserDataService = async () => {
  const response = await getService<GetUserDataType>({
    url: API_URLS.getUserData,
  });

  if (response.status === 'success') {
    if (response.data.token) {
      const token = await setToken(response.data.token);

      if (!token) {
        return unknownErrorMessage<GetUserDataType>();
      }
      delete response.data.token;
    }
  }

  return response;
};

export const logoutService = async () => {
  const response = await getService({url: API_URLS.logoutUrl});
  if (response.status === 'success') {
    try {
      await clearToken();
    } catch (error) {
      console.error('Error removing token from AsyncStorage:', error);
      return response;
    } finally {
      return response;
    }
  }
  return response;
};

export const userWalletDataService = async (username: string) =>
  await postService<WalletDataType>({
    url: API_URLS.loginUrl,
    data: {
      username,
      widiData: 'Widi-login-Data',
    },
  });
