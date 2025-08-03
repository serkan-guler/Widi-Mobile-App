import {StyleSheet} from 'react-native';
import {FONTS} from '../../../../constants/fonts';
import {
  FONT_SIZES,
  LINE_HEIGHTS,
  SPACING,
} from '../../../../constants/dimensions';
import {COLORS} from '../../../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    gap: SPACING.MD,
  },
  languageButton: {
    marginVertical: SPACING.SM,
  },
  text: {
    fontFamily: FONTS.ULTRABOLD,
    fontSize: FONT_SIZES.XL,
    lineHeight: LINE_HEIGHTS.XL,
    color: COLORS.WHITE,
  },
});
