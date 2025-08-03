import {StyleSheet} from 'react-native';
import {FONT_SIZES, SPACING} from '../../constants/dimensions';
import {FONTS} from '../../constants/fonts';
import {COLORS} from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.XL,
    backgroundColor: COLORS.DARK,
  },
  text: {
    fontSize: FONT_SIZES.XXL,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.PRIMARY,
  },
  listContainer: {
    paddingVertical: SPACING.SM,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.XS,
  },
  listText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.SM,
    color: COLORS.PRIMARY,
    textAlign: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  absoluteTop: {
    margin: -100,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    zIndex: 1001,
  },
});
