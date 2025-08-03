import {StyleSheet} from 'react-native';
import {
  BORDER_COLORS,
  CARD_COLORS,
  COLORS,
  COMPONENT_COLORS,
} from '../../../../constants/colors';
import {
  BORDER_RADIUS,
  FONT_SIZES,
  LINE_HEIGHTS,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../../constants/dimensions';
import {FONTS} from '../../../../constants/fonts';

export default StyleSheet.create({
  flatContainer: {
    flex: 1,
    paddingHorizontal: SPACING.MD_LG,
    backgroundColor: COLORS.DARK,
  },
  flatContentContainer: {
    paddingBottom: SPACING.PAGE_BOTTOM,
    gap: scaleSize(13),
  },
  container: {
    backgroundColor: COLORS.DARK,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    gap: SPACING.SM,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    width: scaleSize(48),
    height: scaleSize(48),
    borderRadius: SPACING.SM,
  },
  userInfo: {
    flex: 1,
  },
  userWelcome: {
    fontSize: FONT_SIZES.XS,
    lineHeight: LINE_HEIGHTS.XS,
    fontFamily: FONTS.REGULAR,
    color: COLORS.GRAY,
  },
  username: {
    fontSize: FONT_SIZES.XXL,
    lineHeight: scaleFont(34),
    fontFamily: FONTS.MEDIUM,
    color: COLORS.WHITE,
  },
  copyCardContainer: {
    marginTop: scaleSize(19),
    gap: SPACING.MD_LG,
  },
  pageTitleContainer: {
    marginTop: scaleSize(23),
  },
  searchContainer: {
    marginTop: scaleSize(14),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.XXL,
    backgroundColor: CARD_COLORS.BACKGROUND,
    paddingTop: scaleSize(21),
    paddingBottom: scaleSize(20),
    paddingHorizontal: scaleSize(21),
    gap: SPACING.MD,
  },
  searchText: {
    fontFamily: FONTS.REGULAR,
    fontSize: scaleFont(14),
    lineHeight: scaleFont(24),
    color: COLORS.WHITE,
  },
  tabContainer: {
    marginTop: scaleSize(13),
    marginBottom: SPACING.LG,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SM,
  },
  tabTrigger: {
    paddingVertical: scaleSize(14),
    borderRadius: scaleSize(14),
    borderWidth: 1,
  },
  tabTriggerDefault: {
    borderColor: BORDER_COLORS.TERTIARY,
  },
  tabTriggerActive: {
    borderColor: COMPONENT_COLORS.PRIMARY_BUTTON.DISABLED,
    backgroundColor: COMPONENT_COLORS.PRIMARY_BUTTON.DISABLED,
  },
  tabText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXS,
    lineHeight: LINE_HEIGHTS.XXS,
  },
  tabTextDefault: {
    color: COLORS.WHITE,
  },
  tabTextActive: {
    color: COLORS.PRIMARY,
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(6),
  },
  cardImage: {
    width: scaleSize(39),
    height: scaleSize(39),
    borderRadius: BORDER_RADIUS.XL,
  },
  cardTitleText: {
    fontSize: scaleFont(14),
    lineHeight: scaleFont(34),
    fontFamily: FONTS.MEDIUM,
    color: COLORS.WHITE,
  },
  connectIcon: {
    marginLeft: scaleSize(4),
  },
  trendCardContentHeaderContainer: {
    alignItems: 'flex-end',
  },
  trendCardContentHeaderTitle: {
    fontSize: FONT_SIZES.XXL,
    lineHeight: scaleFont(33),
    letterSpacing: scaleFont(-0.5),
    fontFamily: FONTS.MEDIUM,
  },
  trendCardContentHeaderTitleSuccess: {
    color: COLORS.PRIMARY,
  },
  trendCardContentHeaderTitleDanger: {
    color: COLORS.DANGER,
  },
  trendCardContentHeaderTitleBase: {
    color: COLORS.WHITE,
  },
  trendCardContentHeaderDescription: {
    fontSize: FONT_SIZES.XXS,
    lineHeight: LINE_HEIGHTS.XXS,
    fontFamily: FONTS.MEDIUM,
    color: '#676A6F',
  },
  noFavoritesContainer: {
    paddingVertical: SPACING.XL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noFavoritesText: {
    fontSize: FONT_SIZES.XXL,
    lineHeight: LINE_HEIGHTS.XXL,
    fontFamily: FONTS.REGULAR,
    color: COLORS.GRAY,
    textAlign: 'center',
  },
  copyButton: {
    borderRadius: scaleSize(13),
    paddingVertical: scaleSize(9.5),
    paddingHorizontal: scaleSize(17.5),
  },
  copyButtonBase: {
    backgroundColor: COLORS.PRIMARY,
  },
  copyButtonDisabled: {
    backgroundColor: COMPONENT_COLORS.PRIMARY_BUTTON.DISABLED,
  },
  copyText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XS,
    lineHeight: scaleFont(17),
  },
  copyTextBase: {
    color: COLORS.DARK,
  },
  copyTextDisabled: {
    color: COLORS.WHITE,
  },
});
