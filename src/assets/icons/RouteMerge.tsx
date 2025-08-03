import Svg, {G, Path, Defs, Rect, ClipPath, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg width="21" height="15" viewBox="0 0 21 15" {...props}>
      <Defs>
        <ClipPath id="clip-Widi_-_Route_Merge">
          <Rect width="21" height="15" />
        </ClipPath>
      </Defs>
      <G
        id="Widi_-_Route_Merge"
        data-name="Widi - Route Merge"
        clipPath="url(#clip-Widi_-_Route_Merge)">
        <G id="arrow-right-3" transform="translate(23.523 20.073) rotate(180)">
          <Path
            id="Path_9151"
            data-name="Path 9151"
            d="M22.545,12.93H3.5V11.25H22.545Z"
            transform="translate(0 0.483)"
            fill="currentColor"
          />
          <Path
            id="Path_9152"
            data-name="Path 9152"
            d="M15.519,19.073h-1.68v-.84a7.029,7.029,0,0,1,2.05-4.843,6.882,6.882,0,0,1,4.933-2.14h.84v1.68h-.84a5.217,5.217,0,0,0-3.732,1.635,5.338,5.338,0,0,0-1.572,3.669Z"
            transform="translate(0.883 0.483)"
            fill="currentColor"
          />
          <Path
            id="Path_9153"
            data-name="Path 9153"
            d="M21.663,13.413h-.84a6.882,6.882,0,0,1-4.933-2.14,7.029,7.029,0,0,1-2.05-4.843V5.59h1.68v.84A5.338,5.338,0,0,0,17.091,10.1a5.217,5.217,0,0,0,3.732,1.635h.84Z"
            transform="translate(0.883 0)"
            fill="currentColor"
          />
        </G>
      </G>
    </Svg>
  );
};

export default Icon;
