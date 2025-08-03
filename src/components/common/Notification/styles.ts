import {StyleSheet} from 'react-native';
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  FONT_SIZES,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../constants/dimensions';
import {NOTIFICATION} from '../../../constants/colors';
import {FONTS} from '../../../constants/fonts';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.LG,
    paddingHorizontal: SPACING.SM,
    paddingTop: scaleSize(14),
    paddingBottom: scaleSize(10),
    gap: scaleSize(9),
  },
  dangerContainer: {
    backgroundColor: NOTIFICATION.DANGER.BACKGROUND,
  },
  successContainer: {
    backgroundColor: NOTIFICATION.SUCCESS.BACKGROUND,
  },
  warningContainer: {
    backgroundColor: NOTIFICATION.WARNING.BACKGROUND,
  },
  text: {
    fontFamily: FONTS.REGULAR,
    fontSize: scaleFont(12),
    lineHeight: scaleFont(18),
    flexShrink: 1,
  },
  dangerText: {
    color: NOTIFICATION.DANGER.TEXT,
  },
  successText: {
    color: NOTIFICATION.SUCCESS.TEXT,
  },
  warningText: {
    color: NOTIFICATION.WARNING.TEXT,
  },
  topNotificationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    marginHorizontal: SPACING.MD_LG,
    borderRadius: BORDER_RADIUS.LG,
    paddingHorizontal: scaleSize(11),
    paddingTop: scaleSize(16),
    paddingBottom: scaleSize(18),
    gap: scaleSize(7),
  },
  titleContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    right: 0,
    top: scaleSize(-3.5),
  },
  topTitleText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(24),
    lineHeight: scaleFont(38),
  },
  topDescriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(6),
  },
  image: {
    width: scaleSize(19),
    height: scaleSize(19),
  },
  imageContainer: {
    position: 'relative',
    borderRadius: scaleSize(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  solBg: {
    backgroundColor: '#252F6A',
  },
  solContainer: {
    borderRadius: scaleSize(2),
    borderWidth: BORDER_WIDTH.DEFAULT,
    width: scaleSize(9),
    height: scaleSize(9),
    position: 'absolute',
    bottom: scaleSize(-3),
    right: scaleSize(-3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  solBorderWarning: {
    borderColor: NOTIFICATION.WARNING.BACKGROUND,
  },
  solBorderSuccess: {
    borderColor: NOTIFICATION.SUCCESS.BACKGROUND,
  },
  solBorderDanger: {
    borderColor: NOTIFICATION.DANGER.BACKGROUND,
  },
  solImage: {
    width: scaleSize(9),
    height: scaleSize(9),
    // borderRadius: scaleSize(2),
  },
  descriptionText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XS,
    lineHeight: scaleFont(21),
  },
});
