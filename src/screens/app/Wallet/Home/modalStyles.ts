import {StyleSheet} from 'react-native';
import {BORDER_COLORS, CARD_COLORS, COLORS} from '../../../../constants/colors';
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  FONT_SIZES,
  LINE_HEIGHTS,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../../constants/dimensions';
import {FONTS} from '../../../../constants/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0A0A4F',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  scrollContainer: {
    maxHeight: '80%',
    flex: 1,
    overflow: 'visible',
    // position: 'relative',
  },
  scrollContentContainer: {
    // justifyContent: 'flex-end',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
  },
  overlay: {
    backgroundColor: CARD_COLORS.BACKGROUND,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
    borderRadius: BORDER_RADIUS.XXL,
  },
  headerContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    paddingTop: scaleSize(45),
    alignItems: 'center',
    paddingBottom: scaleSize(33),
  },
  imageWrapper: {
    position: 'absolute',
    top: -scaleSize(31),
    alignItems: 'center',
    justifyContent: 'center',
  },
  solImageContainer: {
    backgroundColor: '#252F6A',
  },
  imageContainer: {
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: COLORS.DARK,
    borderRadius: scaleSize(21),
    overflow: 'hidden',
    width: scaleSize(62),
    height: scaleSize(62),
  },
  contentContainer: {
    borderRadius: BORDER_RADIUS.XXL,
    backgroundColor: COLORS.TERTIARY,
    paddingHorizontal: scaleSize(42),
    paddingTop: scaleSize(32),
    paddingBottom: SPACING.PAGE_BOTTOM,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
  },
  itemWrapper: {
    gap: scaleSize(29),
    marginBottom: scaleSize(47),
  },
  button: {
    borderRadius: BORDER_RADIUS.XXXL,
    paddingVertical: scaleSize(28),
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: COLORS.PRIMARY,
  },
  closeButton: {
    backgroundColor: COLORS.DARK,
  },
  buttonContainer: {
    gap: SPACING.MD,
  },
  buttonText: {
    fontFamily: FONTS.ULTRABOLD,
    fontSize: FONT_SIZES.MD,
    lineHeight: LINE_HEIGHTS.LG,
    letterSpacing: scaleSize(-0.17),
  },
  buttonTextDark: {
    color: COLORS.DARK,
  },
  buttonTextWhite: {
    color: COLORS.WHITE,
  },
  mintAmountText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(35),
    lineHeight: scaleFont(45),
    letterSpacing: scaleFont(-0.7),
    color: COLORS.WHITE,
  },
  routeRotate: {
    marginTop: scaleSize(6),
    marginBottom: scaleSize(16),
    transform: [{rotate: '-90deg'}],
  },
  mintAmountUsdText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(20),
    lineHeight: scaleFont(25),
    letterSpacing: scaleFont(-0.4),
    color: COLORS.WHITE,
  },
});
