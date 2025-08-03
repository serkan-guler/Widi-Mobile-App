import Svg, {
  G,
  Path,
  Defs,
  Rect,
  ClipPath,
  SvgProps,
  Circle,
} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg width="24" height="23" viewBox="0 0 24 23" {...props}>
      <Defs>
        <ClipPath id="clip-Widi_-_Info_White_">
          <Rect width="24" height="23" />
        </ClipPath>
      </Defs>
      <G
        id="Widi_-_Info_White_"
        data-name="Widi - Info (White)"
        clipPath="url(#clip-Widi_-_Info_White_)">
        <G id="info_2_" data-name="info (2)" transform="translate(1.075 0.575)">
          <Path
            id="Path_9265"
            data-name="Path 9265"
            d="M10.925,0A10.925,10.925,0,1,0,21.851,10.925,10.925,10.925,0,0,0,10.925,0Zm0,20.03a9.1,9.1,0,1,1,9.1-9.1A9.1,9.1,0,0,1,10.925,20.03Z"
            fill="currentColor"
          />
          <Path
            id="Path_9266"
            data-name="Path 9266"
            d="M11.821,10h-.91a.91.91,0,1,0,0,1.821h.91v5.463a.91.91,0,0,0,1.821,0V11.821A1.821,1.821,0,0,0,11.821,10Z"
            transform="translate(-0.896 -0.896)"
            fill="currentColor"
          />
          <Circle
            id="Ellipse_1432"
            data-name="Ellipse 1432"
            cx="1.366"
            cy="1.366"
            r="1.366"
            transform="translate(9.56 4.552)"
            fill="currentColor"
          />
        </G>
      </G>
    </Svg>
  );
};

export default Icon;
