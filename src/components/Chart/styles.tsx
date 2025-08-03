import {StyleSheet} from 'react-native';
import {BORDER_COLORS, COLORS} from '../../constants/colors';
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  FONT_SIZES,
  scaleFont,
  scaleSize,
} from '../../constants/dimensions';
import {FONTS} from '../../constants/fonts';

export default StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: COLORS.TERTIARY,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
    borderRadius: BORDER_RADIUS.XXL,
    height: scaleSize(320),
    paddingHorizontal: scaleSize(17),
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartContainer: {
    flex: 1,
    height: '100%',
    position: 'relative',
  },
  yAxisLabel: {
    textAlign: 'right',
    position: 'absolute',
    right: 0,
  },
  xAxisLabel: {
    textAlign: 'left',
  },
  text: {
    color: '#676A6F',
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.XXS,
    lineHeight: scaleFont(12),
    letterSpacing: scaleFont(-0.22),
  },
  header: {
    height: scaleSize(40),
  },
  footer: {
    height: scaleSize(60),
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scaleSize(60),
  },
  lineWrapper: {
    position: 'absolute',
    top: -scaleSize(16),
    left: 2,
    zIndex: 1,
    height: scaleSize(12),
    backgroundColor: BORDER_COLORS.LIGHT,
    borderWidth: BORDER_WIDTH.THIN,
    borderColor: BORDER_COLORS.LIGHT,
  },
  footerTextWrapper: {
    position: 'relative',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    height: scaleSize(60),
    alignItems: 'center',
    paddingTop: scaleSize(8),
  },
});
