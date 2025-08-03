import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {SessionContextType, UserType} from '../types';
import {getUserDataService, logoutService} from '../services';
import {getUniqueId} from 'react-native-device-info';
import {API_URL} from '@env';
import {showAlert} from '../utils/alert';
import {useTranslation} from 'react-i18next';
import {getToken} from '../lib/store';
import WalletManager from '../lib/WalletManager';

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined,
);

export const SessionProvider = ({children}: PropsWithChildren) => {
  const {t} = useTranslation(['common']);
  const [sessionIsLoading, setSessionIsLoading] =
    useState<SessionContextType['sessionIsLoading']>(true);
  const [isAuth, setIsAuth] = useState<SessionContextType['isAuth']>(false);
  const [user, setUser] = useState<SessionContextType['user']>(undefined);
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);

  const handleSetUser = useCallback((user: SessionContextType['user']) => {
    let userData = {...user};
    if (userData) {
      if (
        userData.backgroundPicture &&
        !userData.backgroundPicture.startsWith('http')
      ) {
        userData.backgroundPicture = `${API_URL}/${userData.backgroundPicture}`;
      }

      if (
        userData.profilePicture &&
        !userData.profilePicture.startsWith('http')
      ) {
        userData.profilePicture = `${API_URL}/${userData.profilePicture}`;
      }
    }

    setUser(userData as SessionContextType['user']);
    setIsAuth(!!user);
  }, []);

  const handleEditUser = useCallback((user: Partial<UserType>) => {
    setUser(prevUser => ({...prevUser, ...user}) as SessionContextType['user']);
  }, []);

  const logout = useCallback(async () => {
    const response = await logoutService();
    if (response.status === 'success') {
      showAlert('warning', t('common:removeSecretFromDevice'), [
        {
          text: t('common:save'),
          style: 'destructive',
          onPress: () => {
            handleSetUser(undefined);
          },
        },
        {
          text: t('common:delete'),
          style: 'destructive',
          onPress: async () => {
            await WalletManager.removeFromKeychain();
            handleSetUser(undefined);
          },
        },
      ]);
      // setUser(undefined);
      // setIsAuth(false);
    }
  }, [handleSetUser]);

  useEffect(() => {
    const getDeviceId = async () => {
      const id = await getUniqueId();
      setDeviceId(id);
    };
    getDeviceId();
  }, [getUniqueId]);

  useEffect(() => {
    const getUserData = async () => {
      const token = await getToken();
      if (!token) {
        handleSetUser(undefined);
      } else {
        const response = await getUserDataService();
        if (response.status === 'success') {
          handleSetUser(response.data.user);
        } else {
          handleSetUser(undefined);
        }
      }
      setSessionIsLoading(false);
    };
    if (!user && sessionIsLoading) {
      getUserData();
    } else {
      setSessionIsLoading(false);
    }
  }, [handleSetUser, user, sessionIsLoading, getToken]);

  const value: SessionContextType = {
    sessionIsLoading,
    isAuth,
    user,
    setUser: handleSetUser,
    editUser: handleEditUser,
    logout,
    deviceId,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
