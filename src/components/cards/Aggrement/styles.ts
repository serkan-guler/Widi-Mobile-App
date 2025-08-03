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
    gap: SPACING.SM,
  },
  dot: {
    marginLeft: SPACING.XS,
    width: scaleSize(6),
    height: scaleSize(6),
    borderRadius: scaleSize(3),
    backgroundColor: COLORS.PRIMARY,
  },
  title: {
    marginVertical: SPACING.SM,
    fontFamily: FONTS.ULTRABOLD,
    fontSize: scaleFont(27),
    lineHeight: scaleFont(32),
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  itemContainer: {
    gap: SPACING.XXS,
  },
  itemRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.XS,
  },
  itemTitle: {
    fontFamily: FONTS.ULTRABOLD,
    fontSize: FONT_SIZES.XL,
    lineHeight: LINE_HEIGHTS.XXL,
    color: COLORS.PRIMARY,
  },
  itemText: {
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.MD,
    lineHeight: LINE_HEIGHTS.LG,
    color: COLORS.WHITE,
    textAlign: 'justify',
    flexGrow: 0,
    flexShrink: 1,
  },
  itemTextBold: {
    fontFamily: FONTS.ULTRABOLD,
  },
});
