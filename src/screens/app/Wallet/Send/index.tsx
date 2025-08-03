import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import styles from './styles';
import {AppStackScreenProps} from '../../../../types';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  AvailableCard,
  BaseButton,
  Header,
  LayoutStatusBar,
  PercentageButtons,
  SendingToCard,
  TopNotification,
  Touchpad,
} from '../../../../components';
import {
  buildSendTransactionService,
  tokenPriceService,
} from '../../../../services';
import {useDebounce, useSize} from '../../../../hooks';
import {useTranslation} from 'react-i18next';
import {scaleSize, SPACING} from '../../../../constants/dimensions';
import {COLORS} from '../../../../constants/colors';
import {SwapIcon} from '../../../../assets/icons';
import {MIN_SOL_AMOUNT} from '../../../../constants/transaction';
import {SCREEN_NAMES} from '../../../../constants/navigation';
import {formatDecimalNumberToLength} from '../../../../utils';

const SendScreen = ({route, navigation}: AppStackScreenProps<'Send'>) => {
  const {t} = useTranslation(['common', 'errors']);
  const {
    height,
    safeArea: {top, bottom},
  } = useSize();

  const [amount, setAmount] = useState('0');
  const [amountUsd, setAmountUsd] = useState('0');
  const [selectedAmountType, setSelectedAmountType] = useState(
    route.params.symbol,
  );
  const [mintCurrentPrice, setMintCurrentPrice] = useState(0);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showNotification, setShowNotification] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [timeoutIds, setTimeoutIds] = useState<NodeJS.Timeout[]>([]);

  const debouncedAmount = useDebounce(amount, 200);

  const onChangeAmount = useCallback(
    (text: string) => {
      // setAmount(text.replace(',', '.'));
      if (selectedAmountType === route.params.symbol) {
        setAmount(text);
        setAmountUsd((parseFloat(text) * mintCurrentPrice).toFixed(2));
      } else {
        setAmountUsd(text);
        setAmount((parseFloat(text) / mintCurrentPrice).toFixed(3));
      }
    },
    [selectedAmountType, route.params.symbol, mintCurrentPrice],
  );

  const amountValue = useMemo(
    () => (selectedAmountType === route.params.symbol ? amount : amountUsd),
    [selectedAmountType, amount, amountUsd],
  );

  const isDisabled = useMemo(() => {
    const numberAmount = parseFloat(amount || '0');

    if (!isNaN(numberAmount) && numberAmount <= 0) {
      return true;
    }

    let mintCount = parseFloat(route.params.count.toString() || '0');

    if (route.params.symbol === 'SOL') {
      mintCount -= MIN_SOL_AMOUNT;
    }

    if (numberAmount <= mintCount) {
      return false;
    }
    return true;
  }, [amount, route.params.count, route.params.symbol]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const numericAmount = parseFloat(amount);
    const response = await buildTransaction();
    if (response) {
      if (response.status === 'success') {
        navigation.navigate(SCREEN_NAMES.APP.SEND_TOKEN_SUMMARY, {
          to: route.params.to,
          mint: route.params.mint,
          decimal: route.params.decimal,
          count: numericAmount,
          symbol: route.params.symbol,
          amount: numericAmount,
          feeEstimate: response.data.feeEstimate,
          image: route.params.image,
        });
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  const addTimeout = useCallback((timeoutId: NodeJS.Timeout) => {
    setTimeoutIds(prev => [...prev, timeoutId]);
  }, []);

  const removeTimeout = useCallback((timeoutId: NodeJS.Timeout) => {
    setTimeoutIds(prev => prev.filter(id => id !== timeoutId));
    clearTimeout(timeoutId);
  }, []);

  const buildTransaction = useCallback(async () => {
    setButtonIsDisabled(true);
    const numericAmount = parseFloat(debouncedAmount || '0');
    if (!isNaN(numericAmount) && numericAmount > 0) {
      const transactionData = await buildSendTransactionService(
        route.params.mint,
        numericAmount,
        route.params.to,
        route.params.decimal,
      );
      if (transactionData.status === 'error') {
        setErrorText(transactionData.message);
        setShowNotification(true);

        const timeoutId = setTimeout(() => {
          setErrorText('');
          setShowNotification(false);
          removeTimeout(timeoutId);
        }, 3000);

        addTimeout(timeoutId);
      } else {
        setErrorText('');
        setShowNotification(false);
      }
      setButtonIsDisabled(false);
      return transactionData;
    }
    setButtonIsDisabled(false);
    return undefined;
  }, [debouncedAmount, route.params, addTimeout, removeTimeout]);

  const handlePercentage = useCallback(
    (percentage: number) => {
      if (route.params.symbol !== 'SOL') {
        const balance = route.params.count || 0;
        const balanceUsd = balance * mintCurrentPrice;
        setAmount(((balance * percentage) / 100).toString());
        setAmountUsd(((balanceUsd * percentage) / 100).toString());
      } else {
        const balance = route.params.count - MIN_SOL_AMOUNT || 0;
        const balanceUsd = balance * mintCurrentPrice;
        setAmount(((balance * percentage) / 100).toString());
        setAmountUsd(((balanceUsd * percentage) / 100).toString());
      }
    },
    [route.params.symbol, mintCurrentPrice, route.params.count],
  );

  useEffect(() => {
    const getPrice = async () => {
      const response = await tokenPriceService(route.params.mint);
      if (response.status === 'success') {
        setMintCurrentPrice(response.data.price);
      }
    };
    getPrice();
  }, [route.params.mint]);

  useEffect(() => {
    buildTransaction();
  }, [buildTransaction]);

  useEffect(() => {
    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, [timeoutIds]);

  return (
    <>
      <TopNotification
        type={'error'}
        label={t('errors:solana.failedToSend')}
        isLoading={false}
        isVisible={showNotification}
        description={errorText}
      />
      <LayoutStatusBar />
      <ScrollView
        style={[styles.container, {marginTop: top}]}
        contentContainerStyle={{minHeight: height - top}}>
        <View style={styles.topContainer}>
          <Header
            title={t('common:send')}
            onPressBack={() => navigation.goBack()}
          />
          <View style={[styles.contentContainer]}>
            <SendingToCard to={route.params.to} />
            <View style={styles.amountContainer}>
              <View style={styles.topAmountContainer}>
                <Text style={[styles.topAmountText, styles.topAmountWhite]}>
                  {/* {Number(amountValue || 0).toFixed(3)} */}
                  {formatDecimalNumberToLength(amountValue, 3)}
                </Text>
                <Text style={[styles.topAmountText, styles.topAmountSymbol]}>
                  {selectedAmountType}
                </Text>
              </View>
              <View style={styles.bottomAmountContainer}>
                <View style={styles.bottomAmountContainer}>
                  <View style={styles.bottomAmountTextContainer}>
                    <Text
                      style={[styles.bottomAmountText, styles.topAmountWhite]}>
                      {selectedAmountType === 'USD'
                        ? Number(amount || '0').toFixed(3)
                        : Number(amountUsd || '0').toFixed(2)}
                    </Text>
                    <Text
                      style={[styles.bottomAmountText, styles.topAmountWhite]}>
                      {selectedAmountType === 'USD'
                        ? route.params.symbol
                        : 'USD'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedAmountType(
                      selectedAmountType === 'USD'
                        ? route.params.symbol
                        : 'USD',
                    );
                  }}>
                  <SwapIcon
                    color={COLORS.PRIMARY}
                    width={scaleSize(23.91)}
                    height={scaleSize(21.28)}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <AvailableCard
              amount={route.params.count}
              type={route.params.symbol}
              decimal={route.params.decimal}
            />
          </View>
        </View>
        <View
          style={[
            styles.bottomContainer,
            {
              paddingBottom:
                bottom > 0 ? bottom + scaleSize(10) : SPACING.PAGE_BOTTOM,
            },
          ]}>
          <View style={styles.touchpadContainer}>
            <PercentageButtons onPress={handlePercentage} />
            <Touchpad
              amount={amountValue}
              onPress={onChangeAmount}
              decimal={3}
            />
          </View>
          <BaseButton
            label={t('common:next')}
            disabled={isDisabled || buttonIsDisabled || isSubmitting}
            onPress={handleSubmit}
            isLoading={buttonIsDisabled}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default memo(SendScreen);
