import {memo, ReactNode, useEffect, useMemo, useRef} from 'react';
import styles from './styles';
import {
  ActivityIndicator,
  Animated,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import {COLORS, COMPONENT_COLORS} from '../../../constants/colors';

type Type = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

type Props = {
  label: string;
  wFull?: boolean;
  type?: Type;
  leadingIcon?: ReactNode;
  size?: ButtonSize; // Buton boyutu
  isLoading?: boolean; // Yükleme durumu
  // iconSize?: number; // İkon boyutu (px)
} & TouchableOpacityProps;

const BaseButton = ({
  label,
  disabled,
  type = 'primary',
  wFull,
  leadingIcon,
  size = 'large',
  isLoading = false,
  // iconSize = SPACING.XL,
  ...touchableProps
}: Props) => {
  // Dinamik transform hesaplama - ikon boyutunun yarısı kadar yukarı kaydır
  // const iconTransform = iconSize ? iconSize / 2 : SPACING.XL / 2;

  const backgroundColorAnim = useRef(new Animated.Value(0)).current;
  const textColorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let toValue = 0;
    if (type === 'secondary') toValue = 1;
    else if (type === 'danger') toValue = 2;

    Animated.parallel([
      Animated.timing(backgroundColorAnim, {
        toValue,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(textColorAnim, {
        toValue,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  }, [type, backgroundColorAnim, textColorAnim]);

  // Animasyonlu background color
  const animatedBackgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: disabled
      ? [COMPONENT_COLORS.PRIMARY_BUTTON.DISABLED, COLORS.QUATERNARY, '#411918']
      : [
          COMPONENT_COLORS.PRIMARY_BUTTON.BACKGROUND,
          COLORS.TERTIARY,
          '#E70806',
        ],
  });

  // Animasyonlu text color
  const animatedTextColor = textColorAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: disabled
      ? [
          COMPONENT_COLORS.PRIMARY_BUTTON.BACKGROUND,
          COLORS.WHITE,
          COLORS.DANGER,
        ]
      : [COMPONENT_COLORS.PRIMARY_BUTTON.TEXT, COLORS.WHITE, COLORS.WHITE],
  });

  const containerStyle = useMemo(() => {
    const style: ViewStyle[] = [styles.container];

    if (size === 'small') {
      style.push(styles.smallContainer);
    } else if (size === 'medium') {
      style.push(styles.mediumContainer);
    } else {
      style.push(styles.largeContainer);
    }

    if (wFull) {
      style.push(styles.wFull);
    }

    return style;
  }, [disabled, size, type, wFull]);

  const buttonStyle = useMemo(() => {
    const style: ViewStyle[] = [styles.container];

    if (size === 'small') {
      style.push(styles.smallContainer);
      style.push(styles.smallButton);
    } else if (size === 'medium') {
      style.push(styles.mediumContainer);
      style.push(styles.mediumButton);
    } else {
      style.push(styles.largeContainer);
      style.push(styles.largeButton);
    }

    return style;
  }, [disabled, size, type]);

  const textStyle = useMemo(() => {
    const style: TextStyle[] = [styles.text];
    // if (type === 'primary') {
    //   if (!disabled) {
    //     style.push(styles.primaryText);
    //   } else {
    //     style.push(styles.disabledPrimaryText);
    //   }
    // } else if (type === 'danger') {
    //   if (!disabled) {
    //     style.push(styles.secondaryText);
    //   } else {
    //     style.push(styles.disabledDangerText);
    //   }
    // } else {
    //   style.push(styles.secondaryText);
    // }

    if (size === 'small') {
      style.push(styles.textSmall);
    } else if (size === 'medium') {
      style.push(styles.textMedium);
    } else {
      style.push(styles.textLarge);
    }

    return style;
  }, [disabled, size, type]);

  return (
    <Animated.View
      style={[
        containerStyle,
        {
          backgroundColor: animatedBackgroundColor,
        },
      ]}>
      <TouchableOpacity
        disabled={disabled || isLoading}
        style={[styles.touchableContainer, buttonStyle]}
        {...touchableProps}>
        {leadingIcon && (
          <View style={styles.leadingIconContainer}>
            <View
              style={[
                styles.leadingIcon,
                size === 'large' ? styles.largeLeadingRight : undefined,
              ]}>
              {leadingIcon}
            </View>
          </View>
        )}

        {isLoading && (
          <View style={styles.indicatorContainer}>
            <ActivityIndicator
              color={
                type === 'secondary'
                  ? COLORS.WHITE
                  : disabled
                    ? COMPONENT_COLORS.PRIMARY_BUTTON.BACKGROUND
                    : COMPONENT_COLORS.PRIMARY_BUTTON.TEXT
              }
            />
          </View>
        )}

        <Animated.Text style={[textStyle, {color: animatedTextColor}]}>
          {label}
        </Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default memo(BaseButton);
