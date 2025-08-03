import Svg, {G, Path, Defs, Rect, ClipPath, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg width="19" height="19" viewBox="0 0 19 19" {...props}>
      <Defs>
        <ClipPath id="clip-Widi_-_Currency">
          <Rect width="19" height="19" />
        </ClipPath>
      </Defs>
      <G
        id="Widi_-_Currency"
        data-name="Widi - Currency"
        clipPath="url(#clip-Widi_-_Currency)">
        <Path
          id="usd-circle-2"
          d="M8.531,0a8.531,8.531,0,1,0,8.531,8.531A8.541,8.541,0,0,0,8.531,0Zm0,15.64A7.109,7.109,0,1,1,15.64,8.531,7.117,7.117,0,0,1,8.531,15.64ZM7.109,7.109a.546.546,0,0,0,.458.54l2.162.36a1.963,1.963,0,0,1,1.646,1.943,2.135,2.135,0,0,1-2.133,2.133v1.422H7.82V12.086A2.135,2.135,0,0,1,5.687,9.953H7.109a.711.711,0,0,0,.711.711H9.242a.711.711,0,0,0,.711-.711.546.546,0,0,0-.458-.54l-2.162-.36A1.963,1.963,0,0,1,5.687,7.109,2.135,2.135,0,0,1,7.82,4.976V3.555H9.242V4.976a2.135,2.135,0,0,1,2.133,2.133H9.953A.712.712,0,0,0,9.242,6.4H7.82A.712.712,0,0,0,7.109,7.109Z"
          transform="translate(0.969 0.969)"
          fill="currentColor"
        />
      </G>
    </Svg>
  );
};

export default Icon;
