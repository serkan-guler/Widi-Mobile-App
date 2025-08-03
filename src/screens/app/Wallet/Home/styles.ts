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
  container: {
    flex: 1,
  },
  titleContainer: {
    marginTop: SPACING.XS,
    gap: SPACING.XS,
  },
  paddingContainer: {
    paddingHorizontal: SPACING.MD_LG,
  },
  cardGap: {
    gap: scaleSize(13),
  },
  paddingBottom: {
    paddingBottom: SPACING.PAGE_BOTTOM,
  },
  border: {
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
    borderRadius: BORDER_RADIUS.XXL,
  },
  cardContentContainer: {
    backgroundColor: CARD_COLORS.BACKGROUND,
  },
  cardContentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.SM,
    paddingVertical: SPACING.MD_LG,
    paddingHorizontal: scaleSize(14),
    backgroundColor: CARD_COLORS.BACKGROUND,
    borderRadius: BORDER_RADIUS.XXL,
  },
  cardContentTextContainer: {
    gap: scaleSize(6),
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XS,
    lineHeight: scaleFont(17),
    letterSpacing: scaleFont(-0.26),
  },
  cardTextTitle: {
    color: '#676A6F',
  },
  cardTextAddress: {
    color: COLORS.WHITE,
  },
  copyButton: {
    borderRadius: scaleSize(14),
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.SECONDARY,
    paddingVertical: scaleSize(7),
    paddingHorizontal: scaleSize(14),
  },
  copyText: {
    fontFamily: FONTS.REGULAR,
    fontSize: scaleFont(14),
    lineHeight: LINE_HEIGHTS.SM,
    letterSpacing: scaleFont(-0.14),
    color: COLORS.PRIMARY,
  },
  cardChildrenContainer: {
    backgroundColor: COLORS.TERTIARY,
    paddingTop: scaleSize(19),
    paddingBottom: scaleSize(16),
    alignItems: 'center',
    justifyContent: 'center',
    gap: scaleSize(3),
  },
  cardChildrenTitle: {
    color: '#676A6F',
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(12),
    lineHeight: LINE_HEIGHTS.XXS,
    letterSpacing: scaleFont(0.96),
  },
  cardChildrenBalanceContainer: {
    gap: scaleSize(9),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardChildrenBalanceIconText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.REGULAR,
    fontSize: scaleFont(63),
    lineHeight: scaleFont(80),
    letterSpacing: scaleFont(-1.26),
  },
  cardChildrenBalanceText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(45),
    lineHeight: scaleFont(57),
    letterSpacing: scaleFont(-0.9),
  },
  cardChildrenBalanceSolContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.SM,
    paddingVertical: scaleSize(10),
    borderRadius: scaleSize(13),
    gap: SPACING.SM,
  },
  cardChildrenBalanceSolText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XL,
    lineHeight: LINE_HEIGHTS.XL,
    color: COLORS.WHITE,
  },
  cardActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.XS,
  },
  card: {
    backgroundColor: COLORS.TERTIARY,
  },
  cardActionButton: {
    paddingVertical: SPACING.XL,
    flexDirection: 'row',
    gap: SPACING.XS,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardButtonText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.MD,
    lineHeight: LINE_HEIGHTS.LG,
    letterSpacing: scaleFont(-0.17),
  },
  cardButtonTextWhite: {
    color: COLORS.WHITE,
  },
  cardButtonTextPrimary: {
    color: COLORS.PRIMARY,
  },
  downloadIcon: {
    transform: [{rotate: '180deg'}],
  },
  subTitle: {
    color: COLORS.GRAY,
    marginTop: scaleSize(36),
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.XS,
    lineHeight: scaleFont(17),
  },
  getDomainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scaleSize(20),
    flexWrap: 'wrap',
    gap: scaleSize(8),
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
  widiDomainButton: {
    borderRadius: BORDER_RADIUS.XXXL,
    paddingVertical: scaleSize(21),
    paddingHorizontal: SPACING.XL,
    flexGrow: 1,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  widiDomainText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.MD,
    lineHeight: scaleFont(21),
    letterSpacing: scaleFont(-0.17),
    color: COLORS.PRIMARY,
  },
  content: {
    gap: scaleSize(14),
    marginTop: scaleSize(36),
  },
  tabScrollContentStyle: {
    paddingTop: scaleSize(13),
    paddingBottom: SPACING.LG,
    gap: SPACING.SM,
    paddingHorizontal: SPACING.MD_LG,
  },
  tabButton: {
    borderRadius: scaleSize(14),
    paddingVertical: scaleSize(15),
    paddingHorizontal: scaleSize(20),
    borderWidth: BORDER_WIDTH.DEFAULT,
  },
  tabButtonDefault: {
    borderColor: BORDER_COLORS.TERTIARY,
  },
  tabButtonActive: {
    backgroundColor: COMPONENT_COLORS.PRIMARY_BUTTON.DISABLED,
    borderColor: COMPONENT_COLORS.PRIMARY_BUTTON.DISABLED,
  },
  tabButtonText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXS,
    lineHeight: scaleFont(13),
  },
  tabButtonTextDefault: {
    color: COLORS.WHITE,
  },
  tabButtonTextActive: {
    color: COLORS.PRIMARY,
  },
  receiveModalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: SPACING.SM,
  },
  receiveModalTitleText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(20),
    lineHeight: scaleFont(25),
    letterSpacing: scaleFont(-0.2),
    color: COLORS.WHITE,
    marginTop: scaleSize(-20),
  },
  receiveModalText: {
    color: COLORS.WHITE,
  },
  modalItemContainer: {
    borderRadius: BORDER_RADIUS.XXL,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.XL,
  },
  modalItemContainerDark: {
    flexGrow: 1,
    backgroundColor: COLORS.DARK,
  },
  modalItemContainerPrimary: {
    backgroundColor: COLORS.PRIMARY,
  },
  modalItemText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.MD,
    lineHeight: LINE_HEIGHTS.LG,
    letterSpacing: scaleFont(-0.34),
  },
  modalItemTextWhite: {
    color: COLORS.WHITE,
  },
  modalItemTextDark: {
    color: COLORS.DARK,
  },
  noDataContainer: {
    paddingVertical: SPACING.XL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    fontSize: FONT_SIZES.XXL,
    lineHeight: LINE_HEIGHTS.XXL,
    fontFamily: FONTS.REGULAR,
    color: COLORS.GRAY,
    textAlign: 'center',
  },
  successCopiedContainer: {
    paddingVertical: SPACING.LG,
  },
  successCopiedText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(29),
    lineHeight: scaleFont(37),
    letterSpacing: scaleFont(-0.29),
    color: NOTIFICATION.SUCCESS.TEXT,
    textAlign: 'center',
  },
});
