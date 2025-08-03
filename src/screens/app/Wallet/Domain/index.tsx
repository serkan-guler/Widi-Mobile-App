import {memo, useCallback, useRef, useState} from 'react';
import styles from './styles';
import {
  BaseButton,
  BrandCard,
  Header,
  Layout,
  Notification,
} from '../../../../components';
import {useTranslation} from 'react-i18next';
import {AppStackScreenProps} from '../../../../types';
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputSelectionChangeEventData,
  View,
} from 'react-native';
import {Logo} from '../../../../assets/logos';
import {scaleSize} from '../../../../constants/dimensions';
import {COLORS} from '../../../../constants/colors';
import {SNSIcon} from '../../../../assets/icons';
import {searchDomain} from '../../../../services/wallet';
import {showAlert} from '../../../../utils/alert';
import {useSession, useWallet} from '../../../../hooks';

const DomainScreen = ({navigation}: AppStackScreenProps<'Domain'>) => {
  const {t} = useTranslation(['common', 'content']);
  const {user} = useSession();
  const {handleDomainModalData} = useWallet();

  const suffix = '.widi.sol';

  const [domain, setDomain] = useState<string>(suffix);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [purchasedError, setPurchasedError] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const textInputRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(async () => {
    setPurchasedError(false);
    setIsSubmitting(true);
    const finalDomain = ensureSuffix(domain);
    const response = await searchDomain(finalDomain);

    if (response.status === 'success') {
      // navigation.reset({
      //   index: 0,
      //   routes: [
      //     {
      //       name: 'Tab',
      //       params: {
      //         screen: 'Wallet',
      //         params: {
      //           tx: response.data,
      //           domain: finalDomain,
      //         },
      //       },
      //     },
      //   ],
      // });
      handleDomainModalData({
        tx: response.data,
        domain: finalDomain,
      });
      navigation.popToTop();
    } else {
      if (response.message === 'domain_purchased') {
        setPurchasedError(true);
      } else {
        showAlert(response.status, response.message);
      }
    }
    setIsSubmitting(false);
  }, [domain]);

  const ensureSuffix = (inputText: string) => {
    // Önce mevcut .widi.sol'leri temizle (regex ile)
    const cleanText = inputText.replace(/\.widi\.sol/g, '');

    // Eğer temizlenmiş text boş değilse, sonuna .widi.sol ekle
    if (cleanText.length > 0) {
      return cleanText + suffix;
    }

    // Eğer text boşsa, boş döndür
    return cleanText;
  };

  const handleTextChange = (inputText: string) => {
    const processedText = ensureSuffix(inputText);
    setDomain(processedText);

    // Cursor pozisyonunu ayarla (.widi.sol'ün önünde)
    const newCursorPos = processedText.length - suffix.length;
    setCursorPosition(Math.max(0, newCursorPos));
  };

  const handleSelectionChange = (
    event: NativeSyntheticEvent<TextInputSelectionChangeEventData>,
  ) => {
    const {start, end} = event.nativeEvent.selection;
    const maxPosition = domain.length - suffix.length;

    // Cursor'un .widi.sol kısmının içine girmesini engelle
    if (start > maxPosition || end > maxPosition) {
      setTimeout(() => {
        textInputRef.current?.setNativeProps({
          selection: {start: maxPosition, end: maxPosition},
        });
      }, 0);
    }
  };

  const handleFocus = () => {
    setTimeout(() => {
      const position = Math.max(0, domain.length - suffix.length);
      textInputRef.current?.setNativeProps({
        selection: {start: position, end: position},
      });
    }, 100);
  };

  return (
    <Layout>
      <Header
        title={t('common:yourWalletAddress')}
        onPressBack={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <BrandCard
            content={
              <View style={styles.brandCard}>
                <Logo
                  width={scaleSize(20)}
                  height={scaleSize(17)}
                  color={COLORS.DANGER}
                />
                <Text
                  style={styles.walletAddress}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {user?.wallet || t('common:unknown')}
                </Text>
              </View>
            }
          />
          <View style={styles.inputContainer}>
            <TextInput
              ref={textInputRef}
              value={domain}
              style={styles.inputStyle}
              selectionColor={COLORS.PRIMARY}
              selection={{start: cursorPosition, end: cursorPosition}}
              placeholderTextColor={COLORS.SECONDARY}
              onChangeText={handleTextChange}
              onSelectionChange={handleSelectionChange}
              onFocus={handleFocus}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder={t('content:widiDomain')}
            />
          </View>
          {purchasedError && (
            <View style={styles.notificationContainer}>
              <Notification
                message={t('content:domainPurchaseError')}
                type="warning"
              />
            </View>
          )}
          <Text style={styles.snsText}>{t('content:buyWidiDomain')}</Text>
          <View style={styles.snsContainer}>
            <Text style={styles.snsText}>
              {t('common:poweredBy', {name: 'SNS'})}
            </Text>
            <SNSIcon color="#b4fc75" />
          </View>
        </View>
        <BaseButton
          wFull
          label={t('content:getWidiDomain')}
          onPress={handleSubmit}
          disabled={!domain || domain === suffix}
          isLoading={isSubmitting}
        />
      </View>
    </Layout>
  );
};

export default memo(DomainScreen);
