import {
  memo,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import styles from './styles';
import {Animated, Easing, Text, View} from 'react-native';
import {useSize} from '../../../hooks';
import {StatusTypes} from '../../../types';
import {LoadingIcon} from '../../../assets/icons';
import {NOTIFICATION} from '../../../constants/colors';
import {SPACING} from '../../../constants/dimensions';
import TopText from './TopText';

export type DescriptionType =
  | string
  | {
      imageUrl?: string;
      swapType: 'from' | 'to';
      fromAmount: number | string;
      toAmount: number | string;
      symbol: string;
    };

type Props = {
  type: StatusTypes;
  label: string;
  isLoading?: boolean;
  topRightContent?: ReactNode;
  description: DescriptionType;
  isVisible: boolean;
  onAnimationComplete?: () => void;
};

const TopNotification = ({
  type,
  label,
  topRightContent,
  isLoading = false,
  description,
  isVisible,
}: Props) => {
  const {
    safeArea: {top},
  } = useSize();

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    if (isVisible) {
      // Açılma animasyonu - yukarıdan aşağı
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      // Kapanma animasyonu - aşağıdan yukarı
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 400,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

  useEffect(() => {
    /* Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(); */

    const startRotation = () => {
      rotateAnim.setValue(0);
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000, // 2 saniye
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        if (isVisible) startRotation(); // Sadece görünürken dönsün
      });
    };

    if (isVisible) {
      startRotation();
    }
  }, [isVisible, rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const showLoading = useMemo(() => isLoading, [isLoading]);

  return (
    <Animated.View
      style={[
        styles.topNotificationContainer,
        type === 'success'
          ? styles.successContainer
          : type === 'error'
            ? styles.dangerContainer
            : styles.warningContainer,
        {
          marginTop: top > 0 ? top : SPACING.XS,
          transform: [{translateY: slideAnim}],
        },
      ]}>
      <View style={styles.titleContainer}>
        <Text
          style={[
            styles.topTitleText,
            type === 'success'
              ? styles.successText
              : type === 'error'
                ? styles.dangerText
                : styles.warningText,
          ]}>
          {label}
        </Text>
        {showLoading && (
          <Animated.View
            style={[styles.loadingContainer, {transform: [{rotate}]}]}>
            <LoadingIcon
              color={
                type === 'success'
                  ? NOTIFICATION.SUCCESS.TEXT
                  : type === 'error'
                    ? NOTIFICATION.DANGER.TEXT
                    : NOTIFICATION.WARNING.TEXT
              }
            />
          </Animated.View>
        )}
        {topRightContent && (
          <View style={styles.loadingContainer}>{topRightContent}</View>
        )}
      </View>
      <TopText description={description} type={type} />
    </Animated.View>
  );
};

export default memo(TopNotification);
