import {memo} from 'react';
import styles from './styles';
import {Image, ImageProps, View} from 'react-native';
import {SolanaBridgeIcon} from '../../../assets/icons';
import {StatusTypes} from '../../../types';
import {scaleSize} from '../../../constants/dimensions';

type Props = ImageProps & {
  type: StatusTypes;
};

const NotificationImage = ({type, ...props}: Props) => {
  const iconProps = {
    width: scaleSize(4.54),
    height: scaleSize(4.07),
  };

  return (
    <View style={[styles.imageContainer, styles.image]}>
      <Image
        resizeMode="cover"
        {...props}
        style={[styles.imageContainer, styles.image]}
      />
      <View
        style={[
          styles.solContainer,
          styles.solImage,
          styles.solBg,
          type === 'warning'
            ? styles.solBorderWarning
            : type === 'success'
              ? styles.solBorderSuccess
              : styles.solBorderDanger,
        ]}>
        <SolanaBridgeIcon {...iconProps} />
      </View>
    </View>
  );
};

export default memo(NotificationImage);
