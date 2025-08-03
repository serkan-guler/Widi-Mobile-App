import {memo, useCallback, useState} from 'react';
import styles from '../styles';
import {AuthStackScreenProps} from '../../../types';
import {useTranslation} from 'react-i18next';
import {BaseButton, Header, Layout} from '../../../components';
import {Linking, Platform, Text, View} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {SPACING} from '../../../constants/dimensions';
import {XOutlineIcon} from '../../../assets/icons';
import {showAlert, showErrorAlert} from '../../../utils/alert';
import {SCREEN_NAMES} from '../../../constants/navigation';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {getTokenService, userWalletDataService} from '../../../services';
import {useFocusEffect} from '@react-navigation/native';
import {useAppNavigation, useSession} from '../../../hooks';
import {API_URL} from '@env';
import WalletManager from '../../../lib/WalletManager';

const ConnectAccount = ({
  route,
  navigation,
}: AuthStackScreenProps<'ConnectAccount'>) => {
  const {t} = useTranslation(['navigation', 'content', 'errors']);
  const {setUser} = useSession();
  const appNavigation = useAppNavigation();

  const props: SvgProps = {
    width: SPACING.XL,
    height: SPACING.XL,
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(false);
    }, []),
  );

  const handleTwitterLogin = async () => {
    const redirectUrl = Platform.select({
      ios: 'widi://twitter/callback',
      android: 'widi://twitter',
      default: 'widi://twitter/callback',
    });

    // const authUrl = Platform.select({
    //   ios: 'http://localhost:4000/auth/twitter',
    //   android: 'http://10.0.2.2:4000/auth/twitter',
    //   default: 'http://localhost:4000/auth/twitter',
    // });

    // const authUrl = `${API_URL}/auth/twitter`;
    const authUrl = `https://widit.fun/api/app-auth`;
    // const redirectUrl = `${API_URL}/auth/twitter/callback`;

    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.openAuth(authUrl, redirectUrl, {
          // iOS Özellikleri
          ephemeralWebSession: false, // Çerezlerin paylaşılmasını sağlar
          dismissButtonStyle: 'cancel',
          // Android Özellikleri
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,

          forceCloseOnRedirection: Platform.OS === 'ios', // Redirect'te otomatik kapanma
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'User-Agent': 'Widi-App/1.0',
          },
          hasBackButton: true,
          browserPackage: '', // Varsayılan browser kullan
          showInRecents: false,
        });

        if (result.type === 'success' && result.url) {
          setIsLoading(true);
          const params = result.url
            .split('?')[1]
            .split('&')
            .reduce((acc: Record<string, string>, param: string) => {
              const [key, value] = param.split('=');
              acc[key] = decodeURIComponent(value);
              return acc;
            }, {});

          const isRegistered = params.registered === 'true';

          const navigationParams = {
            secret: params.secret,
            token: params.token,
            username: params.username,
          };

          if (isRegistered) {
            setSuccess(true);

            const recoveryCode = await WalletManager.getFromKeychain(
              WalletManager.STORAGE_KEYS.RECOVERY_CODE,
            );
            const publicKey = await WalletManager.getFromKeychain(
              WalletManager.STORAGE_KEYS.PUBLIC_KEY,
            );

            if (!recoveryCode || !publicKey) {
              navigation.navigate(SCREEN_NAMES.AUTH.WIDI_CODE, {
                ...navigationParams,
                isRegistered: true,
              });
            } else {
              const walletResponse = await userWalletDataService(
                params.username,
              );

              if (walletResponse.status === 'success') {
                const recover =
                  await WalletManager.restoreWalletWithBackendData(
                    recoveryCode,
                    walletResponse.data.secret,
                  );

                if (recover.success && recover.isComplete) {
                  const response = await getTokenService(navigationParams);

                  if (response) {
                    if (response.status === 'success') {
                      setUser(response.data);
                    } else {
                      showAlert(t('errors:error'), response.message);
                    }
                  } else {
                    showAlert(t('errors:error'), t('errors:unknownError'));
                  }
                } else {
                  // showAlert('error', recover.error || t('errors:unknownError'));
                  navigation.navigate(SCREEN_NAMES.AUTH.WIDI_CODE, {
                    ...navigationParams,
                    isRegistered: true,
                  });
                }
              } else {
                showErrorAlert(walletResponse);
              }
            }
          } else {
            navigation.navigate(
              SCREEN_NAMES.AUTH.GET_USERNAME,
              navigationParams,
            );
          }

          // Linking.openURL(result.url); // Deep link'i işlemek için
        }
      } else {
        Linking.openURL(authUrl); // InAppBrowser yoksa varsayılan tarayıcıyı kullan
      }
    } catch (error) {
      Linking.openURL(authUrl); // Hata durumunda varsayılan tarayıcıya yönlendir
    }
  };

  return (
    <Layout isLoading={isLoading}>
      <Header
        showLogo
        onPressBack={navigation.canGoBack() ? navigation.goBack : undefined}
      />
      <View style={styles.container}>
        <Text style={styles.titleOne}>{t('content:connectAccount')}</Text>
        <View style={styles.buttonContainer}>
          <BaseButton
            type="secondary"
            label={t('navigation:loginWithX')}
            leadingIcon={<XOutlineIcon {...props} />}
            onPress={handleTwitterLogin}
            disabled={isLoading || success}
          />
        </View>
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            {t('content:signIn')}
            <Text
              style={[styles.termsText, styles.linkText]}
              onPress={() => {
                navigation.navigate('TermsModal');
              }}>
              {t('content:terms')}
            </Text>
            {t('content:and')}
            <Text
              style={[styles.termsText, styles.linkText]}
              onPress={() => {
                navigation.navigate('PrivacyModal');
              }}>
              {t('content:privacy')}
            </Text>
          </Text>
        </View>
      </View>
    </Layout>
  );
};

export default memo(ConnectAccount);
