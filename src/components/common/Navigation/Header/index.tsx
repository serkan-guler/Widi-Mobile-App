import {
  LayoutChangeEvent,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import styles from './styles';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../../../../constants/colors';
import {Logo} from '../../../../assets/logos';
import {scaleSize} from '../../../../constants/dimensions';
import {RouteMergeIcon} from '../../../../assets/icons';
import {ReactNode, useMemo} from 'react';

/*
Burası base bir component olacak. Right ve left button'ları tanımlanacak.
Çünkü stack header'ı NativeStackHeaderProps ile kullanıyoruz.
Bottom tab header' i ise BottomTabHeaderProps ile kullanılıyor.
Bu component, header'ı özelleştirmek için kullanılacak.
*/

type Props = {
  showLogo?: boolean;
  title?: string;
  onPressBack?: () => void;
  trailing?: ReactNode;
  onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
  paddingTop?: number;
};

const Header = ({
  showLogo,
  onPressBack,
  title,
  trailing,
  onLayout,
  paddingTop,
}: Props) => {
  // const insets = useSafeAreaInsets();

  if (!showLogo && !title && !onPressBack) {
    return null;
  }

  const size = scaleSize(35);
  const width = size > 60 ? 60 : size;
  const radius = size > 60 ? 14 : scaleSize(9);
  const iconWidth = size > 60 ? 30 : scaleSize(21);
  const iconHeight = scaleSize(15);

  const style = useMemo(() => {
    const containerStyles: ViewStyle[] = [styles.container];
    if (paddingTop) {
      containerStyles.push({paddingTop: scaleSize(paddingTop)});
    }
    return containerStyles;
  }, [paddingTop]);

  return (
    <View onLayout={onLayout} style={style}>
      {onPressBack && (
        <TouchableOpacity
          style={[
            styles.backButton,
            {width, height: width, borderRadius: radius},
          ]}
          onPress={onPressBack}>
          <RouteMergeIcon
            color={COLORS.WHITE}
            width={iconWidth}
            height={iconHeight}
          />
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {showLogo && !title && (
        <Logo
          color={COLORS.DANGER}
          width={scaleSize(49)}
          height={scaleSize(44)}
        />
      )}
      {trailing && <View style={styles.trailingContainer}>{trailing}</View>}
    </View>
  );
};

export default Header;
