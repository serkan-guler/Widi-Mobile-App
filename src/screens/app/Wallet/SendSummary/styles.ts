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
  BORDER_COLORS,
  CARD_COLORS,
  COLORS,
  COMPONENT_COLORS,
} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingHorizontal: SPACING.MD_LG,
  },
  container: {
    justifyContent: 'space-between',
  },
  topContainer: {},
  bottomContainer: {
    marginTop: SPACING.PAGE_BOTTOM,
    paddingBottom: SPACING.PAGE_BOTTOM,
  },
  mainCard: {
    position: 'relative',
    borderTopWidth: BORDER_WIDTH.DEFAULT,
    borderLeftWidth: BORDER_WIDTH.DEFAULT,
    borderRightWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
    backgroundColor: COMPONENT_COLORS.BUTTON.BACKGROUND,
    borderRadius: BORDER_RADIUS.XXL,
    alignItems: 'center',
    paddingTop: scaleSize(45),
    marginTop: scaleSize(70),
    flex: 1,
  },
  imageSize: {
    width: scaleSize(62),
    height: scaleSize(62),
  },
  imageContainer: {
    position: 'absolute',
    top: -scaleSize(31),
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: COLORS.DARK,
    borderRadius: scaleSize(21),
    overflow: 'hidden',
  },
  solanaImage: {
    backgroundColor: '#252F6A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountContainer: {
    marginTop: scaleSize(17),
    marginBottom: scaleSize(33),
    gap: scaleSize(17),
    alignItems: 'center',
  },
  mintAmountContainer: {
    gap: scaleSize(7),
    alignItems: 'center',
  },
  mintAmountText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(35),
    lineHeight: scaleFont(45),
    letterSpacing: scaleFont(-0.7),
    color: COLORS.WHITE,
  },
  routeRotate: {
    transform: [{rotate: '-90deg'}],
  },
  mintAmountUsdText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(20),
    lineHeight: scaleFont(25),
    letterSpacing: scaleFont(-0.4),
    color: COLORS.WHITE,
  },
  detailCard: {
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.DEFAULT,
    backgroundColor: COLORS.TERTIARY,
    borderRadius: BORDER_RADIUS.XXL,
    width: '100%',
    paddingHorizontal: SPACING.LG,
    paddingTop: scaleSize(31),
    paddingBottom: scaleSize(28),
    gap: scaleSize(29),
  },
  itemContainer: {
    gap: scaleSize(10),
  },
  itemTitle: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(14),
    lineHeight: LINE_HEIGHTS.SM,
    color: '#676A6F',
  },
  itemText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(20),
    lineHeight: scaleFont(25),
    letterSpacing: scaleFont(-0.4),
  },
  itemTextDefault: {
    color: COLORS.WHITE,
  },
  itemTextSuccess: {
    color: '#13FA19',
  },
  itemTextDanger: {
    color: COLORS.DANGER,
  },
  slideButton: {
    position: 'relative',
    backgroundColor: CARD_COLORS.BACKGROUND,
    borderRadius: scaleSize(36),
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
    height: scaleSize(76),
    paddingVertical: scaleSize(5),
    paddingHorizontal: scaleSize(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideCircleButton: {
    width: scaleSize(66),
    height: scaleSize(66),
    borderRadius: scaleSize(33),
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 'auto',
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: CARD_COLORS.BACKGROUND,
  },
  buttonSendText: {
    fontFamily: FONTS.ULTRABOLD,
    fontSize: FONT_SIZES.MD,
    lineHeight: scaleFont(21),
    color: COLORS.PRIMARY,
    position: 'absolute',
  },
  txResponseTopContentContainer: {
    marginBottom: -scaleSize(40),
  },
  txResponseContainer: {
    width: '100%',
    gap: scaleSize(29),
    marginTop: -SPACING.XXXL,
  },
});
