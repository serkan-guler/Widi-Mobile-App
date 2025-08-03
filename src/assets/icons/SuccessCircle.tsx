import Svg, {Path, SvgProps} from 'react-native-svg';
import {scaleSize} from '../../constants/dimensions';

const Icon = (props: SvgProps) => {
  return (
    <Svg
      width={scaleSize(16)}
      height={scaleSize(16)}
      viewBox="0 0 16.107 16.107">
      <Path
        id="check-circle-4"
        d="M10.938,5.562l.942.956-3.888,3.83a1.33,1.33,0,0,1-.944.389,1.343,1.343,0,0,1-.95-.393L4.231,8.536l.935-.964L7.04,9.388l3.9-3.826Zm5.169,2.491A8.053,8.053,0,1,1,8.053,0,8.062,8.062,0,0,1,16.107,8.053Zm-1.342,0a6.711,6.711,0,1,0-6.711,6.711A6.719,6.719,0,0,0,14.764,8.053Z"
        fill="#13fa19"
      />
    </Svg>
  );
};

export default Icon;
