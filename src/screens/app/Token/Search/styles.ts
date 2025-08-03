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
import {CARD_COLORS, COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';

export default StyleSheet.create({
  paddingContainer: {
    paddingHorizontal: SPACING.MD_LG,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    gap: scaleSize(14),
    marginTop: scaleSize(25),
  },
  container: {
    flex: 1,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleSize(14),
  },
  input: {
    borderRadius: BORDER_RADIUS.XXL,
    backgroundColor: CARD_COLORS.BACKGROUND,
    flex: 1,
    paddingTop: scaleSize(25),
    paddingBottom: scaleSize(21),
    paddingLeft: scaleSize(48),
    paddingRight: SPACING.SM,
    fontFamily: FONTS.REGULAR,
    fontSize: scaleFont(14),
    color: COLORS.WHITE,
  },
  inputIcon: {
    position: 'absolute',
    left: scaleSize(21),
    zIndex: 1,
  },
  pasteButton: {
    paddingVertical: SPACING.XL,
    borderRadius: scaleSize(14),
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: '#B4F903',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleSize(13),
  },
  pasteButtonText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXS,
    lineHeight: LINE_HEIGHTS.XXS,
    color: COLORS.PRIMARY,
  },
  doneContainer: {
    paddingHorizontal: SPACING.MD_LG,
    paddingTop: SPACING.SM,
  },
  loadingIndicator: {
    paddingVertical: SPACING.XXL,
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
});
