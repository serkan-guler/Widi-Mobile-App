import Svg, {G, Path, Defs, Rect, ClipPath, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg width="25" height="25" viewBox="0 0 25 25" {...props}>
      <Defs>
        <ClipPath id="clip-path">
          <Rect
            id="Rectangle_2736"
            data-name="Rectangle 2736"
            width="24.043"
            height="24.538"
            fill="none"
          />
        </ClipPath>
        <ClipPath id="clip-Widi_-_Google_Sync">
          <Rect width="25" height="25" />
        </ClipPath>
      </Defs>
      <G
        id="Widi_-_Google_Sync"
        data-name="Widi - Google Sync"
        clipPath="url(#clip-Widi_-_Google_Sync)">
        <G
          id="Group_6263"
          data-name="Group 6263"
          transform="translate(0.479 0.231)">
          <G id="Group_3958" data-name="Group 3958" clipPath="url(#clip-path)">
            <Path
              id="Path_8381"
              data-name="Path 8381"
              d="M13.833,6.768A10.633,10.633,0,0,1,15.87,3.838,11.852,11.852,0,0,1,22.708.182,11.847,11.847,0,0,1,32.753,2.975c.184.158.229.251.029.447-1.028,1.006-2.039,2.029-3.056,3.046-.1.1-.175.232-.36.062a7.047,7.047,0,0,0-9.471.211,7.827,7.827,0,0,0-2.035,3.106c-.063-.041-.13-.079-.19-.125L13.833,6.768"
              transform="translate(-12.511 0)"
              fill="#e34033"
              fillRule="evenodd"
            />
            <Path
              id="Path_8382"
              data-name="Path 8382"
              d="M17.733,153.184a8.22,8.22,0,0,0,1.5,2.565,7.221,7.221,0,0,0,6.427,2.462,7.778,7.778,0,0,0,3.289-1.147c.1.087.19.18.292.26q1.779,1.389,3.562,2.775a10.2,10.2,0,0,1-4.594,2.511,12.356,12.356,0,0,1-11.237-2.267,11.392,11.392,0,0,1-3.248-4.049l4.006-3.111"
              transform="translate(-12.415 -138.541)"
              fill="#32a350"
              fillRule="evenodd"
            />
            <Path
              id="Path_8383"
              data-name="Path 8383"
              d="M136.182,115.7q-1.781-1.387-3.562-2.775c-.1-.08-.2-.173-.292-.26a6.232,6.232,0,0,0,1.915-2.261,7.87,7.87,0,0,0,.416-1.141c.08-.268.055-.373-.276-.37-1.976.017-3.953.008-5.929.008-.419,0-.419,0-.419-.433,0-1.339.006-2.679-.006-4.019,0-.258.043-.358.334-.357q5.468.016,10.936,0c.2,0,.321.014.355.254a13.452,13.452,0,0,1-1.579,9.048,9.03,9.03,0,0,1-1.893,2.3"
              transform="translate(-115.79 -94.143)"
              fill="#4082ed"
              fillRule="evenodd"
            />
            <Path
              id="Path_8384"
              data-name="Path 8384"
              d="M5.318,78.674l-4.006,3.11a11.1,11.1,0,0,1-1.2-3.872,12.124,12.124,0,0,1,1.027-6.769c.055-.118.124-.23.187-.345l3.836,2.954c.06.046.127.083.19.125a7.75,7.75,0,0,0-.03,4.8"
              transform="translate(0 -64.031)"
              fill="#f2b605"
              fillRule="evenodd"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default Icon;
