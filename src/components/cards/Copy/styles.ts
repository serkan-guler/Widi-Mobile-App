import {StyleSheet} from 'react-native';
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  FONT_SIZES,
  LINE_HEIGHTS,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../constants/dimensions';
import {
  COLORS,
  CARD_COLORS,
  NOTIFICATION,
  BORDER_COLORS,
} from '../../../constants/colors';
import {FONTS} from '../../../constants/fonts';

export default StyleSheet.create({
  fontMedium: {
    fontFamily: FONTS.MEDIUM,
  },
  fontNeue: {
    fontFamily: FONTS.NEUE,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: SPACING.SM,
    gap: SPACING.SM,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: CARD_COLORS.BACKGROUND,
    borderRadius: BORDER_RADIUS.XXL,
  },
  imgContainer: {
    backgroundColor: NOTIFICATION.DANGER.BACKGROUND,
    borderRadius: SPACING.SM,
    width: scaleSize(50),
    height: scaleSize(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: scaleSize(32),
    height: scaleSize(26),
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.WHITE,
    fontFamily: FONTS.REGULAR,
    fontSize: scaleFont(14),
    lineHeight: scaleFont(24),
    maxWidth: scaleSize(154),
  },
  buttonText: {
    color: COLORS.DANGER,
    borderWidth: BORDER_WIDTH.THIN,
    borderColor: '#0A090B',
    paddingHorizontal: scaleSize(15),
    paddingTop: SPACING.SM,
    paddingBottom: scaleSize(10),
    borderRadius: scaleSize(13),
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.XXS,
    lineHeight: scaleFont(12),
  },
  copiedLeftContainer: {
    gap: scaleSize(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  copiedLeftImage: {
    width: scaleSize(39),
    height: scaleSize(39),
    borderRadius: BORDER_RADIUS.XL,
  },
  copiedLeftText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(14),
    lineHeight: scaleFont(34),
    color: COLORS.WHITE,
  },
  copiedContentRightContainer: {
    alignItems: 'flex-end',
  },
  copiedContentRightTitle: {
    color: '#15FA18',
    fontSize: scaleFont(25),
    lineHeight: scaleFont(31),
    letterSpacing: scaleFont(-0.5),
  },
  copiedContentRightDesc: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXS,
    lineHeight: scaleFont(13),
    color: '#676A6F',
  },
  cardHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.XS,
  },
  cardHeader: {
    paddingVertical: scaleSize(14),
    paddingHorizontal: scaleSize(18),
    borderRadius: scaleSize(18),
    borderColor: BORDER_COLORS.LIGHT,
    borderWidth: BORDER_WIDTH.DEFAULT,
    flex: 1,
    backgroundColor: COLORS.TERTIARY,
    gap: SPACING.XS,
  },
  headerTitle: {
    fontFamily: FONTS.MEDIUM,
    color: '#676A6F',
    fontSize: scaleFont(14),
    lineHeight: LINE_HEIGHTS.SM,
    letterSpacing: scaleFont(-0.28),
  },
  headerText: {
    fontFamily: FONTS.MEDIUM,
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.XXL,
    lineHeight: LINE_HEIGHTS.XXXL,
    letterSpacing: scaleFont(-0.5),
  },
  headerTextSolid: {
    color: '#676A6F',
  },
});
