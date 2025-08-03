import Svg, {G, Path, Defs, Rect, ClipPath, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg width="21" height="23" viewBox="0 0 21 23" {...props}>
      <Defs>
        <ClipPath id="clip-Widi_-_Checklist">
          <Rect width="21" height="23" />
        </ClipPath>
      </Defs>
      <G
        id="Widi_-_Checklist"
        data-name="Widi - Checklist"
        clipPath="url(#clip-Widi_-_Checklist)">
        <Path
          id="terms-check"
          d="M11.667,10H3.333V8.333h8.333Zm-10,8.333V2.5A.835.835,0,0,1,2.5,1.667h10a.834.834,0,0,1,.833.833V16.227L15,14.583V2.5A2.5,2.5,0,0,0,12.5,0H2.5A2.5,2.5,0,0,0,0,2.5V20H10.523L8.909,18.333Zm17.014-5.08-5.062,5.062a.074.074,0,0,1-.081.009l-2.578-2.665-1.2,1.159,2.587,2.675a1.731,1.731,0,0,0,2.448,0l5.062-5.062L18.68,13.253ZM11.667,4.167H3.333V5.833h8.333Zm-8.333,10H9.167V12.5H3.333Z"
          transform="translate(0.571 1.5)"
          fill="currentColor"
        />
      </G>
    </Svg>
  );
};

export default Icon;
