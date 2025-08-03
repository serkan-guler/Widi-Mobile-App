import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';
import {FONTS} from '../../constants/fonts';
import {
  FONT_SIZES,
  LINE_HEIGHTS,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../constants/dimensions';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: SPACING.PAGE_BOTTOM,
  },
  divider: {
    width: scaleSize(31),
    height: scaleSize(5),
    backgroundColor: COLORS.PRIMARY,
    borderRadius: SPACING.XXS,
  },
  titleOne: {
    fontFamily: FONTS.ULTRABOLD,
    fontSize: FONT_SIZES.XXXL,
    lineHeight: LINE_HEIGHTS.XXXL,
    color: COLORS.WHITE,
    textAlign: 'center',
    marginTop: scaleSize(26),
  },
  maxWidth: {
    maxWidth: scaleSize(246),
  },
  textSecondaryOne: {
    fontSize: FONT_SIZES.SM,
    lineHeight: LINE_HEIGHTS.LG,
    fontFamily: FONTS.REGULAR,
    color: COLORS.SECONDARY,
    textAlign: 'center',
    marginTop: SPACING.MD_LG,
  },
  secondaryPadding: {
    paddingHorizontal: SPACING.LG,
  },
  buttonContainer: {
    marginTop: scaleSize(38),
    width: '100%',
    gap: SPACING.XXL,
  },
  termsContainer: {
    width: scaleSize(246),
    marginTop: SPACING.MD_LG,
  },
  termsText: {
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.XXS,
    lineHeight: scaleFont(15),
    color: COLORS.SECONDARY,
    textAlign: 'center',
  },
  linkText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.ULTRABOLD,
  },
});
