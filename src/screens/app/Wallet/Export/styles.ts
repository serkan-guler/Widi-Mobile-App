import {StyleSheet} from 'react-native';
import {
  BORDER_RADIUS,
  FONT_SIZES,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../../constants/dimensions';
import {CARD_COLORS, COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.MD_LG,
  },
  notificationContainer: {
    marginTop: scaleSize(43),
    marginBottom: scaleSize(18),
    marginRight: 'auto',
  },
  cardContainer: {
    borderRadius: BORDER_RADIUS.XXL,
    backgroundColor: CARD_COLORS.BACKGROUND,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scaleSize(14),
    paddingLeft: scaleSize(19),
    paddingRight: scaleSize(14),
  },
  cardLeftContainer: {
    gap: SPACING.MD_LG,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(5),
  },
  titleText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XS,
    lineHeight: scaleFont(17),
    letterSpacing: scaleFont(-0.26),
    color: '#676A6F',
  },
  titleLeftText: {
    color: '#676A6F',
  },
  titleRightText: {
    color: COLORS.WHITE,
  },
  cardCopyButton: {
    borderRadius: scaleSize(17),
    backgroundColor: COLORS.DARK,
    paddingHorizontal: scaleSize(11),
    paddingVertical: SPACING.MD_LG,
  },
  cardCopyButtonText: {
    fontFamily: FONTS.REGULAR,
    fontSize: scaleFont(14),
    lineHeight: scaleFont(16),
    letterSpacing: scaleFont(-0.14),
    color: COLORS.PRIMARY,
  },
  copyButton: {
    paddingTop: scaleSize(28),
    paddingBottom: scaleSize(27),
    backgroundColor: COLORS.PRIMARY,
    borderRadius: BORDER_RADIUS.XXXL,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.SM,
  },
  copyText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(17),
    lineHeight: scaleFont(21),
    letterSpacing: scaleFont(-0.17),
    color: COLORS.DARK,
  },
});
