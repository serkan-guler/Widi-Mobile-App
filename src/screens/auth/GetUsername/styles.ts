import {StyleSheet} from 'react-native';
import {
  FONT_SIZES,
  LINE_HEIGHTS,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../constants/dimensions';
import {FONTS} from '../../../constants/fonts';
import {COLORS} from '../../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  wrapper: {
    marginTop: SPACING.XL,
    gap: SPACING.XL,
  },
  inputContainer: {
    gap: SPACING.MD,
  },
  title: {
    fontFamily: FONTS.ULTRABOLD,
    fontSize: FONT_SIZES.XXXL,
    lineHeight: LINE_HEIGHTS.XXXL,
    color: COLORS.WHITE,
  },
  description: {
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.SM,
    lineHeight: scaleFont(22),
    width: scaleSize(230),
    color: COLORS.SECONDARY,
  },
  input: {
    marginRight: scaleSize(28),
  },
  notification: {
    marginRight: scaleSize(62),
  },
});
