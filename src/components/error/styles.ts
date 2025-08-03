import {StyleSheet} from 'react-native';
import {FONTS} from '../../constants/fonts';
import {
  BORDER_RADIUS,
  FONT_SIZES,
  scaleFont,
  SPACING,
} from '../../constants/dimensions';
import {COLORS, NOTIFICATION} from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DARK,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.LG,
  },
  title: {
    fontFamily: FONTS.ULTRABOLD,
    fontSize: scaleFont(40),
    textAlign: 'center',
    color: COLORS.DANGER,
  },
  description: {
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.XXL,
    textAlign: 'center',
    color: COLORS.WHITE,
  },
  message: {
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.LG,
    textAlign: 'center',
    color: COLORS.WHITE,
    marginTop: SPACING.MD,
  },
  button: {
    paddingHorizontal: SPACING.XXL,
    paddingVertical: SPACING.MD,
    borderRadius: BORDER_RADIUS.LG,
    backgroundColor: NOTIFICATION.DANGER.BACKGROUND,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.MD_LG,
  },
  text: {
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.LG,
    textAlign: 'center',
    color: NOTIFICATION.DANGER.TEXT,
  },
});
