import Svg, {G, Path, Defs, Rect, ClipPath, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg width="18" height="17" viewBox="0 0 18 17" {...props}>
      <Defs>
        <ClipPath id="clip-Widi_-_Connections">
          <Rect width="18" height="17" />
        </ClipPath>
      </Defs>
      <G
        id="Widi_-_Connections"
        data-name="Widi - Connections"
        clipPath="url(#clip-Widi_-_Connections)">
        <Path
          id="Shape"
          d="M16.346,16.679a.671.671,0,0,1-.459-.192l-4.5-3.9A6.592,6.592,0,0,1,7.063,13.9,7.015,7.015,0,0,1,0,6.95,7.015,7.015,0,0,1,7.063,0a7.016,7.016,0,0,1,7.063,6.95,6.781,6.781,0,0,1-1.535,4.74l4.2,3.9a.654.654,0,0,1,.193.453.659.659,0,0,1-.633.638Zm-9.271-15a5.4,5.4,0,1,0,5.4,5.4A5.4,5.4,0,0,0,7.074,1.679Z"
          transform="translate(0.51 0.161)"
          fill="currentColor"
        />
      </G>
    </Svg>
  );
};

export default Icon;
