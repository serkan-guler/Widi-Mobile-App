import Svg, {G, Path, Defs, Rect, ClipPath, SvgProps} from 'react-native-svg';
import {scaleSize} from '../../constants/dimensions';

const width = scaleSize(18);
const height = scaleSize(16);
const viewBox = `0 0 ${width} ${height}`;

const Icon = (props: SvgProps) => {
  return (
    <Svg width={width} height={height} viewBox={viewBox} {...props}>
      <Path
        id="heart-4"
        d="M3.929,0a3.957,3.957,0,0,0-2.77,1.159A3.887,3.887,0,0,0,0,3.929,3.957,3.957,0,0,0,1.159,6.7l6.7,6.7,6.7-6.7a3.887,3.887,0,0,0,1.159-2.77,3.957,3.957,0,0,0-1.159-2.77A3.887,3.887,0,0,0,11.787,0a3.957,3.957,0,0,0-2.77,1.159,3.887,3.887,0,0,0-1.159,2.77A3.957,3.957,0,0,0,6.7,1.159,3.887,3.887,0,0,0,3.929,0Z"
        transform="translate(0 0)"
        fill="#b8fe03"
      />
    </Svg>
  );
};

export default Icon;
