import {StyleSheet} from 'react-native';
import {
  BORDER_RADIUS,
  FONT_SIZES,
  LINE_HEIGHTS,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../constants/dimensions';
import {
  COLORS,
  COMPONENT_COLORS,
  NOTIFICATION,
} from '../../../constants/colors';
import {FONTS} from '../../../constants/fonts';

export default StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.XXL,
    padding: SPACING.SM,
  },
  successContainer: {
    backgroundColor: COMPONENT_COLORS.PRIMARY_BUTTON.DISABLED,
  },
  dangerContainer: {
    backgroundColor: NOTIFICATION.DANGER.BACKGROUND,
  },
  text: {
    fontSize: scaleFont(12),
    fontFamily: FONTS.MEDIUM,
    lineHeight: LINE_HEIGHTS.XXS,
    textAlign: 'center',
  },
  successText: {
    color: COLORS.PRIMARY,
  },
  dangerText: {
    color: NOTIFICATION.DANGER.TEXT,
  },
  twoColorWrapper: {
    paddingVertical: scaleSize(10),
    paddingHorizontal: SPACING.SM,
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(8),
    backgroundColor: COLORS.DARK,
    borderRadius: scaleSize(13),
  },
  twoColorText: {
    fontSize: FONT_SIZES.XS,
    lineHeight: scaleFont(17),
    fontFamily: FONTS.MEDIUM,
  },
  titleBase: {
    color: COLORS.WHITE,
  },
  titleSuccess: {
    color: NOTIFICATION.SUCCESS.TEXT,
  },
  titleDanger: {
    color: COLORS.DANGER,
  },
  descriptionBase: {
    color: '#676A6F',
  },
  descriptionSuccess: {
    color: NOTIFICATION.SUCCESS.TEXT,
  },
  descriptionDanger: {
    color: COLORS.DANGER,
  },
  flexEnd: {
    marginLeft: 'auto',
  },
  dayContainer: {
    backgroundColor: '#003C00',
    borderRadius: scaleSize(10),
    padding: scaleSize(8),
  },
  dayText: {
    color: '#13FA19',
    fontSize: FONT_SIZES.XXS,
    lineHeight: scaleFont(19),
    fontFamily: FONTS.REGULAR,
  },
});
