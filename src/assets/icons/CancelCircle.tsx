import Svg, {G, Path, Defs, Rect, ClipPath, SvgProps} from 'react-native-svg';
import {scaleSize} from '../../constants/dimensions';

const Icon = (props: SvgProps) => {
  return (
    <Svg
      width={scaleSize(16)}
      height={scaleSize(16)}
      viewBox="0 0 20 20"
      {...props}>
      <Defs>
        <ClipPath id="clip-Widi_-_Cancel_Action_Red_">
          <Rect width="20" height="20" />
        </ClipPath>
      </Defs>
      <G
        id="Widi_-_Cancel_Action_Red_"
        data-name="Widi - Cancel Action (Red)"
        clipPath="url(#clip-Widi_-_Cancel_Action_Red_)">
        <Path
          id="times-circle"
          d="M17.063,8a9.063,9.063,0,1,0,9.063,9.063A9.062,9.062,0,0,0,17.063,8Zm0,16.373a7.309,7.309,0,1,1,7.309-7.309A7.307,7.307,0,0,1,17.063,24.373Zm3.72-9.582-2.273,2.273,2.273,2.273a.439.439,0,0,1,0,.621l-.826.826a.439.439,0,0,1-.621,0l-2.273-2.273L14.79,20.784a.439.439,0,0,1-.621,0l-.826-.826a.439.439,0,0,1,0-.621l2.273-2.273L13.343,14.79a.439.439,0,0,1,0-.621l.826-.826a.439.439,0,0,1,.621,0l2.273,2.273,2.273-2.273a.439.439,0,0,1,.621,0l.826.826A.439.439,0,0,1,20.784,14.79Z"
          transform="translate(-7.063 -7.063)"
          fill="currentColor"
        />
      </G>
    </Svg>
  );
};

export default Icon;
