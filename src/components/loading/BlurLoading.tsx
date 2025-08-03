import {memo} from 'react';
import styles from './styles';
import {ActivityIndicator, View} from 'react-native';
import {BlurView, BlurViewProps} from '@react-native-community/blur';
import {COLORS} from '../../constants/colors';

const BlurLoading = (props: BlurViewProps) => {
  return (
    <View style={[styles.absolute, styles.absoluteTop]}>
      <BlurView
        style={styles.absolute}
        blurType="dark"
        blurAmount={5}
        reducedTransparencyFallbackColor="black"
        {...props}
      />
      <ActivityIndicator
        size="large"
        color={COLORS.PRIMARY}
        style={styles.indicator}
      />
    </View>
  );
};

export default memo(BlurLoading);
