import Svg, {G, Path, Defs, Rect, ClipPath, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Defs>
        <ClipPath id="clip-Widi_-_Home_Access">
          <Rect width="24" height="24" />
        </ClipPath>
      </Defs>
      <G
        id="Widi_-_Home_Access"
        data-name="Widi - Home Access"
        clipPath="url(#clip-Widi_-_Home_Access)">
        <Path
          id="home-1"
          d="M22.73,8.611l-7.2-5.764a4.142,4.142,0,0,0-5.005-.011L3.315,8.611a4.308,4.308,0,0,0-1.441,3.773L3.26,20.678A4.087,4.087,0,0,0,7.187,24h11.66a4.151,4.151,0,0,0,3.938-3.333l1.386-8.294A4.42,4.42,0,0,0,22.73,8.611ZM13.842,19.6a.825.825,0,0,1-1.65,0V16.3a.825.825,0,0,1,1.65,0Z"
          transform="translate(-1.019 -1)"
          fill="currentColor"
        />
      </G>
    </Svg>
  );
};

export default Icon;
