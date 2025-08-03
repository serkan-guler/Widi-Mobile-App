import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {scaleSize, SPACING} from '../../../constants/dimensions';

export default StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.DARK,
  },
  between: {
    justifyContent: 'space-between',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  padding: {
    paddingHorizontal: SPACING.MD_LG,
    // paddingTop: SPACING.MD,
    paddingBottom: SPACING.PAGE_BOTTOM,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: SPACING.MD,
  },
  gap: {
    gap: scaleSize(9),
  },
});
