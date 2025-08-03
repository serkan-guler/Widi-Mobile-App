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
import {BORDER_COLORS, COLORS} from '../../../constants/colors';
import {FONTS} from '../../../constants/fonts';

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    justifyContent: 'space-between',
  },
  contentContainer: {
    paddingHorizontal: SPACING.MD_LG,
  },
  buttonContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    paddingTop: SPACING.MD,
    paddingBottom: SPACING.PAGE_BOTTOM,
    gap: scaleSize(15),
    position: 'relative',
    paddingHorizontal: SPACING.MD_LG,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  button: {
    paddingTop: scaleSize(28),
    paddingBottom: scaleSize(27),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderRadius: BORDER_RADIUS.XXXL,
  },
  buttonDisabled: {
    borderColor: BORDER_COLORS.DEFAULT,
    backgroundColor: COLORS.TERTIARY,
  },
  buttonActive: {
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.PRIMARY,
  },
  buttonText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.MD,
    lineHeight: LINE_HEIGHTS.LG,
    letterSpacing: scaleFont(-0.17),
  },
  buttonDisabledText: {
    color: '#638900',
  },
  buttonActiveText: {
    color: COLORS.DARK,
  },
  titleText: {
    marginTop: scaleSize(54),
    fontFamily: FONTS.ULTRABOLD,
    fontSize: scaleFont(27),
    lineHeight: scaleFont(32),
    color: COLORS.WHITE,
  },
  inputContainer: {
    marginTop: scaleSize(15),
    gap: scaleSize(18),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.XS,
  },
  input: {
    borderRadius: BORDER_RADIUS.XXXL,
    backgroundColor: COLORS.TERTIARY,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.DEFAULT,
    flex: 1,
    paddingVertical: SPACING.MD_LG,
    paddingHorizontal: SPACING.MD,
    fontSize: FONT_SIZES.MD,
  },
  inputSecondary: {
    color: COLORS.SECONDARY,
  },
  inputPrimary: {
    color: COLORS.WHITE,
  },
  copyButton: {
    borderRadius: BORDER_RADIUS.XXXL,
    backgroundColor: COLORS.PRIMARY,
    flexShrink: 0,
    width: scaleSize(106),
    paddingTop: SPACING.LG,
    paddingBottom: scaleSize(19),
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXS,
    lineHeight: scaleFont(15),
  },
  checkBoxTextSolid: {
    color: '#989898',
  },
  checkBoxTextWhite: {
    color: COLORS.WHITE,
  },
  // container: {
  //   gap: SPACING.MD_LG,
  // },
  // inputContainer: {
  //   borderRadius: SPACING.SM,
  //   padding: SPACING.MD,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   borderWidth: BORDER_WIDTH.DEFAULT,
  //   borderColor: BORDER_COLORS.LIGHT,
  // },
  // copyButton: {
  //   borderRadius: SPACING.SM,
  //   padding: SPACING.SM,
  //   backgroundColor: COLORS.PRIMARY,
  //   flexShrink: 0,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // copyText: {
  //   color: COLORS.DARK,
  //   fontSize: FONT_SIZES.MD,
  //   lineHeight: LINE_HEIGHTS.LG,
  //   fontFamily: FONTS.MEDIUM,
  // },
  // recoveryCode: {
  //   fontSize: FONT_SIZES.XXS,
  //   color: COLORS.WHITE,
  //   fontFamily: FONTS.REGULAR,
  //   maxWidth: '75%',
  // },
});
