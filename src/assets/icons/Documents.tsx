import Svg, {G, Path, Defs, Rect, ClipPath, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg width="17" height="19" viewBox="0 0 17 19" {...props}>
      <Defs>
        <ClipPath id="clip-Widi_-_Documents">
          <Rect width="17" height="19" />
        </ClipPath>
      </Defs>
      <G
        id="Widi_-_Documents"
        data-name="Widi - Documents"
        clipPath="url(#clip-Widi_-_Documents)">
        <G id="duplicate" transform="translate(-0.521 1.075)">
          <Path
            id="Path_9273"
            data-name="Path 9273"
            d="M17,.016v3.5h3.412Z"
            transform="translate(-4.469 -0.005)"
            fill="currentColor"
          />
          <Path
            id="Path_9274"
            data-name="Path 9274"
            d="M12.617,4.914V0H9.106A2.106,2.106,0,0,0,7,2.106V13.339H17.531V4.914Z"
            transform="translate(-1.49)"
            fill="currentColor"
          />
          <Path
            id="Path_9275"
            data-name="Path 9275"
            d="M4.106,15.935V4h0A2.106,2.106,0,0,0,2,6.106V18.041H13.233V15.935Z"
            transform="translate(0 -1.192)"
            fill="currentColor"
          />
        </G>
      </G>
    </Svg>
  );
};

export default Icon;
