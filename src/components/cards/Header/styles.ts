import {StyleSheet} from 'react-native';
import {FONT_SIZES, scaleFont, scaleSize} from '../../../constants/dimensions';
import {COLORS} from '../../../constants/colors';
import {FONTS} from '../../../constants/fonts';

export default StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scaleSize(5),
  },
  dot: {
    width: scaleSize(6),
    height: scaleSize(6),
    borderRadius: scaleSize(3),
    backgroundColor: COLORS.PRIMARY,
  },
  titleContainer: {
    flex: 1,
    height: 'auto',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONTS.MEDIUM,
    // fontSize: FONT_SIZES.XXL,
    // lineHeight: scaleFont(33),
    // letterSpacing: scaleFont(-0.5),
    color: COLORS.WHITE,
  },
});
