import {Dimensions, StyleSheet} from 'react-native';
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  FONT_SIZES,
  LINE_HEIGHTS,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../constants/dimensions';
import {BORDER_COLORS, CARD_COLORS, COLORS} from '../../constants/colors';
import {FONTS} from '../../constants/fonts';

const {width} = Dimensions.get('window');
const widthWithBorder = width + BORDER_WIDTH.DEFAULT * 2;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0A0A4F',
    // backgroundColor: 'rgba(12, 10, 10, 0.31)',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
  },
  wrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  overlay: {
    width: widthWithBorder,
    paddingTop: SPACING.XXXL * 2,
    paddingBottom: SPACING.XXXL,
    paddingHorizontal: SPACING.MD_LG,
    gap: scaleSize(47),
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderTop: {
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
    borderRadius: BORDER_RADIUS.XXL,
  },
  overlayDefault: {
    backgroundColor: CARD_COLORS.BACKGROUND,
  },
  overlayTertiary: {
    backgroundColor: COLORS.TERTIARY,
  },
  logo: {
    width: scaleSize(62),
    height: scaleSize(62),
    borderRadius: scaleSize(21),
    backgroundColor: COLORS.DANGER,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -scaleSize(31),
    zIndex: 1,
  },
  header: {},
  button: {
    borderRadius: BORDER_RADIUS.XXXL,
    paddingVertical: SPACING.XXL,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: COLORS.PRIMARY,
  },
  buttonSecondary: {
    backgroundColor: COLORS.DARK,
  },
  buttonText: {
    fontSize: FONT_SIZES.MD,
    lineHeight: LINE_HEIGHTS.LG,
    fontFamily: FONTS.MEDIUM,
    letterSpacing: scaleFont(-0.17),
  },
  buttonTextPrimary: {
    color: COLORS.DARK,
  },
  buttonTextSecondary: {
    color: COLORS.WHITE,
  },
  buttonsContainer: {
    width: '100%',
    gap: SPACING.XL,
  },
  topContent: {
    paddingTop: scaleSize(40),
    paddingBottom: scaleSize(70),
    width: widthWithBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -scaleSize(30),
  },
  backdrop: {},
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(12, 10, 10, 0.31)',
    filter: 'blur(5)',
    zIndex: -1,
  },
});
