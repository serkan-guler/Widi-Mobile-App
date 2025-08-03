import Svg, {Path, SvgProps} from 'react-native-svg';
import {scaleSize} from '../../constants/dimensions';

const width = scaleSize(18);
const height = scaleSize(16);
const viewBox = `0 0 ${width} ${height}`;

const Icon = (props: SvgProps) => {
  return (
    <Svg width={width} height={height} viewBox={viewBox} {...props}>
      <Path
        id="heart-3"
        d="M28.546,42.629a3.781,3.781,0,0,0-5.349,0l-.458.464-.454-.463,0,0a3.781,3.781,0,0,0-5.347,0l-.2.2a3.781,3.781,0,0,0,0,5.347l5.387,5.387.608.637.015-.015.016.016.57-.6,5.425-5.425a3.785,3.785,0,0,0,0-5.347Zm-.464,4.883-5.342,5.342L17.4,47.512a2.836,2.836,0,0,1,0-4.01l.2-.2a2.836,2.836,0,0,1,4.009,0l1.125,1.146L23.867,43.3a2.836,2.836,0,0,1,4.011,0l.2.2a2.839,2.839,0,0,1,0,4.011Z"
        transform="translate(-15.622 -41.522)"
        fill="#b8fe03"
      />
    </Svg>
  );
};

export default Icon;
