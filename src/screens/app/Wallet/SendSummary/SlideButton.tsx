import {memo, useCallback, useRef, useState} from 'react';
import styles from './styles';
import {Animated, PanResponder, View} from 'react-native';
import {DoubleArrowRightIcon} from '../../../../assets/icons';
import {scaleSize} from '../../../../constants/dimensions';
import {useTranslation} from 'react-i18next';
import {useSize, useWallet} from '../../../../hooks';
import {COLORS} from '../../../../constants/colors';
import {buildSendTransactionService} from '../../../../services';
import {doTransaction} from '../../../../utils';
import {showAlert, showErrorAlert} from '../../../../utils/alert';
import {WalletModalDataType} from '../../../../types';

type Props = {
  mint: string;
  amount: number;
  to: string;
  decimal: number;
  isBouncing: boolean;
  updateScrollViewProps: (props: object) => void;
  modalData: WalletModalDataType;
  handleNavigateBack: () => void;
  navigationGesture: (gestureEnabled: boolean) => void;
};

const SlideButton = ({
  mint,
  amount,
  to,
  decimal,
  isBouncing,
  updateScrollViewProps,
  modalData,
  handleNavigateBack,
  navigationGesture,
}: Props) => {
  const {t} = useTranslation(['common']);
  const {width} = useSize();
  const {setSendModalData} = useWallet();

  const translateX = useRef(new Animated.Value(0)).current;
  const backgroundColorAnim = useRef(new Animated.Value(0)).current;
  const textOpacityAnim = useRef(new Animated.Value(1)).current;

  const SLIDE_BUTTON_WIDTH = width - scaleSize(44 + 14); // 300; // Slide button genişliği
  const CIRCLE_BUTTON_WIDTH = scaleSize(66); // Circle button genişliği
  const MAX_TRANSLATE = SLIDE_BUTTON_WIDTH - CIRCLE_BUTTON_WIDTH;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetSlideButton = useCallback(() => {
    // Manuel olarak butonu en başa almak için
    setIsSubmitting(false);
    resetAnimation();
  }, []);

  const handleSubmit = useCallback(async () => {
    // Başarılı gönderim işlemi
    setIsSubmitting(true);
    navigationGesture(false);

    const transactionData = await buildSendTransactionService(
      mint,
      amount,
      to,
      decimal,
    );


    if (transactionData.status === 'error') {
      setIsSubmitting(false);
      // Error çıkacak
    } else {
      const response = await doTransaction(transactionData.data.transaction);

      if (typeof response === 'string') {
        showAlert('error', t(`errors:${response}`));
        setIsSubmitting(false);
      } else {
        if (response.status === 'success') {
          setSendModalData({...modalData, tx: response.data});
          handleNavigateBack();
        } else {
          setIsSubmitting(false);
          showErrorAlert(response);
        }
      }
    }

    setTimeout(() => {
      resetSlideButton();
      navigationGesture(true);
    }, 3000);
  }, [navigationGesture, resetSlideButton]);

  const resetAnimation = () => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: false,
        tension: 100,
        friction: 8,
      }),
      Animated.timing(backgroundColorAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(textOpacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const completeAnimation = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: MAX_TRANSLATE,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(backgroundColorAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(textOpacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(() => {
      handleSubmit();
    });
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // isSubmitting true ise gesture'ı engelleyin
      if (isSubmitting) return false;

      // Yatay hareket dikey hareketten büyükse PanResponder'ı aktif et
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
    },
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
      // isSubmitting true ise gesture'ı engelleyin
      if (isSubmitting) return false;

      // Yatay hareket dikey hareketten büyükse ScrollView'i bloke et
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
    },
    onPanResponderGrant: () => {
      // Animasyonu durdurmak için
      translateX.stopAnimation();
      backgroundColorAnim.stopAnimation();
      textOpacityAnim.stopAnimation();

      // ScrollView bouncing'i kapat
      updateScrollViewProps({
        bounces: false,
        scrollEnabled: false,
      });
    },
    onPanResponderMove: (_, gestureState) => {
      const newTranslateX = Math.max(
        0,
        Math.min(MAX_TRANSLATE, gestureState.dx),
      );
      const progress = newTranslateX / MAX_TRANSLATE;

      translateX.setValue(newTranslateX);
      backgroundColorAnim.setValue(progress);
      textOpacityAnim.setValue(1 - progress * 3); // Daha hızlı kaybolsun
    },
    onPanResponderRelease: (_, gestureState) => {
      const newTranslateX = Math.max(
        0,
        Math.min(MAX_TRANSLATE, gestureState.dx),
      );
      const progress = newTranslateX / MAX_TRANSLATE;

      // ScrollView bouncing'i tekrar aktif et
      updateScrollViewProps({
        bounces: isBouncing,
        scrollEnabled: true,
      });

      if (progress > 0.8) {
        // %80'e ulaştıysa işlemi tamamla
        completeAnimation();
      } else {
        // Geri döndür
        resetAnimation();
      }
    },
    onPanResponderTerminate: () => {
      // ScrollView bouncing'i tekrar aktif et
      updateScrollViewProps({
        bounces: isBouncing,
        scrollEnabled: true,
      });

      // Gesture kesintiye uğradıysa (örneğin scroll başladıysa) geri döndür
      resetAnimation();
    },
    onPanResponderTerminationRequest: () => {
      // ScrollView bouncing'i tekrar aktif et
      updateScrollViewProps({
        bounces: isBouncing,
        scrollEnabled: true,
      });

      // Başka bir component gesture almak isterse izin ver ama önce geri döndür
      resetAnimation();
      return true;
    },
  });

  const backgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', COLORS.PRIMARY], // Gri'den yeşile
  });

  const textColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.PRIMARY, COLORS.DARK], // Beyazdan transparana
  });

  return (
    <View style={[styles.bottomContainer]}>
      <Animated.View style={[styles.slideButton, {backgroundColor}]}>
        <Animated.View
          style={[
            styles.slideCircleButton,
            {
              transform: [{translateX}],
            },
          ]}
          {...panResponder.panHandlers}>
          <DoubleArrowRightIcon
            color={'#030A19'}
            width={scaleSize(29.46)}
            height={scaleSize(25.32)}
          />
        </Animated.View>
        <Animated.Text style={[styles.buttonSendText, {color: textColor}]}>
          {t(`common:${isSubmitting ? 'sending' : 'send'}`)}
          {isSubmitting && '...'}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

export default memo(SlideButton);
