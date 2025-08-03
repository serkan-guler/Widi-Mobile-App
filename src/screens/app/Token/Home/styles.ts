import {StyleSheet} from 'react-native';
import {
  BORDER_COLORS,
  CARD_COLORS,
  COLORS,
  COMPONENT_COLORS,
} from '../../../../constants/colors';
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

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.DARK,
  },
  topWrapper: {},
  pageHeaderContainer: {
    paddingTop: SPACING.LG,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.MD_LG,
  },
  header: {
    paddingHorizontal: SPACING.MD_LG,
  },
  pageHeaderRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(10),
  },
  headerButton: {
    height: scaleSize(32),
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.SECONDARY,
    borderRadius: scaleSize(17),
    gap: scaleSize(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtonDisabled: {
    backgroundColor: COLORS.TERTIARY,
  },
  headerLeftButton: {
    paddingLeft: scaleSize(19),
    paddingRight: scaleSize(17),
  },
  headerRightButton: {
    paddingHorizontal: scaleSize(17),
  },
  headerButtonText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXS,
    lineHeight: LINE_HEIGHTS.XXS,
    color: COLORS.WHITE,
  },
  searchContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(16),
    padding: scaleSize(21),
    borderRadius: BORDER_RADIUS.XXL,
    backgroundColor: CARD_COLORS.BACKGROUND,
    marginTop: scaleSize(11),
    marginBottom: scaleSize(13),
    marginHorizontal: SPACING.MD_LG,
  },
  searchText: {
    fontFamily: FONTS.REGULAR,
    fontSize: scaleFont(14),
    lineHeight: scaleFont(24),
    color: COLORS.WHITE,
  },
  tabTriggerContainer: {
    marginBottom: scaleSize(18),
  },
  tabTriggerContent: {
    gap: scaleSize(13),
  },
  tabButton: {
    paddingVertical: scaleSize(14),
    paddingHorizontal: scaleSize(21),
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderRadius: scaleSize(14),
  },
  tabButtonFirst: {
    marginLeft: SPACING.MD_LG,
  },
  tabButtonLast: {
    marginRight: SPACING.MD_LG,
  },
  tabButtonDefault: {
    borderColor: BORDER_COLORS.TERTIARY,
  },
  tabButtonActive: {
    backgroundColor: COMPONENT_COLORS.PRIMARY_BUTTON.DISABLED,
    borderColor: COMPONENT_COLORS.PRIMARY_BUTTON.DISABLED,
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
  contentWrapper: {
    position: 'relative',
    overflow: 'hidden',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.SM,
  },
  loadingText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXL,
    lineHeight: LINE_HEIGHTS.XXXL,
    color: COLORS.PRIMARY,
  },
  flatList: {
    paddingHorizontal: SPACING.MD_LG,
  },
  flatListContentContainer: {
    gap: SPACING.SM,
    paddingBottom: SPACING.PAGE_BOTTOM,
  },
  refreshWrapper: {
    flex: 1,
  },
  refreshContainer: {
    marginHorizontal: SPACING.MD_LG,
    borderRadius: BORDER_RADIUS.XXL,
    overflow: 'hidden',
  },
  absoluteContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
