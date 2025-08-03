import {StyleSheet} from 'react-native';
import {scaleSize, SPACING} from '../../../../constants/dimensions';

export default StyleSheet.create({
  container: {
    flex: 1,
    gap: SPACING.SM,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(11),
  },
  logoContainer: {
    position: 'relative',
  },
});
