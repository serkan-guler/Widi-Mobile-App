import {StyleSheet} from 'react-native';
import {BORDER_WIDTH, scaleSize} from '../../../constants/dimensions';
import {CARD_COLORS} from '../../../constants/colors';

export default StyleSheet.create({
  absoluteContainer: {
    backgroundColor: '#252F6A',
    borderRadius: scaleSize(7),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: CARD_COLORS.BACKGROUND,
  },
});
