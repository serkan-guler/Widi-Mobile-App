import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import styles from './styles';
import {
  AmountType,
  AppResponseType,
  AppStackScreenProps,
  PriorityFeeType,
  StatusTypes,
  TradeType,
} from '../../../../types';
import {useTranslation} from 'react-i18next';
import {
  useDebounce,
  useFilter,
  useSession,
  useSize,
  useTransactionSettings,
  useWallet,
} from '../../../../hooks';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  BaseButton,
  Header,
  LayoutStatusBar,
  PercentageButtons,
  TopNotification,
  Touchpad,
} from '../../../../components';
import {SCREEN_NAMES} from '../../../../constants/navigation';
import {SettingsGearIcon, SwapIcon} from '../../../../assets/icons';
import {scaleSize, SPACING} from '../../../../constants/dimensions';
import {COLORS} from '../../../../constants/colors';
import SwapCard from './Card';
import InfoText from './InfoText';
import {
  getTradeBalance,
  tokenQuoteService,
  tokenSwapPoolService,
} from '../../../../services';
import {MIN_SOL_AMOUNT} from '../../../../constants/transaction';
import {doTransaction, getPrices, quoteTracker} from '../../../../utils';
import {DescriptionType} from '../../../../components/common/Notification/Top';
import WalletManager from '../../../../lib/WalletManager';
import {SOL_MINT} from '@env';

const RightComponent = ({tx}: {tx: string}) => {
  const {t} = useTranslation(['common']);
  return (
    <TouchableOpacity style={styles.shareButton}>
      <Text style={styles.shareText}>{t('common:share')}</Text>
    </TouchableOpacity>
  );
};

