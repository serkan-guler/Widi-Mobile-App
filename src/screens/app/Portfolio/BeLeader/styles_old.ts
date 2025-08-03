import {StyleSheet} from 'react-native';
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  FONT_SIZES,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../../constants/dimensions';
import {FONTS} from '../../../../constants/fonts';
import {BORDER_COLORS, COLORS} from '../../../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: SPACING.PAGE_BOTTOM,
    marginTop: scaleSize(18),
  },
  scrollContainer: {
    paddingHorizontal: SPACING.MD,
  },
  flex: {
    flex: 1,
  },
  selectContainer: {
    gap: SPACING.SM,
    marginTop: scaleSize(40),
    marginBottom: scaleSize(50),
  },
  selectWrapper: {
    marginBottom: scaleSize(6),
  },
  formContainer: {
    gap: SPACING.XXXL,
  },
  formWrapper: {
    gap: scaleSize(10),
  },
  trailingText: {
    fontSize: scaleFont(14),
    lineHeight: scaleFont(18),
    letterSpacing: scaleFont(-0.14),
    fontFamily: FONTS.REGULAR,
  },
  trailingPrimaryText: {
    color: COLORS.PRIMARY,
  },
  trailingBaseText: {
    color: COLORS.WHITE,
  },
  availableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaleSize(11),
    paddingHorizontal: scaleSize(16),
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.SECONDARY,
    borderRadius: scaleSize(17),
    marginRight: 'auto',
  },
  availableText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(14),
    lineHeight: scaleFont(18),
  },
  availableTextSolid: {
    color: '#676A6F',
  },
  availableTextWhite: {
    color: COLORS.WHITE,
  },
  descriptionText: {
    color: COLORS.GRAY,
    fontSize: FONT_SIZES.XS,
    lineHeight: scaleFont(17),
    fontFamily: FONTS.REGULAR,
    marginTop: scaleSize(5),
    textAlign: 'justify',
  },
  lockPeriodContainer: {
    marginVertical: SPACING.XS,
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(11),
  },
  lockPeriodButton: {
    paddingVertical: scaleSize(14),
    paddingHorizontal: scaleSize(20),
    borderRadius: scaleSize(14),
    borderWidth: BORDER_WIDTH.DEFAULT,
  },
  lockPeriodButtonBase: {
    borderColor: BORDER_COLORS.TERTIARY,
  },
  lockPeriodButtonSelected: {
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.PRIMARY,
  },
  lockPeriodText: {
    fontSize: scaleFont(14),
    lineHeight: scaleFont(18),
    fontFamily: FONTS.MEDIUM,
  },
  lockPeriodTextBase: {
    color: COLORS.WHITE,
  },
  lockPeriodTextSelected: {
    color: COLORS.DARK,
  },
  infoContainer: {
    gap: scaleSize(18),
    marginTop: scaleSize(40),
    marginBottom: scaleSize(30),
  },
  infoCardWrapper: {
    gap: SPACING.SM,
  },
  infoCard: {
    backgroundColor: COLORS.TERTIARY,
    paddingVertical: scaleSize(21),
    paddingHorizontal: scaleSize(17),
    borderRadius: BORDER_RADIUS.XXL,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
    gap: scaleSize(20),
    minHeight: scaleSize(90),
  },
  infoText: {
    color: '#9F9F9F',
  },
  buttonContainer: {
    gap: SPACING.MD,
    marginTop: 'auto',
  },
  errorWrapper: {
    marginRight: 'auto',
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
  createCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(14),
  },
  copyCodeButton: {
    borderRadius: scaleSize(14),
    backgroundColor: COLORS.DARK,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.SECONDARY,
    paddingVertical: scaleSize(7),
    paddingHorizontal: scaleSize(14),
  },
  copyCodeText: {
    fontFamily: FONTS.REGULAR,
    fontSize: scaleFont(14),
    lineHeight: scaleFont(18),
    letterSpacing: scaleFont(-0.14),
    color: COLORS.PRIMARY,
  },
});
