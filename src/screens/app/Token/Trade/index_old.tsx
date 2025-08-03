import {memo, useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles_old';
import {
  Animated,
  Easing,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFilter, useSize} from '../../../../hooks';
import {
  AvailableCard,
  BaseButton,
  Header,
  ScrollLayout,
  SolanaAbsoluteImage,
  Touchpad,
} from '../../../../components';
import {AmountType, AppStackScreenProps} from '../../../../types';
import {useTranslation} from 'react-i18next';
import {
  SettingsGearIcon,
  SolanaBridgeIcon,
  SwapIcon,
} from '../../../../assets/icons';
import {scaleSize, SPACING} from '../../../../constants/dimensions';
import {SCREEN_NAMES} from '../../../../constants/navigation';
import {getTradeBalance, tokenQuoteService} from '../../../../services';
import {showAlert} from '../../../../utils/alert';

const percentageOptions = [25, 50, 75, 100];

const TradeScreen = ({
  route,
  navigation,
}: AppStackScreenProps<'TokenTrade'>) => {
  const {t} = useTranslation(['navigation', 'common', 'content']);
  const {width} = useSize();
  const {slippage, speedFee} = useFilter();

  const [amount, setAmount] = useState<string>('0');
  const [amountType, setAmountType] = useState<AmountType>('sol');
  const [percentage, setPercentage] = useState(25);
  const [balance, setBalance] = useState<number>();

  const slideAnimation = useRef(new Animated.Value(0)).current;
  const swapPosition = useMemo(
    () => width / 2 - SPACING.MD_LG - scaleSize(24.5),
    [width],
  );

  const {type, image, mint, symbol, wallet} = useMemo(() => {
    return route.params;
  }, [route.params]);

  console.log('TradeScreen Params:', route.params);

  useEffect(() => {
    const getBalance = async () => {
      const response = await getTradeBalance(wallet);
      console.log('Trade Balance Response:', response);
      if (response.status === 'success') {
        setBalance(response.data);
      } else {
        showAlert(response.status, response.message, [
          {
            text: t('common:close'),
            style: 'cancel',
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    };
    getBalance();
  }, [wallet]);

  const handleSwapCurrency = (type: AmountType) => {
    const toValue = type === 'usdc' ? 1 : 0;

    Animated.timing(slideAnimation, {
      toValue,
      duration: 10,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      useNativeDriver: true,
    }).start(() => {
      setAmountType(type);
    });
  };

  const selectorTransform = {
    transform: [
      {
        translateX: slideAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 100],
        }),
      },
    ],
  };

  const onTouchpadPress = (value: string) => {
    console.log('Touchpad value:', value);
    setAmount(value);
  };

  const filterName = useMemo(() => {
    if (slippage === 'auto' && speedFee === 'auto') {
      return t('common:auto');
    }

    return t('common:custom');
  }, [slippage, speedFee]);

  const handleTrade = async () => {
    const response = await tokenQuoteService();
    console.log('Token Quote Response:', response);
  };

  return (
    <ScrollLayout>
      <Header
        title={t(`common:${type}`)}
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
      <View style={[styles.container]}>
        <View style={styles.swapContainer}>
          <View style={styles.itemContainer}>
            <View style={[styles.imageContainer, styles.imageSize]}>
              <Image
                source={{uri: image}}
                style={[styles.imageSize, styles.image]}
                resizeMode="cover"
              />
              <SolanaAbsoluteImage
                width={17}
                height={17}
                bottom={7}
                right={7}
                iconWidth={9}
                iconHeight={9}
              />
            </View>
            <Text style={styles.titleText}>{symbol}</Text>
          </View>
          <TouchableOpacity
            style={[styles.swapButtonContainer, {left: swapPosition}]}>
            <SwapIcon style={styles.iconRotate} />
          </TouchableOpacity>
          <View style={[styles.itemContainer]}>
            <Text style={styles.titleText}>SOL</Text>
            <View style={[styles.solanaContainer, styles.imageSize]}>
              <SolanaBridgeIcon />
            </View>
          </View>
        </View>
        <View style={styles.symbolContainer}>
          <Animated.View
            style={[
              styles.symbolItemActiveColor,
              selectorTransform,
              {position: 'absolute'},
            ]}
          />
          <TouchableOpacity
            style={[
              styles.symbolItemContainer,
              amountType === 'usdc' && styles.symbolItemActiveColor,
            ]}
            onPress={() => handleSwapCurrency('usdc')}>
            <Text style={styles.usdText}>$</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.symbolItemContainer,
              amountType === 'sol' && styles.symbolItemActiveColor,
            ]}
            onPress={() => handleSwapCurrency('sol')}>
            <Text style={styles.usdText}>
              <SolanaBridgeIcon />
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>
            {amount} {amountType.toUpperCase()}
          </Text>
        </View>
        <View style={styles.availableContainer}>
          <AvailableCard amount={balance} type="sol" />
        </View>
        <View style={styles.touchPadContainer}>
          <View style={styles.percentageContainer}>
            {percentageOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.percentageButton,
                  percentage === option && styles.symbolItemActiveColor,
                ]}
                onPress={() => setPercentage(option)}>
                <Text style={[styles.percentageText, styles.fontMedium]}>
                  {option}
                  <Text style={[styles.percentageText, styles.fontNeue]}>
                    %
                  </Text>
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.feeButtonsContainer}>
            <View style={styles.feeButton}>
              <Text
                style={[
                  styles.feeButtonText,
                  styles.fontMedium,
                ]}>{`${t('content:networkFee')}: <$0.01`}</Text>
            </View>
            <View style={styles.feeButton}>
              <Text style={[styles.feeButtonText, styles.fontMedium]}>
                {`${t('content:platformFee')}: 1`}
                <Text style={[styles.feeButtonText, styles.fontNeue]}>%</Text>
              </Text>
            </View>
          </View>
          <Touchpad onPress={onTouchpadPress} />
          <BaseButton
            label={t(`common:${type}`)}
            type={type === 'sell' ? 'danger' : 'primary'}
            onPress={handleTrade}
          />
        </View>
      </View>
    </ScrollLayout>
  );
};

export default memo(TradeScreen);
