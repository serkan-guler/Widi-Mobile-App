import {memo, useCallback, useState} from 'react';
import styles from './styles';
import {
  AppStackScreenProps,
  SlippageType,
  SpeedFeeType,
} from '../../../../types';
import {useTranslation} from 'react-i18next';
import {useSize, useTransactionSettings} from '../../../../hooks';
import {
  BaseButton,
  Header,
  inputProps,
  KeyboardAvoid,
  PageHeaderCard,
} from '../../../../components';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {showAlert} from '../../../../utils/alert';
import {useFocusEffect} from '@react-navigation/native';

type SlippageOptionType = {
  key: SlippageType;
  value: string;
};
type SpeedOptionType = {
  key: SpeedFeeType;
  value: string;
};

const pageHeaderProps = {
  fontSize: 20,
  lineHeight: 25,
  letterSpacing: -0.4,
};

const TransactionSettingScreen = ({
  navigation,
}: AppStackScreenProps<'TransactionSetting'>) => {
  const {t} = useTranslation(['navigation', 'common', 'content']);
  const {
    height,
    safeArea: {top},
  } = useSize();
  const {handleSet, getTransactionSettingsValues} = useTransactionSettings();

  const [selectedSlippage, setSelectedSlippage] =
    useState<SlippageType>('auto');
  const [maxSlippageValue, setMaxSlippageValue] = useState('20');
  const [selectedSpeedFee, setSelectedSpeedFee] =
    useState<SpeedFeeType>('auto');
  const [customSpeedFeeValue, setCustomSpeedFeeValue] = useState('0.01');

  const slippageOptions = [
    {key: 1, value: '1'},
    {key: 5, value: '5'},
    {key: 20, value: '20'},
    {key: 'auto', value: t('common:auto')},
    {key: 'custom', value: t('common:custom')},
  ] as SlippageOptionType[];
  const speedOptions = [
    // NOTE: Auto yerine medium olacak
    // NOTE: Sırası Econ, medium, fast, custom olarak değiştirildi
    {key: 'auto', value: t('common:auto')},
    {key: 'fast', value: `${t('common:fast')}`},
    {key: 'econ', value: `${t('common:econ')}`},
    {key: 'custom', value: t('common:custom')},
  ] as SpeedOptionType[];

  const handleDone = useCallback(() => {
    let slippageValid = false;
    let speedFeeValid = false;

    if (selectedSlippage === 'custom') {
      const numericSlippageValue = parseInt(maxSlippageValue.replace(',', '.'));
      if (isNaN(numericSlippageValue) || numericSlippageValue <= 0) {
        showAlert('error', t('content:invalidSlippageValue'));
      } else {
        slippageValid = true;
      }
    } else {
      slippageValid = true;
    }

    if (selectedSpeedFee === 'custom') {
      const numericSpeedFeeValue = parseFloat(
        customSpeedFeeValue.replace(',', '.'),
      );
      if (isNaN(numericSpeedFeeValue) || numericSpeedFeeValue <= 0) {
        showAlert('error', t('content:invalidMaxSpeedFeeValue'));
      } else {
        speedFeeValid = true;
      }
    } else {
      speedFeeValid = true;
    }

    if (slippageValid && speedFeeValid) {
      handleSet({
        selectedSlippage,
        customSlippageValue: maxSlippageValue,
        selectedSpeedFee,
        customSpeedFeeValue,
      });
      navigation.goBack();
    }
  }, [
    selectedSlippage,
    maxSlippageValue,
    selectedSpeedFee,
    customSpeedFeeValue,
    handleSet,
    navigation,
    t,
  ]);

  const handleChangeSlippageValue = useCallback((value: string) => {
    if (value === '') {
      setMaxSlippageValue('');
      return;
    }
    const numericValue = parseInt(value);
    if (!isNaN(numericValue)) {
      setMaxSlippageValue(numericValue.toString());
    }
  }, []);

  const handleChangeCustomSpeedFeeValue = useCallback((value: string) => {
    if (value === '') {
      setCustomSpeedFeeValue('');
      return;
    }
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setCustomSpeedFeeValue(value);
    }
  }, []);

  const handleLayout = useCallback(() => {
    const {slippage, customSlippage, speedFee, maxSpeedFee} =
      getTransactionSettingsValues;
    setSelectedSlippage(slippage);
    setMaxSlippageValue(customSlippage);
    setSelectedSpeedFee(speedFee);
    setCustomSpeedFeeValue(maxSpeedFee);
  }, [getTransactionSettingsValues]);

  useFocusEffect(handleLayout);

  return (
    <KeyboardAvoid>
      <ScrollView
        style={[
          styles.scrollContainer,
          {
            marginTop: top,
          },
        ]}>
        <View style={[styles.container, {minHeight: height - top}]}>
          <View>
            <Header
              title={t('navigation:transactionSettings')}
              onPressBack={() => navigation.goBack()}
            />
            <View style={[styles.slippageContainer, styles.marginBottom]}>
              <PageHeaderCard
                title={t('content:slippage')}
                {...pageHeaderProps}
              />
              <View
                style={[
                  styles.buttonsContainer,
                  styles.slippageButtonsContainer,
                ]}>
                {slippageOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.button,
                      styles.percentageWidth,
                      option.key === selectedSlippage && styles.selectedButton,
                    ]}
                    onPress={() => setSelectedSlippage(option.key)}>
                    <Text
                      style={[
                        styles.buttonText,
                        styles.fontMedium,
                        option.key === selectedSlippage
                          ? styles.buttonTextSelected
                          : styles.buttonTextDefault,
                      ]}
                      ellipsizeMode="tail"
                      numberOfLines={1}>
                      {option.value}
                      {index <= 2 && <Text style={styles.fontNeue}>%</Text>}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.slippageDescription}>
                <Text style={[styles.grayText]}>
                  {t('content:slippageInfo')}
                </Text>
              </View>
            </View>
            {selectedSlippage === 'custom' && (
              <View style={styles.marginBottom}>
                <PageHeaderCard
                  title={t('content:maxSlippage')}
                  {...pageHeaderProps}
                />
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={maxSlippageValue.toString()}
                    onChangeText={handleChangeSlippageValue}
                    {...inputProps}
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor={COLORS.GRAY}
                    contextMenuHidden
                  />
                  <Text style={styles.trailingText}>%</Text>
                </View>
                <Text style={[styles.grayText]}>
                  {t('content:maxSlippageInfo')}
                </Text>
              </View>
            )}
            <View style={styles.speedContainer}>
              <PageHeaderCard
                title={t('content:customSpeedFee')}
                {...pageHeaderProps}
              />
              <View style={styles.buttonsContainer}>
                {speedOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.button,
                      styles.speedButtonWidth,
                      option.key === selectedSpeedFee && styles.selectedButton,
                    ]}
                    onPress={() => setSelectedSpeedFee(option.key)}>
                    <Text
                      style={[
                        styles.buttonText,
                        styles.fontMedium,
                        option.key === selectedSpeedFee
                          ? styles.buttonTextSelected
                          : styles.buttonTextDefault,
                      ]}
                      ellipsizeMode="tail"
                      numberOfLines={1}>
                      {option.value}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View>
                {selectedSpeedFee === 'custom' && (
                  <>
                    <PageHeaderCard
                      title={t('content:maxSpeedFee')}
                      {...pageHeaderProps}
                    />
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        value={customSpeedFeeValue.toString()}
                        onChangeText={handleChangeCustomSpeedFeeValue}
                        keyboardType="numeric"
                        placeholder="0.01"
                        placeholderTextColor={COLORS.GRAY}
                      />
                      <Text style={styles.trailingText}>SOL</Text>
                    </View>
                  </>
                )}
                <Text style={[styles.grayText]}>
                  {t('content:customSpeedFeeInfo')}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <BaseButton label={t('common:done')} onPress={handleDone} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoid>
  );
};

export default memo(TransactionSettingScreen);
