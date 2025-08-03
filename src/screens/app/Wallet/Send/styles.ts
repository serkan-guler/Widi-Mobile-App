import {StyleSheet} from 'react-native';
import {
  BORDER_WIDTH,
  FONT_SIZES,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../../constants/dimensions';
import {BORDER_COLORS, COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.MD_LG,
  },
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.PAGE_BOTTOM,
  },
  inputContainer: {
    width: '100%',
    padding: SPACING.MD,
    borderRadius: SPACING.SM,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.DEFAULT,
    color: COLORS.WHITE,
  },
  topContainer: {
    flex: 1,
  },
  bottomContainer: {
    gap: SPACING.PAGE_BOTTOM,
  },
  touchpadContainer: {
    gap: SPACING.SM,
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: SPACING.MD_LG,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.SM,
  },
  amountContainer: {
    gap: scaleSize(11),
  },
  topAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(8),
  },
  topAmountText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(62),
    lineHeight: scaleFont(77),
    letterSpacing: scaleFont(-1.24),
  },
  topAmountWhite: {
    color: COLORS.WHITE,
  },
  topAmountSymbol: {
    color: '#797979',
  },
  bottomAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scaleSize(11),
  },
  bottomAmountTextContainer: {
    gap: scaleSize(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomAmountText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.LG,
    lineHeight: scaleFont(24),
  },
});
