import {Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scaleSize} from '../constants/dimensions';

export const useSize = () => {
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const {top, bottom} = useSafeAreaInsets();
  const gap = scaleSize(9);

  return {
    width: screenWidth,
    height: screenHeight,
    safeArea: {
      top: top,
      bottom: bottom,
    },
    safeHeight: screenHeight - top - gap,
  };
};
