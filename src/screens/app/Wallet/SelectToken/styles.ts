import {StyleSheet} from 'react-native';
import {
  BORDER_RADIUS,
  FONT_SIZES,
  LINE_HEIGHTS,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../../constants/dimensions';
import {CARD_COLORS, COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';

export default StyleSheet.create({
  searchContainer: {
    marginBottom: SPACING.MD_LG,
  },
  input: {
    borderRadius: BORDER_RADIUS.XXL,
    backgroundColor: CARD_COLORS.BACKGROUND,
    paddingTop: scaleSize(23),
    paddingBottom: scaleSize(21),
    paddingHorizontal: scaleSize(11),
    fontFamily: FONTS.REGULAR,
    fontSize: scaleFont(14),
    color: COLORS.WHITE,
  },
  emptyContainer: {
    paddingVertical: SPACING.XL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: FONT_SIZES.XXL,
    lineHeight: LINE_HEIGHTS.XXL,
    fontFamily: FONTS.REGULAR,
    color: COLORS.GRAY,
    textAlign: 'center',
  },
});