const TradeScreen = ({
  route,
  navigation,
}: AppStackScreenProps<'TokenTrade'>) => {
  const {t} = useTranslation(['navigation', 'common', 'content', 'errors']);
  const {
    height,
    safeArea: {top, bottom},
  } = useSize();
  const {settingsName, transactionOptions, resetTransactionSettings} =
    useTransactionSettings();
  const {handleRefresh} = useWallet();
  const {user} = useSession();

  const {
    type,
    image,
    mint,
    symbol,
    wallet,
    decimal,
    tokenCount,
    solPrice,
    price,
  } = useMemo(() => {
    return route.params;
  }, [route.params]);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [loadingIndex, setLoadingIndex] = useState<number>();

  const [tradeType, setTradeType] = useState<TradeType>(type);
  const [fromAmountType, setFromAmountType] = useState<AmountType>('sol');
  const [toAmountType, setToAmountType] = useState<AmountType>('sol');

  const [amount, setAmount] = useState<string>('0');
  const [amountUsd, setAmountUsd] = useState<string>('0');
  const [toAmount, setToAmount] = useState<string>('0');
  const [toAmountUsd, setToAmountUsd] = useState<string>('0');
  const [solBalance, setSolBalance] = useState<number>(0);
  const [currentSolPrice, setCurrentSolPrice] = useState<number>(solPrice);
  const [currentMintPrice, setCurrentMintPrice] = useState<number>(price);

  const [priceImpact, setPriceImpact] = useState<number>(0);
  const [networkFee, setNetworkFee] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [buttonError, setButtonError] = useState<string>();

  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationType, setNotificationType] =
    useState<StatusTypes>('warning');
  const [notificationLoading, setNotificationLoading] =
    useState<boolean>(false);
  const [notificationLabel, setNotificationLabel] = useState<string>(
    t('common:executing'),
  );
  const [notificationError, setNotificationError] = useState<string>();

  const [txn, setTxn] = useState<string>();
  const [backendTxn, setBackendTxn] = useState<string>();

  const debouncedAmount = useDebounce(amount, 600);
  const debouncedToAmount = useDebounce(toAmount, 600);

  const isSwapable = useMemo(() => {
    if (tokenCount !== undefined) {
      if (tokenCount > 0) {
        return false;
      }
    }

    return true;
  }, [tokenCount]);
  const handleSwapAmountType = useCallback((index: number) => {
    if (index === 0) {
      setFromAmountType(prev => (prev === 'sol' ? 'usd' : 'sol'));
    } else {
      setToAmountType(prev => (prev === 'sol' ? 'usd' : 'sol'));
    }
  }, []);
  const handleSwap = useCallback(() => {
    if (tokenCount !== undefined && tokenCount > 0) {
      setTradeType(prev => (prev === 'buy' ? 'sell' : 'buy'));
      const oldAmount = amount;
      const oldAmountUsd = amountUsd;
      const oldToAmount = toAmount;
      const oldToAmountUsd = toAmountUsd;

      setTimeout(() => {
        setAmount(oldToAmount);
        setAmountUsd(oldToAmountUsd);
        setToAmount(oldAmount);
        setToAmountUsd(oldAmountUsd);
      }, 0);
    }
  }, [amount, amountUsd, toAmount, toAmountUsd, tokenCount]);

  const touchpadValue = useMemo(() => {
    if (selectedIndex === 0) {
      if (fromAmountType === 'sol') {
        return amount;
      }
      return amountUsd;
    } else {
      if (toAmountType === 'sol') {
        return toAmount;
      }
      return toAmountUsd;
    }
  }, [
    selectedIndex,
    fromAmountType,
    toAmountType,
    amount,
    amountUsd,
    toAmount,
    toAmountUsd,
  ]);

  const touchpadDecimal = useMemo(() => {
    if (selectedIndex === 0) {
      if (fromAmountType === 'sol') {
        return 3;
      }
      return 2;
    } else {
      if (toAmountType === 'sol') {
        return 3;
      }
      return 2;
    }
  }, [selectedIndex, fromAmountType, toAmountType]);

  const onTouchpadPress = useCallback(
    (value: string) => {
      if (selectedIndex === 0) {
        const numberValue = Number(value);
        if (fromAmountType === 'sol') {
          setAmount(value);
          if (!isNaN(numberValue) && numberValue > 0) {
            setLoadingIndex(1);
          }
          if (tradeType === 'buy') {
            const val = numberValue * currentSolPrice;
            setAmountUsd(val.toFixed(2));
          } else {
            const val = numberValue * currentMintPrice;
            setAmountUsd(val.toFixed(2));
          }
        } else {
          setAmountUsd(value);
          if (tradeType === 'buy') {
            const val = numberValue / currentSolPrice;
            const valString = val.toFixed(val < 0 ? 4 : 3);
            if (Number(valString) > 0) {
              setLoadingIndex(1);
            }
            setAmount(valString);
          } else {
            const val = numberValue / currentMintPrice;
            const valString = val.toFixed(val < 0 ? 4 : 3);
            if (Number(valString) > 0) {
              setLoadingIndex(1);
            }
            setAmount(valString);
          }
        }
      } else {
        const numberValue = Number(value);
        if (!isNaN(numberValue) && numberValue > 0) {
          setLoadingIndex(0);
        }
        if (toAmountType === 'sol') {
          setToAmount(value);
          if (tradeType === 'buy') {
            const val = numberValue * currentMintPrice;
            setToAmountUsd(val.toFixed(2));
          } else {
            const val = numberValue * currentSolPrice;
            setToAmountUsd(val.toFixed(2));
          }
        } else {
          setToAmountUsd(value);
          if (tradeType === 'buy') {
            const val = numberValue / currentMintPrice;
            setToAmount(val.toFixed(val < 0 ? 4 : 3));
          } else {
            const val = numberValue / currentSolPrice;
            setToAmount(val.toFixed(val < 0 ? 4 : 3));
          }
        }
      }
    },
    [
      fromAmountType,
      toAmountType,
      selectedIndex,
      tradeType,
      currentSolPrice,
      currentMintPrice,
    ],
  );
  const handleSelect = useCallback((index: number) => {
    // Burada from kutusu yada to kutusu seçiliyor
    // setSelectedIndex(index);
  }, []);
  const handlePercentage = useCallback(
    (percentage: number) => {
      // Burada yüzdelik değerler ile amount ve toAmount güncelleniyor
      if (selectedIndex === 0) {
        if (tradeType === 'buy') {
          const maxAmount = (solBalance || 0) - MIN_SOL_AMOUNT;
          if (maxAmount > 0) {
            const newAmount = (maxAmount * percentage) / 100;
            const newAmountUsd = newAmount * currentSolPrice;
            setAmount(
              newAmount.toFixed(percentage === 100 ? 9 : newAmount < 0 ? 4 : 3),
            );
            setAmountUsd(newAmountUsd.toFixed(2));
          } else {
            setAmount('0');
            setAmountUsd('0');
          }
        } else {
          const newAmount = (tokenCount || 0) * (percentage / 100);
          const newAmountUsd = newAmount * currentMintPrice;
          setAmount(
            newAmount.toFixed(
              percentage === 100 ? decimal : newAmount < 0 ? 4 : 3,
            ),
          );
          setAmountUsd(newAmountUsd.toFixed(2));
        }
      }
    },
    [
      selectedIndex,
      tradeType,
      solBalance,
      tokenCount,
      currentSolPrice,
      currentMintPrice,
      decimal,
    ],
  );

  const handleSubmit = useCallback(async () => {
    navigation.setOptions({
      gestureEnabled: false,
    });
    // Burada işlem gönderiliyor
    if (txn && user) {
      setNotificationError(undefined);
      setDisabled(true);
      setNotificationLabel(t('common:executing'));
      setNotificationLoading(true);
      setNotificationType('warning');
      setShowNotification(true);
      let response: string | AppResponseType<string> = '';

      if (wallet === user.wallet) {
        response = await doTransaction(txn);
      } else {
        response = await tokenSwapPoolService(
          txn,
          wallet,
          amount,
          tradeType,
          mint,
          symbol,
          currentSolPrice,
          currentMintPrice,
          image,
        );
      }

      if (typeof response === 'string') {
        setNotificationType('error');
        setNotificationLoading(false);
        setNotificationLabel(t('common:tradeError'));
        setNotificationError(t('errors:solana.failedToSwap'));
        setDisabled(false);
        setTimeout(() => {
          setShowNotification(false);
        }, 2000);
      } else {
        if (response.status === 'success') {
          setNotificationLabel(t('common:tradeComplete'));
          setNotificationType('success');
          setNotificationLoading(false);
          setBackendTxn(response.data);
          resetTransactionSettings();
          if (wallet === user.wallet) {
            await handleRefresh();
          }
        } else {
          setNotificationType('error');
          setNotificationLoading(false);
          setNotificationLabel(t('common:tradeError'));
          setNotificationError(response.message);
          setDisabled(false);
          setTimeout(() => {
            setShowNotification(false);
          }, 2000);
        }
      }
    } else {
      setNotificationType('error');
      setNotificationLoading(false);
      setNotificationLabel(t('common:tradeError'));
      setNotificationError(t('errors:solana.failedToSwap'));
      setDisabled(false);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }

    navigation.setOptions({
      gestureEnabled: true,
    });
  }, [
    wallet,
    txn,
    doTransaction,
    t,
    navigation,
    resetTransactionSettings,
    handleRefresh,
    amount,
    tradeType,
    mint,
    user,
    image,
    symbol,
    currentMintPrice,
    currentSolPrice,
  ]);

  // HACK: Burası dev modda test etmek için oluşturuldu.
  const handleQuote = useCallback(() => {
    const postAmount = Number(debouncedAmount);
    setDisabled(true);
    if (postAmount > 0) {
      setLoadingIndex(selectedIndex === 0 ? 1 : 0);
      const simulatedTxn = WalletManager.generateRandomTxHash();
      setTxn(simulatedTxn);
      const calcFromPrice =
        tradeType === 'buy' ? currentSolPrice : currentMintPrice;
      const calcToPrice =
        tradeType === 'buy' ? currentMintPrice : currentSolPrice;

      const calcOutAmount = (postAmount * calcFromPrice) / calcToPrice;

      setToAmount(calcOutAmount.toString());
      setToAmountUsd((calcOutAmount * calcToPrice).toString());

      setAmountUsd((postAmount * calcFromPrice).toFixed(2));
    } else {
      setPriceImpact(0);
      setNetworkFee(0);
      setTxn(undefined);
      if (selectedIndex === 0) {
        setToAmount('0');
        setToAmountUsd('0');
      } else {
        setAmount('0');
        setAmountUsd('0');
      }
    }
    setLoadingIndex(undefined);
  }, [
    debouncedAmount,
    selectedIndex,
    tradeType,
    currentSolPrice,
    currentMintPrice,
  ]);

  /**
   * Dolar yazılırsa fixed max 2 olacak
   * Bu method sadece üst kutu seçildiğinde çalışacak. Alt kutu seçili ise aynı method tekrar oluşturulacak. Yoksa 2 defa çalışıyor.
   */
  // const handleQuote = useCallback(async () => {
  //   // const postAmount =
  //   //   selectedIndex === 0 ? Number(debouncedAmount) : Number(debouncedToAmount);
  //   const postAmount = Number(debouncedAmount);
  //   const postData = {
  //     wallet,
  //     mint,
  //     type: tradeType,
  //     amount: postAmount,
  //     priorityFee: transactionOptions.priorityFee,
  //     priorityFeeLevel: transactionOptions.priorityFeeLevel,
  //     maxPriorityFee: 0.001,
  //     slippage: transactionOptions.slippage,
  //   };
  //   console.log('Quote Params:', postData);
  //   setDisabled(true);
  //   if (postAmount > 0) {
  //     setLoadingIndex(selectedIndex === 0 ? 1 : 0);
  //     const response = await quoteTracker(postData);
  //     console.log('Token Quote Response:', response);
  //     if (typeof response === 'string') {
  //       setButtonError(response);
  //       setTxn(undefined);
  //     } else {
  //       setTxn(response.txn);
  //       setToAmount(response.outAmount.toString());
  //       const calcToPrice =
  //         tradeType === 'buy' ? response.mintPrice : currentSolPrice;
  //       const calcToAmountUsd = response.outAmount * calcToPrice;
  //       setToAmountUsd(calcToAmountUsd.toString());
  //       setPriceImpact(response.impact);
  //       setNetworkFee(response.fee);
  //       setCurrentMintPrice(response.mintPrice);
  //       setDisabled(false);
  //       setButtonError(undefined);
  //     }
  //   } else {
  //     setPriceImpact(0);
  //     setNetworkFee(0);
  //     setTxn(undefined);
  //     if (selectedIndex === 0) {
  //       setToAmount('0');
  //       setToAmountUsd('0');
  //     } else {
  //       setAmount('0');
  //       setAmountUsd('0');
  //     }
  //   }
  //   setLoadingIndex(undefined);
  // }, [
  //   debouncedAmount,
  //   selectedIndex,
  //   wallet,
  //   mint,
  //   tradeType,
  //   decimal,
  //   currentSolPrice,
  //   transactionOptions,
  // ]);

  useEffect(() => {
    handleQuote();
  }, [handleQuote]);

  useEffect(() => {
    const getSolBalance = async () => {
      const response = await getTradeBalance(wallet);

      if (response.status == 'success') {
        setSolBalance(response.data);
      }
    };
    if (user && user.wallet) {
      getSolBalance();
    }
  }, [wallet, user?.wallet]);

  useEffect(() => {
    const getSolMintPrices = async () => {
      const response = await getPrices([mint]);
      if (typeof response !== 'undefined') {
        const sP = response[SOL_MINT].usdPrice;
        const mP = response[mint].usdPrice;
        setCurrentSolPrice(sP);
        setCurrentMintPrice(mP);
      }
    };
    if (SOL_MINT && mint) {
      getSolMintPrices();
    }
  }, [SOL_MINT, mint, getPrices]);

  const commonProps = useMemo(
    () => ({
      selectedIndex: selectedIndex,
      swapType: handleSwapAmountType,
      onPress: handleSelect,
      loadingIndex,
      image,
    }),
    [selectedIndex, handleSwapAmountType, handleSelect, loadingIndex, image],
  );

  const notificationProps = useMemo(() => {
    if (!notificationError) {
      return {
        imageUrl: image,
        swapType: tradeType === 'buy' ? 'to' : 'from',
        fromAmount: Number(amount).toFixed(tradeType === 'buy' ? 9 : decimal),
        toAmount: Number(toAmount).toFixed(tradeType === 'buy' ? decimal : 9),
        symbol,
      } as DescriptionType;
    } else {
      return notificationError;
    }
  }, [notificationError, image, tradeType, amount, toAmount, symbol, decimal]);

  return (
    <>
      <TopNotification
        type={notificationType}
        label={notificationLabel}
        isLoading={notificationLoading}
        isVisible={showNotification}
        description={notificationProps}
        topRightContent={
          backendTxn ? <RightComponent tx={backendTxn} /> : undefined
        }
      />
      <LayoutStatusBar />
      <ScrollView style={[styles.scrollContainer, {marginTop: top}]}>
        <View style={{minHeight: height - top}}>
          <Header
            title={t(`common:swap`)}
            onPressBack={() => navigation.goBack()}
            paddingTop={6}
            trailing={
              <TouchableOpacity
                style={styles.settingsContainer}
                onPress={() =>
                  navigation.navigate(SCREEN_NAMES.APP.TRANSACTION_SETTING)
                }>
                <Text
                  style={[
                    styles.settingText,
                    styles.settingTextDefaultColor,
                    styles.fontMedium,
                  ]}>
                  {settingsName.label}
                  {settingsName.value && (
                    <Text
                      style={[
                        styles.settingText,
                        styles.settingTextPrimaryColor,
                        styles.fontNeue,
                      ]}>
                      {` - ${settingsName.value}%`}
                    </Text>
                  )}
                </Text>
                <View style={styles.iconContainer}>
                  <SettingsGearIcon />
                </View>
              </TouchableOpacity>
            }
          />
          <View style={styles.swapContainer}>
            <TouchableOpacity
              style={styles.swapButton}
              disabled={isSwapable}
              onPress={handleSwap}>
              <SwapIcon
                width={scaleSize(18.84)}
                height={scaleSize(16.77)}
                color={COLORS.DARK}
              />
            </TouchableOpacity>
            <SwapCard
              index={0}
              symbol={tradeType === 'buy' ? 'SOL' : symbol}
              balance={tradeType === 'buy' ? solBalance : tokenCount || 0}
              decimal={tradeType === 'buy' ? 9 : route.params.decimal}
              amount={fromAmountType === 'sol' ? amount : amountUsd}
              usdAmount={fromAmountType === 'sol' ? amountUsd : amount}
              type={fromAmountType}
              {...commonProps}
            />
            <SwapCard
              index={1}
              symbol={tradeType === 'sell' ? 'SOL' : symbol}
              balance={tradeType === 'sell' ? solBalance : tokenCount || 0}
              decimal={tradeType === 'sell' ? 9 : route.params.decimal}
              amount={toAmountType === 'sol' ? toAmount : toAmountUsd}
              usdAmount={toAmountType === 'sol' ? toAmountUsd : toAmount}
              type={toAmountType}
              {...commonProps}
            />
          </View>
          <View
            style={[
              styles.bottomContainer,
              {paddingBottom: bottom > 0 ? SPACING.PAGE_BOTTOM : SPACING.MD_LG},
            ]}>
            <PercentageButtons onPress={handlePercentage} />
            <View style={[styles.percentageContainer, styles.infoContainer]}>
              <InfoText priceImpact={priceImpact} networkFee={networkFee} />
            </View>
            <Touchpad
              onPress={onTouchpadPress}
              amount={touchpadValue}
              decimal={touchpadDecimal}
            />
            <View style={styles.sendContainer}>
              <BaseButton
                label={buttonError ? buttonError : t(`common:${tradeType}`)}
                type={tradeType === 'sell' ? 'danger' : 'primary'}
                onPress={handleSubmit}
                // disabled={disabled}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default memo(TradeScreen);
