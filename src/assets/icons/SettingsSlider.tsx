import Svg, {G, Path, Defs, Rect, ClipPath, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg width="20" height="13" viewBox="0 0 20 13" {...props}>
      <Defs>
        <ClipPath id="clip-Widi_-_Settings_Slider">
          <Rect width="20" height="13" />
        </ClipPath>
      </Defs>
      <G
        id="Widi_-_Settings_Slider"
        data-name="Widi - Settings Slider"
        clipPath="url(#clip-Widi_-_Settings_Slider)">
        <G id="filter-2" transform="translate(-6.758 -7.509)">
          <Path
            id="Line_11"
            data-name="Line 11"
            d="M2.1-.38H0V-1.5H2.1Z"
            transform="translate(23.734 17.999)"
            fill="currentColor"
          />
          <Path
            id="Line_12"
            data-name="Line 12"
            d="M11.575-.38H0V-1.5H11.575Z"
            transform="translate(7.68 17.999)"
            fill="currentColor"
          />
          <Path
            id="Line_13"
            data-name="Line 13"
            d="M11.116-.38H0V-1.5H11.116Z"
            transform="translate(14.72 12.015)"
            fill="currentColor"
          />
          <Path
            id="Line_14"
            data-name="Line 14"
            d="M2.568-.38H0V-1.5H2.568Z"
            transform="translate(7.68 12.015)"
            fill="currentColor"
          />
          <Path
            id="Ellipse_1456"
            data-name="Ellipse 1456"
            d="M1.3-1.5A2.8,2.8,0,1,1-1.5,1.3,2.8,2.8,0,0,1,1.3-1.5Zm0,4.479A1.68,1.68,0,1,0-.38,1.3,1.682,1.682,0,0,0,1.3,2.979Z"
            transform="translate(11.184 9.66)"
            fill="currentColor"
          />
          <Path
            id="Ellipse_1457"
            data-name="Ellipse 1457"
            d="M1.3-1.5A2.8,2.8,0,1,1-1.5,1.3,2.8,2.8,0,0,1,1.3-1.5Zm0,4.479A1.68,1.68,0,1,0-.38,1.3,1.682,1.682,0,0,0,1.3,2.979Z"
            transform="translate(20.195 15.759)"
            fill="currentColor"
          />
        </G>
      </G>
    </Svg>
  );
};

export default Icon;
