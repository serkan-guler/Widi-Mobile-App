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
import {BORDER_COLORS, CARD_COLORS, COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingHorizontal: SPACING.MD_LG,
  },
  container: {
    flex: 1,
  },
  scanContainer: {
    width: scaleSize(44),
    height: scaleSize(44),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CARD_COLORS.BACKGROUND,
    borderRadius: BORDER_RADIUS.XL,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
  },
  inputContainer: {
    marginVertical: scaleSize(14),
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputToText: {
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.MD,
    lineHeight: scaleFont(19),
    letterSpacing: scaleFont(-0.17),
    color: COLORS.PRIMARY,
    position: 'absolute',
    left: scaleSize(23),
    top: scaleSize(23.65),
    pointerEvents: 'none',
    zIndex: 1,
  },
  input: {
    backgroundColor: CARD_COLORS.BACKGROUND,
    paddingTop: scaleSize(25),
    paddingBottom: scaleSize(21),
    borderRadius: BORDER_RADIUS.XXL,
    width: '100%',
    color: COLORS.WHITE,
    fontFamily: FONTS.REGULAR,
    fontSize: scaleFont(14),
    paddingRight: scaleSize(23),
  },
  pasteButton: {
    marginBottom: scaleSize(25),
    paddingTop: scaleSize(23),
    paddingBottom: scaleSize(25),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: '#B4F903',
    borderRadius: scaleSize(14),
  },
  pasteButtonText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXS,
    lineHeight: LINE_HEIGHTS.XXS,
    color: COLORS.PRIMARY,
  },
  recentContainer: {
    marginTop: scaleFont(13),
    gap: scaleSize(11),
  },
  nextContainer: {
    paddingBottom: SPACING.PAGE_BOTTOM,
    paddingTop: SPACING.LG,
  },
  notificationContainer: {
    marginBottom: scaleSize(14),
  },
});
