import {memo, useCallback, useState} from 'react';
import styles from './styles';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSession, useSize} from '../../../../hooks';
import {
  BaseButton,
  Header,
  Notification,
  PageHeaderCard,
  RecentCard,
} from '../../../../components';
import {useTranslation} from 'react-i18next';
import {AppStackScreenProps, RecentSentWalletType} from '../../../../types';
import {ScanIcon} from '../../../../assets/icons';
import {COLORS} from '../../../../constants/colors';
import {scaleSize} from '../../../../constants/dimensions';
import {
  fetchCopiedText,
  getRecentSentWallets,
  setRecentSentWallets,
} from '../../../../utils';
import {checkToWalletAddress} from '../../../../services';
import {showAlert} from '../../../../utils/alert';
import {SCREEN_NAMES} from '../../../../constants/navigation';
import {useFocusEffect} from '@react-navigation/native';

const CheckSendToScreen = ({
  route,
  navigation,
}: AppStackScreenProps<'CheckSendWallet'>) => {
  const {t} = useTranslation(['common', 'errors']);
  const {
    height,
    safeArea: {top},
  } = useSize();
  const {user} = useSession();

  const [textWidth, setTextWidth] = useState(4);
  const [nextTextHeight, setNextTextHeight] = useState(50);
  const [textInput, setTextInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentData, setRecentData] = useState<RecentSentWalletType[]>([]);

  const validateAddress = useCallback(() => {
    if (!textInput) {
      return t('errors:addressRequired');
    }
    if (textInput.length < 43 || textInput.length > 45) {
      return t('errors:wrongAddress');
    }

    if (textInput === user?.wallet) {
      return t('errors:addressSameToFrom');
    }
    return null;
  }, [textInput, t]);

  const handlePasteClipboard = async () => {
    const text = await fetchCopiedText();
    if (text) {
      setTextInput(text);
    }
  };

  const handleNavigation = useCallback(async () => {
    await setRecentSentWallets(textInput);
    navigation.navigate(SCREEN_NAMES.APP.SEND_TOKEN, {
      to: textInput,
      mint: route.params?.mint,
      decimal: route.params?.decimal,
      symbol: route.params?.symbol,
      count: route.params?.count,
      image: route.params?.image,
    });
  }, [navigation, textInput, route.params?.mint]);

  const handleNext = useCallback(async () => {
    setIsSubmitting(true);
    const validText = validateAddress();
    if (!validText) {
      const response = await checkToWalletAddress(textInput);
      if (response.status === 'success') {
        if (typeof response.data === 'string') {
          showAlert('warning', response.data, [
            {
              text: t('common:cancel'),
              style: 'cancel',
            },
            {
              text: t('common:next'),
              onPress: handleNavigation,
            },
          ]);
        } else {
          if (response.data) {
            handleNavigation();
          }
        }
      } else {
        setErrorMessage(response.message);
      }
    } else {
      setErrorMessage(validText);
      setSuccessMessage('');
    }
    setIsSubmitting(false);
  }, [validateAddress]);

  const handleFocus = useCallback(() => {
    getRecentSentWallets().then(data => {
      setRecentData(data);
    });
  }, [getRecentSentWallets]);

  useFocusEffect(handleFocus);

  return (
    <ScrollView
      style={[styles.scrollContainer, {minHeight: height, paddingTop: top}]}>
      <View
        style={[styles.container, {minHeight: height - nextTextHeight - top}]}>
        <Header
          title={t('common:to')}
          onPressBack={() => navigation.goBack()}
          trailing={
            <TouchableOpacity style={styles.scanContainer}>
              <ScanIcon color={COLORS.WHITE} />
            </TouchableOpacity>
          }
        />
        <View style={styles.inputContainer}>
          <Text
            style={styles.inputToText}
            onLayout={e => {
              const {width} = e.nativeEvent.layout;
              setTextWidth(width);
            }}>
            {t('common:to')}
          </Text>
          <TextInput
            style={[styles.input, {paddingLeft: scaleSize(30) + textWidth}]}
            cursorColor={COLORS.WHITE}
            selectionColor={COLORS.WHITE}
            placeholderTextColor={COLORS.GRAY}
            placeholder={t('common:walletDomainAddress')}
            value={textInput}
            keyboardAppearance="dark"
            onChangeText={setTextInput}
            onSubmitEditing={handleNext}
            submitBehavior="blurAndSubmit"
            enterKeyHint="done"
          />
        </View>
        {(errorMessage || successMessage) && (
          <View style={styles.notificationContainer}>
            <Notification
              type={errorMessage ? 'error' : 'success'}
              message={
                errorMessage
                  ? errorMessage
                  : successMessage
                    ? successMessage
                    : ''
              }
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.pasteButton}
          onPress={handlePasteClipboard}>
          <Text style={styles.pasteButtonText}>
            {t('common:pasteFromClipboard')}
          </Text>
        </TouchableOpacity>
        {recentData.length > 0 && (
          <>
            <PageHeaderCard title={t('common:recents')} />
            <View style={styles.recentContainer}>
              {recentData.map((item, index) => (
                <RecentCard
                  key={index}
                  mint={item.address}
                  time={item.date}
                  onPress={() => {
                    setTextInput(item.address);
                    navigation.navigate(SCREEN_NAMES.APP.SEND_TOKEN, {
                      to: item.address,
                      mint: route.params?.mint,
                      decimal: route.params?.decimal,
                      symbol: route.params?.symbol,
                      count: route.params?.count,
                      image: route.params?.image,
                    });
                  }}
                />
              ))}
            </View>
          </>
        )}
      </View>
      <View
        style={styles.nextContainer}
        onLayout={e => {
          const {height} = e.nativeEvent.layout;
          setNextTextHeight(height);
        }}>
        <BaseButton
          label={t('common:next')}
          size="medium"
          onPress={handleNext}
          disabled={!textInput || isSubmitting}
        />
      </View>
    </ScrollView>
  );
};

export default memo(CheckSendToScreen);
