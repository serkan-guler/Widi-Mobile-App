import Svg, {
  G,
  Path,
  LinearGradient,
  Stop,
  Defs,
  Rect,
  ClipPath,
  SvgProps,
} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg width="25" height="25" viewBox="0 0 25 25" {...props}>
      <Defs>
        <ClipPath id="clip-path">
          <Rect
            id="Rectangle_9015"
            data-name="Rectangle 9015"
            width="11.811"
            height="10.582"
            fill="#fff"
          />
        </ClipPath>
        <LinearGradient
          id="linear-gradient"
          x1="0.084"
          y1="1.024"
          x2="0.907"
          y2="-0.009"
          gradientUnits="objectBoundingBox">
          <Stop offset="0.08" stopColor="#9945ff" />
          <Stop offset="0.3" stopColor="#8752f3" />
          <Stop offset="0.5" stopColor="#5497d5" />
          <Stop offset="0.6" stopColor="#43b4ca" />
          <Stop offset="0.72" stopColor="#28e0b9" />
          <Stop offset="0.97" stopColor="#19fb9b" />
        </LinearGradient>
        <ClipPath id="clip-Widi_-_Solana_Dark">
          <Rect width="25" height="25" />
        </ClipPath>
      </Defs>
      <G
        id="Widi_-_Solana_Dark"
        data-name="Widi - Solana Dark"
        clipPath="url(#clip-Widi_-_Solana_Dark)">
        <Rect
          id="Rectangle_9016"
          data-name="Rectangle 9016"
          width="23"
          height="23"
          rx="7"
          transform="translate(1 1)"
          fill="#252f6a"
        />
        <G
          id="Solana_Logomark_-_Color"
          data-name="Solana Logomark - Color"
          transform="translate(6.596 7.418)"
          clipPath="url(#clip-path)">
          <Path
            id="Path_9324"
            data-name="Path 9324"
            d="M11.75,8.343,9.8,10.438a.452.452,0,0,1-.331.144H.226A.227.227,0,0,1,.061,10.2L2.012,8.106a.452.452,0,0,1,.33-.144h9.242a.227.227,0,0,1,.165.381ZM9.8,4.125a.452.452,0,0,0-.331-.144H.226a.227.227,0,0,0-.165.381L2.012,6.457a.452.452,0,0,0,.33.144h9.242a.227.227,0,0,0,.165-.381ZM.226,2.62H9.469A.452.452,0,0,0,9.8,2.476L11.75.381A.227.227,0,0,0,11.584,0H2.342a.452.452,0,0,0-.33.144L.061,2.239a.227.227,0,0,0,.165.381Z"
            transform="translate(0)"
            fill="url(#linear-gradient)"
          />
        </G>
      </G>
    </Svg>
  );
};

export default Icon;
