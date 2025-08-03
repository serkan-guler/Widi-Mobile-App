import {StyleSheet} from 'react-native';
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  FONT_SIZES,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../constants/dimensions';
import {
  BORDER_COLORS,
  CARD_COLORS,
  COLORS,
  COMPONENT_COLORS,
} from '../../../constants/colors';
import {FONTS} from '../../../constants/fonts';

export default StyleSheet.create({
  container: {
    gap: SPACING.LG,
    flex: 1,
  },
  trigger: {
    flexDirection: 'row',
    gap: SPACING.SM,
    flexGrow: 0,
  },
  triggerContainer: {
    marginHorizontal: -SPACING.MD_LG,
    paddingHorizontal: SPACING.MD_LG,
  },
  triggerContainerStatus: {
    backgroundColor: COLORS.TERTIARY,
    borderRadius: BORDER_RADIUS.XXXL,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
    padding: scaleSize(5),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loadingContainer: {
    paddingVertical: SPACING.MD_LG,
    flexGrow: 1,
  },
  button: {
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.TERTIARY,
    paddingVertical: scaleSize(14),
    paddingHorizontal: SPACING.MD_LG,
    borderRadius: scaleSize(14),
  },
  buttonStatus: {
    padding: scaleSize(18),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  margin: {
    marginLeft: SPACING.SM,
  },
  activeTabButton: {
    backgroundColor: COMPONENT_COLORS.PRIMARY_BUTTON.DISABLED,
    borderColor: COMPONENT_COLORS.PRIMARY_BUTTON.DISABLED,
  },
  activeTabButtonStatus: {
    backgroundColor: CARD_COLORS.BACKGROUND,
    borderRadius: BORDER_RADIUS.XXL,
  },
  text: {
    fontSize: FONT_SIZES.XXS,
    lineHeight: scaleFont(13),
    color: COLORS.WHITE,
    fontFamily: FONTS.MEDIUM,
  },
  textStatus: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(20),
    lineHeight: scaleFont(25),
    letterSpacing: scaleFont(-0.4),
    color: COLORS.WHITE,
  },
  activeTabText: {
    color: COLORS.PRIMARY,
  },
  content: {
    gap: scaleSize(13),
  },
  scrollContainer: {
    marginHorizontal: -SPACING.MD_LG,
    marginBottom: -SPACING.PAGE_BOTTOM,
  },
  flatList: {
    gap: scaleSize(13),
    paddingHorizontal: SPACING.MD_LG,
    paddingBottom: SPACING.MD,
  },
});
