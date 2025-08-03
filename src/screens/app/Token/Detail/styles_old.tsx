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
  CARD_COLORS,
  COLORS,
  COMPONENT_COLORS,
  NOTIFICATION,
} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';

export default StyleSheet.create({
  flex1: {
    flex: 1,
  },
  webView: {
    backgroundColor: COLORS.TERTIARY,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: SPACING.MD_LG,
  },
  buttonsContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.MD_LG,
    paddingTop: scaleSize(15),
    gap: SPACING.SM,
    borderTopWidth: BORDER_WIDTH.THIN,
    borderTopColor: BORDER_COLORS.LIGHT,
    overflow: 'hidden',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  blurContainer: {
    overflow: 'hidden',
    backgroundColor: COLORS.DARK,
  },
  button: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.XXL,
    borderRadius: BORDER_RADIUS.XXXL,
  },
  buyButton: {
    backgroundColor: COLORS.PRIMARY,
  },
  sellButton: {
    backgroundColor: '#E70806',
  },
  buttonText: {
    fontFamily: FONTS.ULTRABOLD,
    fontSize: FONT_SIZES.MD,
    lineHeight: LINE_HEIGHTS.LG,
    letterSpacing: scaleFont(-0.17),
  },
  buyButtonText: {
    color: COLORS.DARK,
  },
  sellButtonText: {
    color: COLORS.WHITE,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scaleSize(18),
  },
  titleLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(14),
  },
  imageContainer: {
    position: 'relative',
  },
  imageSize: {
    width: scaleSize(54),
    height: scaleSize(54),
    borderRadius: BORDER_RADIUS.XL,
  },
  nameContainer: {
    gap: scaleSize(2),
  },
  creationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(9),
  },
  nameText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXL,
    lineHeight: scaleFont(34),
    color: COLORS.WHITE,
  },
  marketContainer: {
    width: scaleSize(25),
    height: scaleSize(25),
    borderWidth: BORDER_WIDTH.THIN,
    borderColor: BORDER_COLORS.LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scaleSize(6),
  },
  titleRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
    borderRadius: scaleSize(13),
    paddingVertical: scaleSize(11),
    paddingLeft: SPACING.LG,
    paddingRight: scaleSize(14),
    gap: SPACING.SM,
  },
  copyText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XS,
    lineHeight: scaleFont(17),
    letterSpacing: scaleFont(0.26),
  },
  marketCapContainer: {
    marginTop: scaleSize(11),
    alignItems: 'flex-end',
    gap: scaleSize(3),
  },
  marketCapText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(40),
    lineHeight: scaleFont(50),
    letterSpacing: scaleFont(-0.8),
    color: COLORS.WHITE,
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(10),
  },
  badgeStyle: {
    borderRadius: scaleSize(13),
    paddingVertical: scaleSize(6),
    paddingHorizontal: scaleSize(9),
  },
  badgeDanger: {
    backgroundColor: NOTIFICATION.DANGER.BACKGROUND,
  },
  badgeSuccess: {
    backgroundColor: NOTIFICATION.SUCCESS.BACKGROUND,
  },
  badgeText: {
    fontSize: FONT_SIZES.XS,
    lineHeight: scaleFont(17),
    letterSpacing: scaleFont(-0.26),
  },
  badgeTextDanger: {
    color: NOTIFICATION.DANGER.TEXT,
  },
  badgeTextSuccess: {
    color: NOTIFICATION.SUCCESS.TEXT,
  },
  fontTelegraph: {
    fontFamily: FONTS.MEDIUM,
  },
  fontNeueu: {
    fontFamily: FONTS.NEUE,
  },
  rateText: {
    color: '#676A6F',
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(14),
    lineHeight: LINE_HEIGHTS.SM,
    letterSpacing: scaleFont(-0.28),
  },
  chartContainer: {
    marginTop: scaleSize(14),
    backgroundColor: CARD_COLORS.BACKGROUND,
    borderRadius: BORDER_RADIUS.XXL,
    position: 'relative',
  },
  chartContainerLoading: {
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartBlur: {
    zIndex: 1,
    borderRadius: BORDER_RADIUS.XXL,
    overflow: 'hidden',
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(10),
    paddingHorizontal: scaleSize(12),
    paddingTop: scaleSize(19),
    paddingBottom: scaleSize(16),
  },
  timeButton: {
    borderWidth: BORDER_WIDTH.THIN,
    paddingVertical: scaleSize(10),
    paddingHorizontal: scaleSize(18),
    borderRadius: scaleSize(14),
  },
  timeButtonColor: {
    borderColor: BORDER_COLORS.LIGHT,
    backgroundColor: '#020202',
  },
  timeButtonActiveColor: {
    backgroundColor: COMPONENT_COLORS.PRIMARY_BUTTON.DISABLED,
    borderColor: COMPONENT_COLORS.PRIMARY_BUTTON.DISABLED,
  },
  timeText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XS,
    lineHeight: scaleFont(17),
  },
  timeTextColor: {
    color: COLORS.WHITE,
  },
  timeTextActiveColor: {
    color: COLORS.PRIMARY,
  },
  chartLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartWrapper: {
    height: scaleSize(320),
    borderRadius: BORDER_RADIUS.XXL,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
    overflow: 'hidden',
    backgroundColor: COLORS.TERTIARY,
  },
  tabsContainer: {
    paddingTop: scaleSize(39),
    paddingBottom: SPACING.PAGE_BOTTOM,
  },
  statsContainer: {
    borderRadius: BORDER_RADIUS.XXL,
    backgroundColor: CARD_COLORS.BACKGROUND,
  },
  statsHeaderWrapper: {
    gap: SPACING.MD,
    paddingTop: SPACING.MD,
    paddingBottom: SPACING.LG,
    paddingHorizontal: SPACING.MD,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SM,
  },
  statsBodyWrapper: {
    backgroundColor: COLORS.TERTIARY,
    borderRadius: BORDER_RADIUS.XXL,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
    paddingHorizontal: SPACING.LG,
    paddingTop: scaleSize(13),
    paddingBottom: scaleSize(26),
    gap: scaleSize(17),
  },
  statsBodyRow: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statsBodyTitleWrapper: {
    gap: scaleSize(4),
    paddingBottom: scaleSize(9),
  },
  statsBodyTitleEndWrapper: {
    alignItems: 'flex-end',
  },
  statsBodyTitleText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXS,
    lineHeight: LINE_HEIGHTS.XXS,
    letterSpacing: scaleFont(-0.22),
    color: '#676A6F',
  },
  statsBodyTitleColorodText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.SM,
    lineHeight: scaleFont(19),
    letterSpacing: scaleFont(-0.3),
  },
  statsBodyTitleSuccess: {
    color: NOTIFICATION.SUCCESS.TEXT,
  },
  statsBodyTitleDanger: {
    color: '#E70806',
  },
  rangeContainer: {
    height: scaleSize(5),
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  rangeSuccess: {
    backgroundColor: NOTIFICATION.SUCCESS.TEXT,
    left: 0,
  },
  rangeDanger: {
    backgroundColor: '#E70806',
    right: 0,
  },
  holderContainer: {
    borderRadius: BORDER_RADIUS.XXL,
    backgroundColor: COLORS.TERTIARY,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
    paddingVertical: SPACING.SM,
    paddingLeft: scaleSize(11),
    paddingRight: scaleSize(13),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  holderLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(7),
  },
  holderRightContainer: {
    alignItems: 'flex-end',
  },
  indexContainer: {
    width: scaleSize(42),
    height: scaleSize(42),
    borderRadius: BORDER_RADIUS.XL,
    backgroundColor: COLORS.DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(18),
    lineHeight: scaleFont(23),
    letterSpacing: scaleFont(0.36),
    color: COLORS.WHITE,
  },
  columnContainer: {
    gap: scaleSize(4),
  },
  titleText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.SM,
    lineHeight: scaleFont(19),
    letterSpacing: scaleFont(0.3),
    color: COLORS.WHITE,
  },
  amountText: {
    fontSize: scaleFont(20),
    lineHeight: scaleFont(25),
    letterSpacing: scaleFont(-0.4),
    color: COLORS.WHITE,
  },
  amountTextMedium: {
    fontFamily: FONTS.MEDIUM,
  },
  amountTextNeue: {
    fontFamily: FONTS.NEUE,
  },
  volumeText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XS,
    lineHeight: scaleFont(17),
    color: '#676A6F',
  },
  auditContainer: {
    borderRadius: BORDER_RADIUS.XXL,
    backgroundColor: CARD_COLORS.BACKGROUND,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
    paddingVertical: scaleSize(25),
    paddingLeft: scaleSize(25),
    paddingRight: scaleSize(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  auditText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(14),
    lineHeight: scaleFont(34),
    color: COLORS.WHITE,
  },
  badgeContainer: {
    paddingVertical: scaleSize(8),
    borderRadius: BORDER_RADIUS.LG,
    alignItems: 'center',
    justifyContent: 'center',
    width: scaleSize(80),
  },
  badgeSuccessContainer: {
    backgroundColor: NOTIFICATION.SUCCESS.BACKGROUND,
  },
  badgeDangerContainer: {
    backgroundColor: NOTIFICATION.DANGER.BACKGROUND,
  },
  fontMedium: {
    fontFamily: FONTS.MEDIUM,
  },
  fontNeue: {
    fontFamily: FONTS.NEUE,
  },
  badgeAuditText: {
    fontSize: FONT_SIZES.XS,
    lineHeight: scaleFont(17),
    letterSpacing: scaleFont(-0.26),
    textAlign: 'center',
  },
  badgeAuditTextSuccess: {
    color: NOTIFICATION.SUCCESS.TEXT,
  },
  badgeAuditTextDanger: {
    color: NOTIFICATION.DANGER.TEXT,
  },
});
