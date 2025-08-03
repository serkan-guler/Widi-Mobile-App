import {memo, useEffect, useRef, useState} from 'react';
import styles from './styles';
import {Animated, Easing, TouchableOpacity} from 'react-native';
import {
  TabCopyIcon,
  TabHomeIcon,
  TabPortfolioIcon,
  TabProfileIcon,
  TabWalletIcon,
  TokenStackIcon,
} from '../../../../assets/icons';
import {useTranslation} from 'react-i18next';
import {NavigationHelpers, ParamListBase} from '@react-navigation/native';
import {BottomTabNavigationEventMap} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from '../../../../types';
import {Logo} from '../../../../assets/logos';
import {SvgProps} from 'react-native-svg';
import {COLORS} from '../../../../constants/colors';
import {FONT_SIZES, scaleSize, SPACING} from '../../../../constants/dimensions';

type Props = {
  type: keyof MainTabParamList;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  isActive: boolean;
};

type IconProps = {
  type: keyof MainTabParamList;
} & SvgProps;

const Icon = ({type, ...svgProps}: IconProps) => {
  const Component =
    type === 'Leader'
      ? Logo
      : type === 'Token'
        ? TokenStackIcon
        : type === 'Wallet'
          ? TabWalletIcon
          : type === 'Copied'
            ? TabCopyIcon
            : type === 'Profile'
              ? TabProfileIcon
              : type === 'Portfolio'
                ? TabPortfolioIcon
                : Logo;

  return <Component {...svgProps} />;
};

const Button = (props: Props) => {
  const {type, isActive, navigation} = props;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateX = useRef(new Animated.Value(-10)).current;
  const {t} = useTranslation('navigation');

  const [expanded, setExpanded] = useState<boolean>(isActive);

  useEffect(() => {
    setExpanded(isActive);
  }, [isActive]);

  const toggleText = () => {
    if (expanded) {
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateX, {
          toValue: -10,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => setExpanded(false));
    } else {
      setExpanded(true);
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateX, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
      ]).start();
    }

    navigation.navigate(type);
  };

  const size = SPACING.MD_LG;
  const iconSize = size > 36 ? 36 : size;
  const textSize = FONT_SIZES.SM > 24 ? 24 : FONT_SIZES.SM;
  const paddingTop = scaleSize(10) > 16 ? 16 : scaleSize(10);
  const padding = SPACING.SM > 18 ? 18 : SPACING.SM;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          paddingTop: paddingTop,
          paddingBottom: padding,
          paddingHorizontal: padding,
        },
        isActive && styles.active,
      ]}
      onPress={toggleText}>
      <Icon
        {...props}
        width={iconSize}
        height={iconSize}
        color={isActive ? COLORS.PRIMARY : COLORS.QUATERNARY}
      />
      {expanded && (
        <Animated.Text
          style={[
            styles.buttonText,
            {fontSize: textSize, lineHeight: textSize + 4},
          ]}>
          {t(type.toLowerCase())}
        </Animated.Text>
      )}
    </TouchableOpacity>
  );
};

export default memo(Button);
