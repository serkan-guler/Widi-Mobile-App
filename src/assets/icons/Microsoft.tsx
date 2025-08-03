import Svg, {G, Path, Defs, Rect, ClipPath, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Defs>
        <ClipPath id="clip-Widi_-_Microsoft_Grid">
          <Rect width="24" height="24" />
        </ClipPath>
      </Defs>
      <G
        id="Widi_-_Microsoft_Grid"
        data-name="Widi - Microsoft Grid"
        clipPath="url(#clip-Widi_-_Microsoft_Grid)">
        <G id="microsoft-5" transform="translate(1.07 1.069)">
          <Path
            id="Path_9154"
            data-name="Path 9154"
            d="M10.388,10.388H0V0H10.388Z"
            fill="#f1511b"
          />
          <Path
            id="Path_9155"
            data-name="Path 9155"
            d="M1321.989,10.388H1311.6V0h10.389V10.388Z"
            transform="translate(-1300.13)"
            fill="#80cc28"
          />
          <Path
            id="Path_9156"
            data-name="Path 9156"
            d="M10.388,1322.488H0V1312.1H10.388Z"
            transform="translate(0 -1300.625)"
            fill="#00adef"
          />
          <Path
            id="Path_9157"
            data-name="Path 9157"
            d="M1321.989,1322.488H1311.6V1312.1h10.389v10.388Z"
            transform="translate(-1300.13 -1300.625)"
            fill="#fbbc09"
          />
        </G>
      </G>
    </Svg>
  );
};

export default Icon;
