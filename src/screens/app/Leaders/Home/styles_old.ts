import {StyleSheet} from 'react-native';
import {
  BORDER_RADIUS,
  FONT_SIZES,
  LINE_HEIGHTS,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../../constants/dimensions';
import {FONTS} from '../../../../constants/fonts';
import {COLORS} from '../../../../constants/colors';

export default StyleSheet.create({
  flatContainer: {
    paddingHorizontal: SPACING.MD_LG,
    flex: 1,
  },
  container: {
    // paddingBottom: SPACING.MD,
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
  },
  tabContainer: {
    marginTop: scaleSize(13),
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
    color: COLORS.PRIMARY,
  },
  trendCardContentHeaderDescription: {
    fontSize: FONT_SIZES.XXS,
    lineHeight: LINE_HEIGHTS.XXS,
    fontFamily: FONTS.MEDIUM,
    color: '#676A6F',
  },
  emptyView: {
    height: SPACING.MD,
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
});
