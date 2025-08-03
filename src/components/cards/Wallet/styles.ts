import {StyleSheet} from 'react-native';
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  FONT_SIZES,
  LINE_HEIGHTS,
  scaleFont,
  scaleSize,
} from '../../../constants/dimensions';
import {FONTS} from '../../../constants/fonts';
import {BORDER_COLORS, CARD_COLORS, COLORS} from '../../../constants/colors';

export default StyleSheet.create({
  titleContainer: {
    gap: scaleSize(7),
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: scaleSize(36),
    height: scaleSize(36),
    borderRadius: BORDER_RADIUS.LG,
  },
  titleTextContainer: {},
  titleName: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(14),
    color: COLORS.WHITE,
  },
  titleMC: {
    color: '#676A6F',
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(11),
    lineHeight: scaleFont(13),
    letterSpacing: scaleFont(-0.33),
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
  },
  contentTextCenter: {
    textAlign: 'center',
  },
  contentTextRight: {
    textAlign: 'right',
  },
  contentTitle: {
    color: '#676A6F',
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXS,
    lineHeight: scaleFont(13),
  },
  contentText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(20),
    lineHeight: scaleFont(25),
    letterSpacing: scaleFont(-0.4),
  },
  contentDescription: {
    color: '#676A6F',
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(14),
    lineHeight: LINE_HEIGHTS.SM,
    letterSpacing: scaleFont(-0.28),
  },
  badgeContainer: {
    borderRadius: scaleSize(13),
    padding: scaleSize(7),
  },
  recentContainer: {
    backgroundColor: COLORS.TERTIARY,
    paddingVertical: scaleSize(12),
    paddingLeft: scaleSize(11),
    paddingRight: scaleSize(14),
    borderRadius: BORDER_RADIUS.XXL,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(9),
  },
  imageSize: {
    width: scaleSize(42),
    height: scaleSize(42),
  },
  recentLogoContainer: {
    backgroundColor: CARD_COLORS.BACKGROUND,
    borderRadius: BORDER_RADIUS.XL,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  recentTextContainer: {
    flex: 1,
    gap: scaleSize(3),
  },
  recentWalletText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(14),
    lineHeight: scaleFont(18),
    letterSpacing: scaleFont(0.28),
    color: COLORS.WHITE,
  },
  recentDateText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(11),
    lineHeight: scaleFont(14),
    letterSpacing: scaleFont(-0.22),
    color: '#676A6F',
  },
  choseContainer: {
    borderRadius: scaleSize(14),
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: COLORS.PRIMARY,
    paddingTop: scaleSize(13),
    paddingBottom: scaleSize(14),
    paddingHorizontal: scaleSize(20),
  },
  choseText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXS,
    lineHeight: LINE_HEIGHTS.XXS,
    color: COLORS.PRIMARY,
  },
});
