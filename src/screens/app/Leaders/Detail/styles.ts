import {StyleSheet} from 'react-native';
import {
  BORDER_WIDTH,
  FONT_SIZES,
  LINE_HEIGHTS,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../../constants/dimensions';
import {
  BORDER_COLORS,
  COLORS,
  COMPONENT_COLORS,
} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    gap: SPACING.XXXL,
    paddingBottom: SPACING.XXL,
  },
  cardContainer: {
    gap: scaleSize(17),
  },
  cardWrapper: {
    gap: SPACING.XS,
  },
  headerTitleContainer: {
    gap: SPACING.XS,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitleText: {
    fontSize: FONT_SIZES.XXL,
    lineHeight: LINE_HEIGHTS.XXXL,
    letterSpacing: scaleFont(-0.5),
    color: COLORS.WHITE,
  },
  cardHeaderLeftContainer: {
    gap: scaleSize(5),
    marginTop: SPACING.SM,
  },
  cardHeaderLeftTitle: {
    color: '#676A6F',
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXS,
    lineHeight: scaleFont(13),
    letterSpacing: scaleFont(-0.22),
  },
  cardHeaderLeftText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.SM,
    lineHeight: scaleFont(19),
    letterSpacing: scaleFont(-0.3),
    color: COLORS.WHITE,
  },
  cardHeaderRightContainer: {
    gap: scaleSize(2),
    marginTop: SPACING.SM,
    alignItems: 'flex-end',
  },
  cardHeaderRightTitle: {
    color: COLORS.WHITE,
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXL,
    lineHeight: LINE_HEIGHTS.XXXL,
    letterSpacing: scaleFont(-0.5),
  },
  textSuccess: {
    color: '#15FA18',
  },
});
