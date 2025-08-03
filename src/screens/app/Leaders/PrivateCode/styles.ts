import {StyleSheet} from 'react-native';
import {
  BORDER_WIDTH,
  FONT_SIZES,
  LINE_HEIGHTS,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../../constants/dimensions';
import {BORDER_COLORS, COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  inputContainer: {
    gap: SPACING.MD_LG,
    marginTop: SPACING.MD,
  },
  title: {
    fontSize: FONT_SIZES.XXXL,
    lineHeight: LINE_HEIGHTS.XXXL,
    color: COLORS.WHITE,
    fontFamily: FONTS.ULTRABOLD,
  },
  description: {
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.SM,
    lineHeight: scaleFont(22),
    color: COLORS.SECONDARY,
  },
  inputWrapper: {
    position: 'relative',
    marginRight: SPACING.XXL,
    justifyContent: 'center',
  },
  pasteButton: {
    backgroundColor: COLORS.DARK,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.SECONDARY,
    borderRadius: scaleSize(14),
    paddingVertical: scaleSize(7),
    paddingHorizontal: scaleSize(14),
    position: 'absolute',
    right: scaleSize(17),
  },
  pasteText: {
    fontFamily: FONTS.REGULAR,
    fontSize: scaleFont(14),
    lineHeight: scaleFont(18),
    color: COLORS.PRIMARY,
    letterSpacing: -scaleFont(0.14),
  },
  notificationContainer: {
    maxWidth: scaleSize(210),
  },
  submitContainer: {
    gap: SPACING.MD_LG,
  },
});
