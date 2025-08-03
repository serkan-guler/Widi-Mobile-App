import {StyleSheet} from 'react-native';
import {BORDER_COLORS, CARD_COLORS, COLORS} from '../../../constants/colors';
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  FONT_SIZES,
  LINE_HEIGHTS,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../constants/dimensions';
import {FONTS} from '../../../constants/fonts';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.TERTIARY,
    borderRadius: scaleSize(13),
    paddingVertical: scaleSize(7),
    paddingLeft: SPACING.XS,
    paddingRight: SPACING.XXXL,
    gap: scaleSize(5),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
  },
  widiContainer: {
    width: scaleSize(35),
    height: scaleSize(35),
    borderRadius: BORDER_RADIUS.LG,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
    backgroundColor: CARD_COLORS.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendingToText: {
    color: '#676A6F',
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXS,
    lineHeight: scaleFont(13),
    letterSpacing: scaleFont(-0.22),
  },
  sendingToAddressText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(12),
    lineHeight: LINE_HEIGHTS.XXS,
    letterSpacing: scaleFont(0.24),
  },
});
