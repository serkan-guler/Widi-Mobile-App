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
  NOTIFICATION,
} from '../../../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    gap: SPACING.XS,
  },
  border: {
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
    borderRadius: BORDER_RADIUS.XXL,
  },
  //   cardContentContainerProps: {
  //     backgroundColor: CARD_COLORS.BACKGROUND,
  //   },
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
    // borderWidth: BORDER_WIDTH.DEFAULT,
    // borderColor: BORDER_COLORS.LIGHT,
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
  content: {
    gap: scaleSize(14),
    marginTop: scaleSize(36),
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
  widiDomainButton: {
    borderRadius: BORDER_RADIUS.XXXL,
    padding: SPACING.XL,
    flexGrow: 1,
    // paddingVertical: SPACING.XL,
    // paddingHorizontal: scaleSize(30),
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  widiDomainText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.MD,
    lineHeight: scaleFont(21),
    letterSpacing: scaleFont(-0.17),
    color: COLORS.DARK,
  },
});
