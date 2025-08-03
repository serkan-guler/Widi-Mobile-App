import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import styles from './styles';
import {
  AmountType,
  AppStackScreenProps,
  PriorityFeeType,
  StatusTypes,
  TradeType,
} from '../../../../types';
import {useTranslation} from 'react-i18next';
import {useDebounce, useFilter, useSize} from '../../../../hooks';
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
import {getTradeBalance, tokenQuoteService} from '../../../../services';
import {SOL_MINT} from '@env';
import {MIN_SOL_AMOUNT} from '../../../../constants/transaction';
import {quote} from '../../../../utils';

const TradeScreen = ({
  route,
  navigation,
}: AppStackScreenProps<'TokenTrade'>) => {
  const {t} = useTranslation(['navigation', 'common', 'content']);
  const {
    height,
    safeArea: {top, bottom},
  } = useSize();
  // const {slippage, speedFee} = useFilter();

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

  const [amount, setAmount] = useState<string>('0');
  const [amountUsd, setAmountUsd] = useState<string>('0');
  const [toAmount, setToAmount] = useState<string>('0');
  const [toAmountUsd, setToAmountUsd] = useState<string>('0');

  const [amountType, setAmountType] = useState<AmountType>('sol');
  const [tradeType, setTradeType] = useState<TradeType>(type);
  const [solBalance, setSolBalance] = useState<number>(0);
  const [tokenBalance, setTokenBalance] = useState<number>(tokenCount || 0);

  const [currentSolPrice, setCurrentSolPrice] = useState<number>(solPrice);
  const [currentMintPrice, setCurrentMintPrice] = useState<number>(price);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [loadingIndex, setLoadingIndex] = useState<number>();

  const [priceImpact, setPriceImpact] = useState<number>(0);
  const [networkFee, setNetworkFee] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);

  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationType, setNotificationType] =
    useState<StatusTypes>('warning');

  const debouncedAmount = useDebounce(amount, 600);
  const debouncedToAmount = useDebounce(toAmount, 600);

  const filterName = useMemo(() => {
    return t('common:auto');
  }, [t]);
  // const filterName = useMemo(() => {
  //   if (slippage === 'auto' && speedFee === 'auto') {
  //     return t('common:auto');
  //   }

  //   return t('common:custom');
  // }, [slippage, speedFee]);

  const touchpadValue = useMemo(() => {
    if (selectedIndex === 0) {
      if (amountType === 'sol') {
        return amount;
      }

      return amountUsd;
    } else {
      if (amountType === 'sol') {
        return toAmount;
      }

      return toAmountUsd;
    }
  }, [amount, amountUsd, toAmount, toAmountUsd, amountType, selectedIndex]);

  const onTouchpadPress = useCallback(
    (value: string) => {
      console.log('Touchpad value:', value);
      if (selectedIndex === 0) {
        setLoadingIndex(1);
        if (amountType === 'sol') {
          setAmount(value);
          if (tradeType === 'buy') {
            setAmountUsd((Number(value) * currentSolPrice).toFixed(2));
          } else {
            setAmountUsd((Number(value) * currentMintPrice).toFixed(2));
          }
        } else {
          setAmountUsd(value);
          if (tradeType === 'buy') {
            setAmount((Number(value) / currentSolPrice).toFixed(3));
          } else {
            setAmount((Number(value) / currentMintPrice).toFixed(3));
          }
        }
      } else {
        setLoadingIndex(1);
        if (amountType === 'sol') {
          setToAmount(value);
          if (tradeType === 'buy') {
            setToAmountUsd((Number(value) * currentMintPrice).toFixed(2));
          } else {
            setToAmountUsd((Number(value) * currentSolPrice).toFixed(2));
          }
        } else {
          setToAmountUsd(value);
          if (tradeType === 'buy') {
            setToAmount((Number(value) / currentMintPrice).toFixed(3));
          } else {
            setToAmount((Number(value) / currentSolPrice).toFixed(3));
          }
        }
      }
    },
    [amountType, currentMintPrice, currentSolPrice, selectedIndex, tradeType],
  );

  const resetState = useCallback(() => {
    setAmount('0');
    setAmountUsd('0');
    setToAmount('0');
    setToAmountUsd('0');
  }, []);

  const handleSwapAmountType = useCallback(() => {
    setAmountType(prev => (prev === 'sol' ? 'usd' : 'sol'));
  }, []);

  const handleSelect = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      // setAmount('0');
      // setTradeType(index === 0 ? 'buy' : 'sell');
    },
    [setSelectedIndex, setAmount, setTradeType],
  );

  const handleSubmit = useCallback(async () => {}, []);

  const handleQuote = useCallback(async () => {
    console.log('Submitting trade with amount:', {
      debouncedAmount,
      decimal,
      mint,
      tradeType,
      wallet,
    });
    // const postAmount = amountType === 'sol' ? Number(amount) : usdBuyAmount;
    const postAmount =
      selectedIndex === 0 ? Number(debouncedAmount) : Number(debouncedToAmount);
    const postData = {
      wallet,
      mint,
      type: tradeType,
      amount: postAmount,
      decimals: decimal,
      priorityFee: 'medium' as PriorityFeeType,
      maxPriorityFee: 0.001,
    };
    setDisabled(true);
    setLoadingIndex(selectedIndex === 0 ? 1 : 0);

    if (postAmount > 0) {
      const response = await quote(postData);
      console.log('Token Quote Response:', response);

      if (typeof response !== 'string') {
        const pSol = response.prices?.[SOL_MINT];
        const pMint = response.prices?.[mint];

        if (pSol) {
          setCurrentSolPrice(pSol.usdPrice);
        }
        if (pMint) {
          setCurrentMintPrice(pMint.usdPrice);
        }
        // setBalance(data.balance);
        setPriceImpact(response.priceImpact);
        setNetworkFee(response.networkFee);
        const newAmount = (response.tokenAmount || 0).toFixed(3);
        const newAmountUsd = (response.tokenAmountUsd || 0).toFixed(3);
        if (selectedIndex === 0) {
          setToAmount(newAmount);
          setToAmountUsd(newAmountUsd);
        } else {
          setAmount(newAmount);
          setAmountUsd(newAmountUsd);
        }
        if (response.simulationError === null) {
          setDisabled(false);
        }
      }
    } else {
      setPriceImpact(0);
      setNetworkFee(0);
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
    debouncedToAmount,
    mint,
    decimal,
    tradeType,
    wallet,
    amountType,
    selectedIndex,
  ]);

  const handlePercentage = useCallback(
    (val: number) => {
      if (tradeType === 'buy') {
        const maxAmount = (solBalance || 0) - MIN_SOL_AMOUNT;
        console.log(
          'Max Amount:',
          maxAmount,
          'Min Amount:',
          MIN_SOL_AMOUNT,
          'Val: ',
          val,
        );
        if (maxAmount > 0) {
          const newAmount = (maxAmount * val) / 100;
          const newAmountUsd = newAmount * currentSolPrice;
          console.log('New Amount:', newAmount, 'USD:', newAmountUsd);
          setAmount(newAmount.toFixed(3));
          setAmountUsd(newAmountUsd.toFixed(3));
        } else {
          setAmount('0');
          setAmountUsd('0');
        }
      } else {
        const newAmount = (tokenCount || 0) * (val / 100);
        const newAmountUsd = newAmount * currentMintPrice;
        setAmount(newAmount.toFixed(3));
        setAmountUsd(newAmountUsd.toFixed(3));
      }
    },
    [
      solBalance,
      tokenCount,
      tradeType,
      currentSolPrice,
      currentMintPrice,
      MIN_SOL_AMOUNT,
    ],
  );

  const isSwapable = useMemo(() => {
    if (tokenCount !== undefined) {
      if (tokenCount > 0) {
        return false;
      }
    }

    return true;
  }, [tokenCount]);

  useEffect(() => {
    const getSolBalance = async () => {
      const response = await getTradeBalance(wallet);

      if (response.status == 'success') {
        setSolBalance(response.data.balance);
      }
    };
    getSolBalance();
  }, [wallet]);

  useEffect(() => {
    handleQuote();
  }, [handleQuote]);

  useEffect(() => {
    setTimeout(() => {
      setNotificationType('error');
      setShowNotification(true);
    }, 1000);
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  }, []);

  return (
    <>
      <TopNotification
        type={notificationType}
        label="Excuting…"
        isLoading
        isVisible={showNotification}
        description={{
          imageUrl: image,
          swapType: tradeType === 'buy' ? 'to' : 'from',
          fromAmount: Number(amount),
          toAmount: Number(toAmount).toFixed(3),
          symbol,
        }}
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
                <Text style={styles.settingText}>{filterName}</Text>
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
              onPress={() => {
                if (tokenCount !== undefined && tokenCount > 0) {
                  setTradeType(prev => (prev === 'buy' ? 'sell' : 'buy'));
                  // resetState();
                }
              }}>
              <SwapIcon
                width={scaleSize(18.84)}
                height={scaleSize(16.77)}
                color={COLORS.DARK}
              />
            </TouchableOpacity>
            <SwapCard
              index={0}
              selectedIndex={selectedIndex}
              symbol={tradeType === 'buy' ? 'SOL' : symbol}
              image={image}
              balance={tradeType === 'buy' ? solBalance : tokenCount || 0}
              decimal={tradeType === 'buy' ? 9 : route.params.decimal}
              amount={amountType === 'sol' ? amount : amountUsd}
              usdAmount={amountType === 'sol' ? amountUsd : amount}
              type={amountType}
              swapType={handleSwapAmountType}
              onPress={handleSelect}
              loadingIndex={loadingIndex}
            />
            <SwapCard
              index={1}
              selectedIndex={selectedIndex}
              symbol={tradeType === 'sell' ? 'SOL' : symbol}
              image={image}
              balance={tradeType === 'sell' ? solBalance : tokenCount || 0}
              decimal={tradeType === 'sell' ? 9 : route.params.decimal}
              amount={amountType === 'sol' ? toAmount : toAmountUsd}
              usdAmount={amountType === 'sol' ? toAmountUsd : toAmount}
              type={amountType}
              swapType={handleSwapAmountType}
              onPress={handleSelect}
              loadingIndex={loadingIndex}
            />
          </View>
          <View
            style={[
              styles.bottomContainer,
              {paddingBottom: bottom > 0 ? SPACING.PAGE_BOTTOM : SPACING.MD_LG},
            ]}>
            {/* <View style={styles.percentageContainer}>
              {percentageOptions.map(option => (
                <TouchableOpacity
                  key={option}
                  style={[styles.percentageButton]}
                  onPress={() => handlePercentage(option)}>
                  <Text style={[styles.percentageText, styles.fontMedium]}>
                    {option}
                    <Text style={[styles.percentageText, styles.fontNeue]}>
                      %
                    </Text>
                  </Text>
                </TouchableOpacity>
              ))}
            </View> */}
            <PercentageButtons onPress={handlePercentage} />
            <View style={[styles.percentageContainer, styles.infoContainer]}>
              <InfoText priceImpact={priceImpact} networkFee={networkFee} />
            </View>
            <Touchpad
              onPress={onTouchpadPress}
              amount={touchpadValue}
              decimal={3}
            />
            <View style={styles.sendContainer}>
              <BaseButton
                label={t(`common:${tradeType}`)}
                type={tradeType === 'sell' ? 'danger' : 'primary'}
                onPress={handleSubmit}
                disabled={disabled}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default memo(TradeScreen);
