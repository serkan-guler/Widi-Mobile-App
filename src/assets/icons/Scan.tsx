import Svg, {G, Path, Defs, Rect, ClipPath, SvgProps} from 'react-native-svg';
import {scaleSize} from '../../constants/dimensions';

const Icon = (props: SvgProps) => {
  return (
    <Svg
      width={scaleSize(18)}
      height={scaleSize(19)}
      viewBox="0 0 18 19"
      {...props}>
      <Defs>
        <ClipPath id="clip-Widi_-_Scan_Frame">
          <Rect width="18" height="19" />
        </ClipPath>
      </Defs>
      <G
        id="Widi_-_Scan_Frame"
        data-name="Widi - Scan Frame"
        clipPath="url(#clip-Widi_-_Scan_Frame)">
        <Path
          id="qr-scan"
          d="M0,8.125H17.726V9.6H0Zm1.477,7.386V12.556H0v2.954a2.218,2.218,0,0,0,2.216,2.216H5.17V16.249H2.216A.74.74,0,0,1,1.477,15.511Zm14.772,0a.74.74,0,0,1-.739.739H12.556v1.477h2.954a2.218,2.218,0,0,0,2.216-2.216V12.556H16.249ZM15.511,0H12.556V1.477h2.954a.74.74,0,0,1,.739.739V5.17h1.477V2.216A2.218,2.218,0,0,0,15.511,0ZM1.477,2.216a.74.74,0,0,1,.739-.739H5.17V0H2.216A2.218,2.218,0,0,0,0,2.216V5.17H1.477Z"
          transform="translate(0.137 0.637)"
          fill="currentColor"
        />
      </G>
    </Svg>
  );
};

export default Icon;
