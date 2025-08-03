import {memo} from 'react';
import styles from './styles';
import {View} from 'react-native';
import {SolanaBridgeIcon} from '../../../assets/icons';
import {scaleSize} from '../../../constants/dimensions';

type Props = {
  width?: number;
  height?: number;
  bottom?: number;
  right?: number;
  iconWidth?: number;
  iconHeight?: number;
};

const SolAbsoluteImage = ({
  width,
  height,
  bottom,
  right,
  iconWidth,
  iconHeight,
}: Props) => {
  const w = scaleSize(width || 23);
  const h = scaleSize(height || 23);
  const b = -scaleSize(bottom || 12);
  const r = -scaleSize(right || 12);
  const iconW = iconWidth || 15;
  const iconH = iconHeight || 15;

  return (
    <View
      style={[
        styles.absoluteContainer,
        {width: w, height: h, bottom: b, right: r},
      ]}>
      <SolanaBridgeIcon width={iconW} height={iconH} />
    </View>
  );
};

export default memo(SolAbsoluteImage);
