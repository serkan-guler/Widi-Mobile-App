import {StyleSheet} from 'react-native';
import {
  FONT_SIZES,
  LINE_HEIGHTS,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../../constants/dimensions';
import {FONTS} from '../../../../constants/fonts';
import {COLORS} from '../../../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    gap: scaleSize(21),
    backgroundColor: COLORS.DARK,
  },
  paddingWrapper: {
    paddingHorizontal: SPACING.MD_LG,
  },
  tabContainer: {
    flex: 1,
    marginTop: scaleSize(7),
  },
  emptyTab: {
    marginVertical: SPACING.MD_LG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXXL,
    lineHeight: scaleFont(40),
    color: COLORS.GRAY,
    textAlign: 'center',
  },
  tabContentWrapper: {
    gap: SPACING.MD,
  },
});
