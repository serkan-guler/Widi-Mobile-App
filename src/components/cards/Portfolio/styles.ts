import {StyleSheet} from 'react-native';
import {
  BORDER_RADIUS,
  FONT_SIZES,
  LINE_HEIGHTS,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../constants/dimensions';
import {COLORS} from '../../../constants/colors';
import {FONTS} from '../../../constants/fonts';

export default StyleSheet.create({
  container: {
    gap: scaleSize(21),
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.SM,
  },
  userWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SM,
  },
  imageSize: {
    width: scaleSize(54),
    height: scaleSize(54),
    borderRadius: BORDER_RADIUS.XL,
  },
  welcomeText: {
    color: COLORS.GRAY,
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.XS,
    lineHeight: scaleSize(17),
  },
  userNameContainer: {
    gap: SPACING.SM,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXL,
    lineHeight: scaleSize(34),
  },
  userBio: {
    color: COLORS.GRAY,
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.XS,
    lineHeight: scaleSize(17),
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SM,
    paddingVertical: SPACING.XS,
  },
  topHeaderText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.MD,
    lineHeight: LINE_HEIGHTS.LG,
    letterSpacing: scaleFont(-0.17),
    color: COLORS.WHITE,
  },
  headerLeft: {
    gap: scaleSize(5),
  },
  solidText: {
    color: '#676A6F',
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXS,
    lineHeight: scaleFont(13),
    letterSpacing: scaleFont(-0.22),
  },
  textWhite: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.SM,
    lineHeight: scaleFont(19),
    letterSpacing: scaleFont(-0.3),
    color: COLORS.WHITE,
  },
  headerRight: {
    gap: scaleSize(2),
    alignItems: 'flex-end',
  },
  rightTitle: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXL,
    lineHeight: LINE_HEIGHTS.XXXL,
    color: COLORS.WHITE,
    letterSpacing: scaleFont(-0.5),
  },
});
