import {StyleSheet} from 'react-native';
import {COLORS, COMPONENT_COLORS} from '../../../../constants/colors';
import {
  BORDER_WIDTH,
  FONT_SIZES,
  LINE_HEIGHTS,
  scaleSize,
} from '../../../../constants/dimensions';
import {FONTS} from '../../../../constants/fonts';

export default StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: COLORS.DARK,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    flexDirection: 'row',
    // width,
    // height: width,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: COMPONENT_COLORS.BUTTON.BORDER,
    // borderRadius: radius,
  },
  titleContainer: {
    height: scaleSize(44),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: FONT_SIZES.MD,
    lineHeight: LINE_HEIGHTS.LG,
    fontFamily: FONTS.MEDIUM,
    letterSpacing: scaleSize(-0.17),
    color: COLORS.PRIMARY,
    textAlign: 'center',
  },
  trailingContainer: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    // width: scaleSize(44),
    maxHeight: scaleSize(44),
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    // borderWidth: BORDER_WIDTH.DEFAULT,
    // borderColor: COMPONENT_COLORS.BUTTON.BORDER,
    // borderRadius: BORDER_RADIUS.XL,
  },
});
