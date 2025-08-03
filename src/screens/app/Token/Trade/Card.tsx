import {memo, useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles';
import {Text, TouchableOpacity, View, Image, Animated} from 'react-native';
import {useTranslation} from 'react-i18next';
import {SolanaDarkIcon, SwapIcon} from '../../../../assets/icons';
import {CARD_COLORS, COLORS} from '../../../../constants/colors';
import {scaleSize} from '../../../../constants/dimensions';
import {AmountType} from '../../../../types';
import {ShimmerSkeleton} from '../../../../components';

type Props = {
  index: number;
  selectedIndex: number;
  image?: string;
  symbol: string;
  balance: number;
  decimal: number;
  amount: string;
  usdAmount: string;
  type: AmountType;
  onPress: (index: number) => void;
  swapType: (index: number) => void;
  loadingIndex?: number;
};

const SwapCard = ({
  index,
  selectedIndex,
  image,
  symbol,
  balance,
  decimal,
  amount,
  usdAmount,
  type,
  swapType,
  onPress,
  loadingIndex,
}: Props) => {
  const {t} = useTranslation(['common']);
  const borderColorAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [displayData, setDisplayData] = useState({
    symbol,
    balance,
    image,
    decimal,
  });
  const [amountHeight, setAmountHeight] = useState(0);
  const [usdAmountHeight, setUsdAmountHeight] = useState(0);

  const svgProps = {
    width: scaleSize(29),
    height: scaleSize(29),
  };

  useEffect(() => {
    Animated.timing(borderColorAnim, {
      toValue: selectedIndex === index ? 1 : 0,
      duration: 300, // 300ms animasyon süresi
      useNativeDriver: false, // borderColor için false olmalı
    }).start();
  }, [selectedIndex, index, borderColorAnim]);

  // İçerik değiştiğinde fade animasyonu
  useEffect(() => {
    // Önce fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      // Fade out tamamlandıktan sonra fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  }, [symbol, balance, image, fadeAnim]);

  useEffect(() => {
    // Eğer veri gerçekten değiştiyse
    if (
      displayData.symbol !== symbol ||
      displayData.balance !== balance ||
      displayData.image !== image
    ) {
      // Önce fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        // Fade out tamamlandıktan sonra yeni veriyi set et
        setDisplayData({symbol, balance, image, decimal});
        // Sonra fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [symbol, balance, image, fadeAnim, displayData]);

  // Interpolate border color
  const animatedBorderColor = borderColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CARD_COLORS.BACKGROUND, COLORS.PRIMARY], // cardBaseBorder ve PRIMARY renkleri
  });

  const formatAmount = useMemo(() => {
    const [number, decimal] = amount.replace(',', '.').split('.');

    if (!decimal) {
      return amount;
    }

    if (decimal.length >= 3) {
      // return Number(amount).toFixed(3);
      return `${number}.${decimal.slice(0, 3)}`;
    }

    return amount;
  }, [amount]);

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          borderColor: animatedBorderColor,
        },
      ]}>
      <View style={styles.cardLeftContainer}>
        <Text style={[styles.titleSolid, styles.fontMedium]}>
          {t(`common:${index === 0 ? 'youPay' : 'youReceive'}`)}
        </Text>
        <TouchableOpacity
          onPress={() => onPress(index)}
          style={styles.amountButton}
          onLayout={e => {
            const {height} = e.nativeEvent.layout;
            setAmountHeight(prev => (prev === 0 ? height : prev));
          }}>
          {loadingIndex === index && (
            <ShimmerSkeleton
              variant="text"
              width={scaleSize(120)}
              height={amountHeight || 43}
              borderRadius={10}
            />
          )}
          {loadingIndex !== index && (
            <Text style={[styles.amountText, styles.fontMedium]}>
              {type === 'usd' && '$'}
              {Number(amount).toFixed(type === 'usd' ? 2 : 3)}
            </Text>
          )}
        </TouchableOpacity>
        <View style={styles.usdSmallContainer}>
          {loadingIndex === index && (
            <ShimmerSkeleton
              variant="text"
              width={scaleSize(120)}
              height={usdAmountHeight || 17}
              borderRadius={10}
            />
          )}
          {loadingIndex !== index && (
            <Text
              style={[styles.usdText, styles.fontMedium]}
              onLayout={e => {
                const {height} = e.nativeEvent.layout;
                setUsdAmountHeight(prev => (prev === 0 ? height : prev));
              }}>
              {type === 'sol' && '$'}
              {Number(amount).toFixed(type === 'sol' ? 2 : decimal)}
            </Text>
          )}
          {/* {index === 0 && (
            <TouchableOpacity style={styles.usdSwapButton} onPress={swapType}>
              <SwapIcon color={COLORS.PRIMARY} />
            </TouchableOpacity>
          )} */}
          <TouchableOpacity
            style={styles.usdSwapButton}
            onPress={() => swapType(index)}>
            <SwapIcon color={COLORS.PRIMARY} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardRightContainer}>
        <Animated.View style={[styles.tokenContainer, {opacity: fadeAnim}]}>
          {displayData.symbol === 'SOL' ? (
            <SolanaDarkIcon {...svgProps} />
          ) : (
            <Image
              source={{uri: displayData.image || ''}}
              {...svgProps}
              style={styles.imageContainer}
            />
          )}
          <Text style={[styles.tokenText, styles.fontMedium]}>
            {displayData.symbol}
          </Text>
        </Animated.View>
        <Animated.View style={[styles.solAmountContainer, {opacity: fadeAnim}]}>
          <Text style={[styles.usdText, styles.fontMedium]}>
            {displayData.balance.toFixed(displayData.decimal)}{' '}
            {displayData.symbol}
          </Text>
          {index === 0 && (
            <View style={styles.maxButton}>
              <Text style={[styles.maxText, styles.fontMedium]}>
                {t('common:available')}
              </Text>
            </View>
          )}
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default memo(SwapCard);
