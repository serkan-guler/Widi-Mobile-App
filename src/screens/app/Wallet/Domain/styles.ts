import {StyleSheet} from 'react-native';
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  FONT_SIZES,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../../constants/dimensions';
import {BORDER_COLORS, CARD_COLORS, COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapper: {
    width: '100%',
    gap: scaleSize(18),
  },
  brandCard: {
    backgroundColor: CARD_COLORS.BACKGROUND,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.MD,
    paddingVertical: SPACING.XL,
    paddingHorizontal: SPACING.MD,
    borderRadius: BORDER_RADIUS.XXL,
  },
  walletAddress: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXS,
    lineHeight: scaleFont(13),
    letterSpacing: scaleFont(0.22),
    color: COLORS.WHITE,
    overflow: 'hidden',
  },
  inputContainer: {
    marginRight: scaleSize(28),
    marginTop: scaleSize(8),
  },
  notificationContainer: {
    marginRight: 'auto',
  },
  inputStyle: {
    color: COLORS.PRIMARY,
    backgroundColor: COLORS.TERTIARY,
    padding: SPACING.MD_LG,
    borderRadius: BORDER_RADIUS.XXXL,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.DEFAULT,
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.MD,
  },
  snsContainer: {
    gap: scaleSize(4),
    alignItems: 'center',
    flexDirection: 'row',
  },
  snsText: {
    color: COLORS.GRAY,
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.XS,
    lineHeight: scaleFont(17),
  },
});
