import {memo, useCallback, useState} from 'react';
import styles from './styles';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BaseButton,
  CheckBox,
  Header,
  inputProps,
  KeyboardAvoid,
  LayoutStatusBar,
} from '../../../components';
import {AuthStackScreenProps} from '../../../types';
import {useTranslation} from 'react-i18next';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import WalletManager from '../../../lib/WalletManager';
import {showAlert, showErrorAlert} from '../../../utils/alert';
import {
  getTokenService,
  registerService,
  userWalletDataService,
} from '../../../services';
import {useSession, useSize} from '../../../hooks';
import {
  copyToClipboard,
  ellipsizeString,
  fetchCopiedText,
} from '../../../utils';
import {BlurView} from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';

// FIXME: Kullanıcı checkbox'ı işaretlemeden devam edemeyecek.
const WidiCodeScreen = ({
  route,
  navigation,
}: AuthStackScreenProps<'WidiCode'>) => {
  const {t} = useTranslation(['common', 'errors', 'navigation']);
  const {setUser} = useSession();
  const {
    height,
    safeArea: {top},
  } = useSize();

  const [disabledCopy, setDisabledCopy] = useState<boolean>(true);
  const [publicWallet, setPublicWallet] = useState<string>();
  const [secretWallet, setSecretWallet] = useState<string>();
  const [recoveryCode, setRecoveryCode] = useState<string>();
  const [userRecoveryCode, setUserRecoveryCode] = useState<string>('');

  const handleCopy = useCallback(() => {
    if (recoveryCode) {
      copyToClipboard(recoveryCode);
    } else {
      showAlert('error', t('common:noDataAvailable'));
    }
  }, [recoveryCode, showAlert, t]);

  const handlePaste = useCallback(async () => {
    const text = await fetchCopiedText();
    if (text) {
      setUserRecoveryCode(text);
    } else {
      showAlert('error', t('errors:clipboardError'));
    }
  }, [fetchCopiedText, showAlert, t]);

  const handleRegister = useCallback(async () => {
    if (recoveryCode !== userRecoveryCode) {
      showAlert('error', 'Kodlar aynı değil');
    } else {
      console.log('Handle register data: ', {
        token: route.params.token,
        secret: route.params.secret,
        bio: route.params.bio,
        walletSecret: secretWallet,
        publicKey: publicWallet,
      });
      const response = await registerService({
        token: route.params.token,
        secret: route.params.secret,
        bio: route.params.bio,
        walletSecret: secretWallet,
        publicKey: publicWallet,
      });

      console.log('Register response:', response);

      if (response) {
        if (response.status === 'success') {
          // setIsLoading(true);
          setUser(response.data);
        } else {
          // setIsLoading(false);
          showAlert(t('errors:error'), response.message);
        }
      } else {
        showAlert(t('errors:error'), t('errors:unknownError'));
      }
    }
  }, [
    recoveryCode,
    userRecoveryCode,
    route.params,
    secretWallet,
    publicWallet,
    setUser,
    showAlert,
    t,
  ]);

  const handleLogin = useCallback(async () => {
    if (userRecoveryCode && secretWallet && publicWallet) {
      const recover = await WalletManager.restoreWalletWithBackendData(
        userRecoveryCode,
        secretWallet,
      );

      if (recover.success && recover.isComplete) {
        const response = await getTokenService({
          username: route.params.username,
          token: route.params.token,
          secret: route.params.secret,
        });

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
        showAlert('error', recover.error || t('errors:unknownError'));
      }
    }
  }, [userRecoveryCode, secretWallet, publicWallet, WalletManager]);

  const handleContinue = useCallback(() => {
    if (route.params.isRegistered) {
      handleLogin();
    } else {
      handleRegister();
    }
  }, [route.params, handleRegister, handleLogin]);

  const handleWallet = useCallback(async () => {
    try {
      const wallet = await WalletManager.generateWallet();
      console.log('Generated wallet:', wallet);
      setPublicWallet(wallet.publicKey);
      setSecretWallet(wallet.backendData.encryptedPrivateKey);
      setRecoveryCode(wallet.recoveryCode);
    } catch (error) {
      showAlert(
        'error',
        `${t('errors:unknownError')}\n${t('common:tryAgain')}`,
        [
          {
            text: t('common:cancel'),
            style: 'cancel',
          },
          {
            text: t('common:restart'),
            onPress: () => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'Onboarding'}], // veya başlangıç sayfanız
                }),
              );
            },
          },
        ],
      );
    }
  }, [t, showAlert, WalletManager]);

  const handleGetUserData = useCallback(async () => {
    const response = await userWalletDataService(route.params.username);

    if (response.status === 'success') {
      setPublicWallet(response.data.wallet);
      setSecretWallet(response.data.secret);
    } else {
      showErrorAlert(response);
    }
  }, [route.params.username]);

  const handleFocusEffect = useCallback(() => {
    navigation.setOptions({
      gestureEnabled: false,
      headerLeft: () => null,
    });
    if (route.params.isRegistered) {
      setDisabledCopy(true);
      handleGetUserData();
    } else {
      handleWallet();
      setDisabledCopy(false);
    }
  }, [navigation, route.params.isRegistered, handleWallet, handleGetUserData]);

  useFocusEffect(handleFocusEffect);

  return (
    <>
      <LayoutStatusBar />
      <KeyboardAvoid>
        <ScrollView style={[styles.scrollContainer, {marginTop: top}]}>
          <View
            style={[
              styles.container,
              styles.scrollContainer,
              {minHeight: height - top},
            ]}>
            <View style={styles.contentContainer}>
              <Header title={t('navigation:widiAccessCode')} />
              <Text style={styles.titleText}>
                {t('navigation:myWidiAccessCode')}
              </Text>
              <View style={styles.inputContainer}>
                {recoveryCode && (
                  <View style={styles.inputWrapper}>
                    <Text style={[styles.input, styles.inputSecondary]}>
                      {ellipsizeString(recoveryCode, 10, 10, 3)}
                    </Text>
                    <TouchableOpacity
                      style={styles.copyButton}
                      onPress={handleCopy}>
                      <Text
                        style={[styles.buttonText, styles.buttonActiveText]}>
                        {t('common:copy')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[styles.input, styles.inputPrimary]}
                    value={userRecoveryCode}
                    onChangeText={setUserRecoveryCode}
                    {...inputProps}
                  />
                  <TouchableOpacity
                    style={styles.copyButton}
                    onPress={handlePaste}>
                    <Text style={[styles.buttonText, styles.buttonActiveText]}>
                      {t('common:paste')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={[styles.buttonContainer]}>
              <LinearGradient
                colors={['#FFFFFF', '#000000', '#FFFFFF']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                locations={[0.01, 0.5, 1]}
                style={styles.absolute}
              />
              <BlurView
                style={styles.absolute}
                blurType="dark"
                blurAmount={30}
                reducedTransparencyFallbackColor="#000000"
                overlayColor="#000000"
              />
              <CheckBox
                isSelected={false}
                onPress={() => {
                  /* if (!portfolioType) {
                    setShowSelectError(true);
                  } else {
                    onChange(!value);
                  } */
                }}>
                <Text style={[styles.checkBoxText, styles.checkBoxTextSolid]}>
                  {t('content:portfolioReadAndAgree')}
                </Text>
                <Text
                  style={[styles.checkBoxText, styles.checkBoxTextWhite]}
                  onPress={() => {
                    navigation.navigate('TermsModal');
                  }}>
                  {t('content:userServiceAgreement')}
                </Text>
              </CheckBox>
              <TouchableOpacity
                disabled={userRecoveryCode.length > 10 ? false : true}
                style={[
                  styles.button,
                  userRecoveryCode.length > 10
                    ? styles.buttonActive
                    : styles.buttonDisabled,
                ]}
                onPress={handleContinue}>
                <Text
                  style={[
                    styles.buttonText,
                    userRecoveryCode.length > 10
                      ? styles.buttonActiveText
                      : styles.buttonDisabledText,
                  ]}>
                  {t('common:continue')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoid>
    </>
  );

  // return (
  //   <ScrollLayout>
  //     <Header title={t('navigation:widiAccessCode')} />
  //     <View style={styles.container}>
  //       <View style={styles.inputContainer}>
  //         <Text
  //           style={styles.recoveryCode}
  //           ellipsizeMode="tail"
  //           numberOfLines={1}>
  //           {recoveryCode}
  //         </Text>
  //         <TouchableOpacity
  //           style={styles.copyButton}
  //           disabled={disabledCopy}
  //           onPress={handleCopy}>
  //           <Text style={styles.copyText}>{t('common:copy')}</Text>
  //         </TouchableOpacity>
  //       </View>
  //       <View style={styles.inputContainer}>
  //         <TextInput
  //           value={userRecoveryCode}
  //           onChangeText={setUserRecoveryCode}
  //           style={styles.recoveryCode}
  //           {...inputProps}
  //         />
  //         <TouchableOpacity style={styles.copyButton} onPress={handlePaste}>
  //           <Text style={styles.copyText}>{t('common:paste')}</Text>
  //         </TouchableOpacity>
  //       </View>
  //       <BaseButton label={t('common:continue')} onPress={handleContinue} />
  //     </View>
  //   </ScrollLayout>
  // );
};

export default memo(WidiCodeScreen);
