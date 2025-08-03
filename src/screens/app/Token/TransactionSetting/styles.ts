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
  fontMedium: {
    fontFamily: FONTS.MEDIUM,
  },
  fontNeue: {
    fontFamily: FONTS.NEUE,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.DARK,
    paddingHorizontal: SPACING.MD_LG,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    paddingBottom: SPACING.PAGE_BOTTOM,
    paddingTop: SPACING.MD,
  },
  marginBottom: {
    marginBottom: scaleSize(37),
  },
  slippageContainer: {
    marginTop: scaleSize(26),
  },
  speedContainer: {
    gap: scaleSize(33),
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slippageButtonsContainer: {
    marginTop: scaleSize(19),
    marginBottom: scaleSize(24),
  },
  slippageDescription: {
    marginTop: scaleSize(24),
  },
  button: {
    paddingVertical: scaleSize(13),
    borderRadius: scaleSize(14),
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.TERTIARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: COLORS.PRIMARY,
  },
  percentageWidth: {
    width: scaleSize(70),
  },
  speedButtonWidth: {
    width: scaleSize(88),
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: scaleFont(14),
    lineHeight: scaleFont(17),
  },
  buttonTextDefault: {
    color: COLORS.WHITE,
  },
  buttonTextSelected: {
    color: COLORS.DARK,
  },
  grayText: {
    color: COLORS.GRAY,
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.XS,
    lineHeight: LINE_HEIGHTS.XS,
  },
  inputContainer: {
    position: 'relative',
    marginTop: scaleSize(10),
    marginBottom: SPACING.MD,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderRadius: BORDER_RADIUS.XXL,
    backgroundColor: CARD_COLORS.BACKGROUND,
    paddingTop: SPACING.MD_LG,
    paddingBottom: SPACING.LG,
    paddingLeft: scaleSize(17),
    paddingRight: scaleSize(14),
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(16),
    color: COLORS.WHITE,
    width: '100%',
  },
  trailingText: {
    fontFamily: FONTS.NEUE,
    fontSize: scaleFont(18),
    lineHeight: scaleFont(22),
    letterSpacing: scaleFont(-0.18),
    color: COLORS.PRIMARY,
    position: 'absolute',
    right: scaleSize(14),
  },
});
