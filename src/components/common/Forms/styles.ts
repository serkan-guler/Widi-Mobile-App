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
    padding: SPACING.MD_LG,
    borderRadius: BORDER_RADIUS.XXXL,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.DEFAULT,
    color: COLORS.WHITE,
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.MD,
    // lineHeight: LINE_HEIGHTS.LG,
  },
  searchContainer: {
    position: 'relative',
    flexDirection: 'row',
    borderRadius: BORDER_RADIUS.XXL,
    alignItems: 'center',
    backgroundColor: CARD_COLORS.BACKGROUND,
  },
  searchIcon: {
    position: 'absolute',
    left: SPACING.LG,
  },
  searchInput: {
    fontSize: scaleFont(14),
    color: COLORS.WHITE,
    fontFamily: FONTS.REGULAR,
    flex: 1,
    padding: SPACING.LG,
    paddingLeft: scaleSize(52),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.XS,
    paddingVertical: SPACING.XS,
  },
  checkbox: {
    width: scaleSize(18),
    height: scaleSize(18),
    borderRadius: scaleSize(6),
    borderWidth: scaleSize(0.7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxUnselected: {
    borderColor: '#838383',
  },
  checkboxSelected: {
    borderColor: COLORS.PRIMARY,
  },
  checkBoxText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXS,
    lineHeight: scaleFont(15),
    color: COLORS.WHITE,
  },
});
