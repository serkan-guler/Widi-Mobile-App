import {StyleSheet} from 'react-native';
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  FONT_SIZES,
  LINE_HEIGHTS,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../../constants/dimensions';
import {
  CARD_COLORS,
  COLORS,
  COMPONENT_COLORS,
} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    gap: SPACING.MD,
  },
  filterContainer: {
    gap: SPACING.XXXL,
  },
  filterWrapper: {
    gap: scaleSize(10),
  },
  trailingContainer: {
    backgroundColor: COLORS.DARK,
    borderRadius: scaleSize(13),
    borderWidth: BORDER_WIDTH.THIN,
    borderColor: COMPONENT_COLORS.BUTTON.BORDER,
    paddingVertical: scaleSize(10),
    paddingHorizontal: SPACING.LG,
  },
  trailingText: {
    color: COLORS.DANGER,
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXS,
    lineHeight: LINE_HEIGHTS.XXS,
  },
  input: {
    borderRadius: BORDER_RADIUS.XXL,
    backgroundColor: CARD_COLORS.BACKGROUND,
    paddingVertical: scaleSize(21),
    paddingHorizontal: scaleSize(23),
    fontSize: FONT_SIZES.MD,
    fontFamily: FONTS.REGULAR,
    color: COLORS.PRIMARY,
  },
});
