import {StyleSheet} from 'react-native';
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  scaleSize,
  SPACING,
} from '../../../constants/dimensions';
import {BORDER_COLORS, CARD_COLORS, COLORS} from '../../../constants/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.DANGER,
    borderRadius: BORDER_RADIUS.XXL,
  },
  header: {
    paddingVertical: scaleSize(11),
    alignItems: 'center',
  },
  content: {
    marginBottom: -1,
  },
  //   content: {
  //     paddingVertical: SPACING.MD_LG,
  //     paddingHorizontal: scaleSize(14),
  //     borderWidth: BORDER_WIDTH.DEFAULT,
  //     borderColor: BORDER_COLORS.LIGHT,
  //     backgroundColor: CARD_COLORS.BACKGROUND,
  //     borderRadius: BORDER_RADIUS.XXL,
  //   },
});
