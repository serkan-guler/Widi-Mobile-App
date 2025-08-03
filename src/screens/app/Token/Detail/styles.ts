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
import {FONTS} from '../../../../constants/fonts';
import {
  BORDER_COLORS,
  CARD_COLORS,
  COLORS,
  COMPONENT_COLORS,
  NOTIFICATION,
} from '../../../../constants/colors';

export default StyleSheet.create({
  fontMedium: {
    fontFamily: FONTS.MEDIUM,
  },
  fontNeue: {
    fontFamily: FONTS.NEUE,
  },
  flex1: {
    flex: 1,
  },
  webView: {
    backgroundColor: COLORS.TERTIARY,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: SPACING.MD_LG,
  },
  paddingHorizontal: {
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 0,
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
  contentContainer: {
    marginTop: scaleSize(11),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SM,
  },
  contentRightContainer: {
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
  modalContainer: {
    gap: SPACING.SM,
    width: '100%',
    marginTop: -SPACING.SM,
    marginBottom: -SPACING.XXXL,
  },
  modalTextContainer: {
    paddingVertical: SPACING.SM,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.MD,
    lineHeight: LINE_HEIGHTS.MD,
  },
  modalTextSelected: {
    color: COLORS.PRIMARY,
  },
  modalTextUnselected: {
    color: COLORS.WHITE,
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
  triggerScroll: {
    paddingTop: scaleSize(38),
    paddingBottom: scaleSize(19),
  },
  triggerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(13),
    paddingRight: SPACING.MD_LG,
  },
  firstTrigger: {
    marginLeft: SPACING.MD_LG,
  },
  triggerButton: {
    paddingTop: scaleSize(14),
    paddingBottom: scaleSize(15),
    borderRadius: scaleSize(14),
    borderWidth: BORDER_WIDTH.DEFAULT,
    paddingHorizontal: scaleSize(11),
    minWidth: scaleSize(92),
    alignItems: 'center',
    justifyContent: 'center',
  },
  triggerButtonDefault: {
    borderColor: BORDER_COLORS.TERTIARY,
  },
  triggerButtonActive: {
    backgroundColor: COMPONENT_COLORS.PRIMARY_BUTTON.DISABLED,
    borderColor: COMPONENT_COLORS.PRIMARY_BUTTON.DISABLED,
  },
  triggerText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXS,
    lineHeight: LINE_HEIGHTS.XXS,
  },
  triggerTextDefault: {
    color: COLORS.WHITE,
  },
  triggerTextActive: {
    color: COLORS.PRIMARY,
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
  auditWrapper: {
    gap: SPACING.SM,
  },
  auditTitle: {
    marginBottom: -scaleSize(6),
  },
  holdersWrapper: {
    gap: scaleSize(11),
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
  volumeText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XS,
    lineHeight: scaleFont(17),
    color: '#676A6F',
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
  tradeModalContainer: {
    gap: SPACING.MD,
    width: '100%',
  },
  tradeButton: {
    padding: SPACING.MD_LG,
    borderRadius: BORDER_RADIUS.XL,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tradeText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.SM,
    lineHeight: LINE_HEIGHTS.SM,
    color: COLORS.WHITE,
  },
});
