import Svg, {G, Path, Defs, Rect, ClipPath, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg width="25" height="25" viewBox="0 0 25 25" {...props}>
      <Defs>
        <ClipPath id="clip-Widi_-_Profile">
          <Rect width="25" height="25" />
        </ClipPath>
      </Defs>
      <G
        id="Widi_-_Profile"
        data-name="Widi - Profile"
        clipPath="url(#clip-Widi_-_Profile)">
        <G id="user-square" transform="translate(-1.011 -1.011)">
          <Path
            id="Path_9179"
            data-name="Path 9179"
            d="M18.334,2H8.688C4.5,2,2,4.5,2,8.688v9.646c0,3.235,1.485,5.456,4.1,6.3a7.9,7.9,0,0,0,2.59.391h9.646a7.9,7.9,0,0,0,2.59-.391c2.613-.84,4.1-3.062,4.1-6.3V8.688C25.021,4.5,22.524,2,18.334,2Zm4.961,16.334q0,3.695-2.912,4.662a7.608,7.608,0,0,0-6.872-3.764A7.6,7.6,0,0,0,6.639,23H6.627c-1.922-.622-2.9-2.187-2.9-4.65V8.688c0-3.246,1.715-4.961,4.961-4.961h9.646c3.246,0,4.961,1.715,4.961,4.961Z"
            transform="translate(0)"
            fill="currentColor"
          />
          <Path
            id="Path_9180"
            data-name="Path 9180"
            d="M12.543,8a4.127,4.127,0,1,0,4.121,4.121A4.117,4.117,0,0,0,12.543,8Z"
            transform="translate(0.97 0.906)"
            fill="currentColor"
          />
        </G>
      </G>
    </Svg>
  );
};

export default Icon;
