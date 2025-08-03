import {StyleSheet} from 'react-native';
import {scaleFont, scaleSize} from '../../constants/dimensions';
import {FONTS} from '../../constants/fonts';
import {COLORS} from '../../constants/colors';

export default StyleSheet.create({
  touchPadContainer: {
    marginTop: scaleSize(20),
    gap: scaleSize(20),
    backgroundColor: COLORS.DARK,
  },
  touchPadRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // paddingHorizontal: scaleSize(20),
    // paddingVertical: scaleSize(10),
  },
  touchItem: {
    width: scaleSize(60),
    height: scaleSize(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchPadText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(32),
    lineHeight: scaleFont(39),
    letterSpacing: scaleFont(-0.67),
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});
