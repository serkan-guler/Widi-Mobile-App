import {StyleSheet} from 'react-native';
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  FONT_SIZES,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../constants/dimensions';
import {FONTS} from '../../../constants/fonts';
import {BORDER_COLORS, CARD_COLORS, COLORS} from '../../../constants/colors';

export default StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  inputWrapper: {
    gap: SPACING.XS,
    flex: 1,
  },
  errorWrapper: {
    marginRight: 'auto',
  },
  input: {
    paddingVertical: SPACING.MD_LG,
    paddingLeft: scaleSize(17),
    paddingRight: scaleSize(14),
    borderRadius: BORDER_RADIUS.XXL,
    backgroundColor: CARD_COLORS.BACKGROUND,
    fontSize: scaleFont(16),
    fontFamily: FONTS.MEDIUM,
    color: COLORS.WHITE,
    flex: 1,
    verticalAlign: 'middle',
  },
  selectContainer: {
    flex: 1,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderRadius: BORDER_RADIUS.XXL,
    paddingTop: scaleSize(15),
    paddingBottom: scaleSize(25),
    paddingHorizontal: scaleSize(13),
    gap: scaleSize(14),
  },
  selectContainerBase: {
    backgroundColor: COLORS.TERTIARY,
    borderColor: BORDER_COLORS.LIGHT,
  },
  selectContainerSelected: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  selectWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SM,
  },
  selectRectangle: {
    width: scaleSize(26),
    height: scaleSize(26),
    borderRadius: scaleSize(13),
    borderWidth: BORDER_WIDTH.DEFAULT,
    backgroundColor: COLORS.DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectRectangleBase: {
    borderColor: BORDER_COLORS.LIGHT,
  },
  selectRectangleSelected: {
    borderColor: '#80AF08',
  },
  selection: {
    width: scaleSize(18),
    height: scaleSize(18),
    backgroundColor: COLORS.PRIMARY,
    borderRadius: scaleSize(9),
  },
  titleText: {
    fontSize: scaleFont(18),
    lineHeight: scaleFont(24),
    letterSpacing: scaleFont(0.35),
    fontFamily: FONTS.MEDIUM,
  },
  descriptionText: {
    fontSize: FONT_SIZES.XS,
    lineHeight: scaleFont(17),
    fontFamily: FONTS.REGULAR,
  },
  selectedTextColor: {
    color: COLORS.DARK,
  },
  defaultTextColor: {
    color: COLORS.WHITE,
  },
  trailingContainer: {
    position: 'absolute',
    zIndex: 1,
    right: scaleSize(14),
  },
  iconEventNone: {
    pointerEvents: 'none',
  },
});
