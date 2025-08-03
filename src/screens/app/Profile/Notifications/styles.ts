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
import {
  BORDER_COLORS,
  COLORS,
  COMPONENT_COLORS,
} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    gap: scaleSize(21),
    paddingBottom: SPACING.XXXL,
  },
  notificationsContainer: {
    gap: scaleSize(14),
  },
  headerTitleContainer: {
    gap: scaleSize(14),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitleText: {
    fontSize: FONT_SIZES.XXL,
    lineHeight: LINE_HEIGHTS.XXXL,
    letterSpacing: scaleFont(-0.5),
    color: COLORS.WHITE,
  },
  badgeContainer: {
    paddingVertical: scaleSize(7),
    paddingHorizontal: scaleSize(9),
    backgroundColor: COMPONENT_COLORS.BUTTON.BACKGROUND,
    borderColor: BORDER_COLORS.SECONDARY,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderRadius: BORDER_RADIUS.LG,
  },
  badgeText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.MD,
    lineHeight: LINE_HEIGHTS.LG,
    color: COLORS.WHITE,
  },
});
