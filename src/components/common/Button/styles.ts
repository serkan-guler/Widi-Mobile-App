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
  BORDER_COLORS,
  CARD_COLORS,
  COLORS,
  COMPONENT_COLORS,
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
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallContainer: {
    borderRadius: scaleSize(13),
  },
  mediumContainer: {
    borderRadius: scaleSize(20),
  },
  largeContainer: {
    borderRadius: BORDER_RADIUS.XXXL,
  },
  smallButton: {
    paddingVertical: scaleSize(10),
    paddingHorizontal: SPACING.MD,
  },
  mediumButton: {
    paddingVertical: scaleSize(24),
    paddingHorizontal: scaleSize(30),
  },
  largeButton: {
    paddingVertical: SPACING.XXL,
    paddingHorizontal: scaleSize(40),
  },
  primaryContainer: {
    backgroundColor: COMPONENT_COLORS.PRIMARY_BUTTON.BACKGROUND,
  },
  secondaryContainer: {
    backgroundColor: COLORS.TERTIARY,
  },
  dangerContainer: {
    backgroundColor: '#E70806',
  },
  wFull: {
    width: '100%',
  },
  leadingIconContainer: {},
  largeLeadingRight: {
    marginRight: scaleSize(22),
  },
  leadingIcon: {},
  disabledPrimaryButton: {
    backgroundColor: COMPONENT_COLORS.PRIMARY_BUTTON.DISABLED,
  },
  disabledSecondaryButton: {
    backgroundColor: COLORS.QUATERNARY,
  },
  disabledDangerButton: {
    backgroundColor: '#411918',
  },
  disabledPrimaryText: {
    color: COMPONENT_COLORS.PRIMARY_BUTTON.BACKGROUND,
  },
  disabledDangerText: {
    color: COLORS.DANGER,
  },
  text: {
    textAlign: 'center',
  },
  textSmall: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XS,
    lineHeight: scaleFont(17),
  },
  textMedium: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.MD,
    lineHeight: LINE_HEIGHTS.LG,
  },
  textLarge: {
    fontFamily: FONTS.ULTRABOLD,
    fontSize: FONT_SIZES.MD,
    lineHeight: LINE_HEIGHTS.LG,
  },
  primaryText: {
    color: COMPONENT_COLORS.PRIMARY_BUTTON.TEXT,
  },
  secondaryText: {
    color: COLORS.WHITE,
  },
  iconContainer: {
    borderWidth: CARD_COLORS.BORDER_WIDTH,
    borderColor: CARD_COLORS.BORDER,
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.SM,
  },
  bgDefault: {
    backgroundColor: CARD_COLORS.BACKGROUND,
  },
  bgDark: {
    backgroundColor: COLORS.DARK,
  },
  sortButtonContainer: {
    paddingVertical: scaleSize(10),
    paddingHorizontal: scaleSize(15),
    gap: scaleSize(9),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.SECONDARY,
    borderRadius: scaleSize(17),
  },
  sortLabel: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXS,
    lineHeight: LINE_HEIGHTS.XXS,
    color: COLORS.WHITE,
  },
  sortItemButton: {
    backgroundColor: CARD_COLORS.BACKGROUND,
    borderRadius: BORDER_RADIUS.XXL,
    padding: scaleSize(23),
  },
  sortItemText: {
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.MD,
    lineHeight: scaleFont(19),
    letterSpacing: scaleFont(-0.17),
  },
  SortItemTextUnselected: {
    color: COLORS.WHITE,
  },
  sortItemTextSelected: {
    color: COLORS.PRIMARY,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scaleSize(17),
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.SECONDARY,
    backgroundColor: COMPONENT_COLORS.BUTTON.BACKGROUND,
    gap: scaleSize(9),
    padding: SPACING.SM,
    minWidth: scaleSize(70),
  },
  likeText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(12),
    lineHeight: scaleFont(14),
    letterSpacing: scaleFont(-0.24),
    color: COLORS.WHITE,
  },
  disabled: {
    backgroundColor: COLORS.TERTIARY,
  },
  indicatorContainer: {
    position: 'absolute',
    left: SPACING.XXXL,
  },
  touchableContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  percentageButton: {
    width: scaleSize(88),
    height: scaleSize(40),
    borderRadius: scaleSize(14),
    borderWidth: BORDER_WIDTH.THIN,
    borderColor: BORDER_COLORS.TERTIARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    fontSize: scaleFont(14),
    lineHeight: scaleFont(17),
    color: COLORS.WHITE,
  },
});
