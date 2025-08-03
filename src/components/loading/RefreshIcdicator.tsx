import {memo} from 'react';
import {RefreshControl, RefreshControlProps} from 'react-native';
import {COLORS} from '../../constants/colors';
import {scaleSize} from '../../constants/dimensions';

const RefreshIndicator = ({
  size = scaleSize(14),
  ...rest
}: RefreshControlProps) => {
  // return <ActivityIndicator size={size} color={COLORS.WHITE} {...rest} />;
  return (
    <RefreshControl
      size={size}
      colors={[COLORS.PRIMARY, COLORS.WHITE]}
      tintColor={COLORS.PRIMARY}
      {...rest}
    />
  );
};

export default memo(RefreshIndicator);
