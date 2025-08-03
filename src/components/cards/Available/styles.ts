import {StyleSheet} from 'react-native';
import {
  BORDER_COLORS,
  COLORS,
  COMPONENT_COLORS,
} from '../../../constants/colors';
import {
  BORDER_WIDTH,
  scaleFont,
  scaleSize,
} from '../../../constants/dimensions';
import {FONTS} from '../../../constants/fonts';

export default StyleSheet.create({
  container: {
    backgroundColor: COMPONENT_COLORS.BUTTON.BACKGROUND,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.SECONDARY,
    borderRadius: scaleSize(17),
    paddingVertical: scaleSize(10.5),
    paddingHorizontal: scaleSize(20),
    minWidth: scaleSize(150),
  },
  isLoading: {
    backgroundColor: COLORS.TERTIARY,
  },
  text: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(14),
    lineHeight: scaleFont(18),
  },
  textDefault: {
    color: COLORS.WHITE,
  },
  textSecondary: {
    color: '#676A6F',
  },
});
