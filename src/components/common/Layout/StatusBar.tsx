import {memo} from 'react';
import {StatusBar} from 'react-native';
import {COLORS} from '../../../constants/colors';

const LayoutStatusBar = () => {
  return (
    <StatusBar
      animated={true}
      barStyle="light-content"
      showHideTransition="fade"
      backgroundColor={COLORS.DARK}
    />
  );
};

export default memo(LayoutStatusBar);
