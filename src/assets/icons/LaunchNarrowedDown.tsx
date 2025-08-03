import Svg, {G, Path, Defs, Rect, ClipPath, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg width="22" height="23" viewBox="0 0 22 23" {...props}>
      <Defs>
        <ClipPath id="clip-Widi_-_Turn_Left">
          <Rect width="22" height="23" />
        </ClipPath>
      </Defs>
      <G
        id="Widi_-_Turn_Left"
        data-name="Widi - Turn Left"
        clipPath="url(#clip-Widi_-_Turn_Left)">
        <G
          id="Group_6265"
          data-name="Group 6265"
          transform="translate(354 -66.5) rotate(90)">
          <G id="receive-square" transform="translate(66 331)">
            <Path
              id="Path_9231"
              data-name="Path 9231"
              d="M15,22.75H9c-2.77,0-4.647-.586-5.905-1.845S1.25,17.77,1.25,15V9c0-2.77.586-4.647,1.845-5.905S6.23,1.25,9,1.25h6c2.77,0,4.647.586,5.905,1.845S22.75,6.23,22.75,9v6c0,2.77-.586,4.647-1.845,5.905S17.77,22.75,15,22.75Zm-6-20c-2.346,0-3.886.447-4.845,1.405S2.75,6.654,2.75,9v6c0,2.346.447,3.886,1.405,4.845S6.654,21.25,9,21.25h6c2.346,0,3.886-.447,4.845-1.405S21.25,17.346,21.25,15V9c0-2.346-.447-3.886-1.405-4.845S17.346,2.75,15,2.75Z"
              fill="currentColor"
            />
            <Path
              id="Union_2"
              data-name="Union 2"
              d="M-2003.47,5916.37a.751.751,0,0,1,0-1.061l4.377-4.377h-2.432a.75.75,0,0,1-.75-.75.75.75,0,0,1,.75-.75h4.242a.747.747,0,0,1,.38.1h0l.013.008,0,0,.01.006.006,0,.008,0,.008.006.006,0,.009.006.005,0,.009.007.006,0,.008.007.006,0,.008.007.006.005.008.007.007.006.006.006.013.013a.744.744,0,0,1,.22.53v4.242a.75.75,0,0,1-.75.75.75.75,0,0,1-.75-.75v-2.432l-4.376,4.377a.751.751,0,0,1-.531.219A.751.751,0,0,1-2003.47,5916.37Z"
              transform="translate(2012.111 -5900.525)"
              fill="currentColor"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default Icon;
