import {StyleSheet} from 'react-native';
import {scaleSize, SPACING} from '../../../../constants/dimensions';
import {COLORS} from '../../../../constants/colors';

export default StyleSheet.create({
  scrollLayout: {
    backgroundColor: COLORS.DARK,
    paddingHorizontal: SPACING.MD_LG,
  },
  layout: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  wrapper: {
    flex: 1,
    gap: scaleSize(80),
  },
  formGroup: {
    gap: scaleSize(20),
  },
  formControl: {
    gap: scaleSize(10),
  },
  notificationContainer: {
    marginRight: scaleSize(62),
    marginTop: scaleSize(5),
  },
  buttonContainer: {
    marginTop: SPACING.XXXL,
  },
});
