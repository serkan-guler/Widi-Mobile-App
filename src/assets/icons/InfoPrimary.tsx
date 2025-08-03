import Svg, {G, Path, Rect, SvgProps} from 'react-native-svg';

type Props = SvgProps & {
  containerColor?: string;
  iconColor?: string;
};

const Icon = ({
  containerColor = '#597b00',
  iconColor = '#b8fe03',
  ...props
}: Props) => {
  return (
    <Svg width="18" height="18" viewBox="0 0 18 18" {...props}>
      <G
        id="Group_6264"
        data-name="Group 6264"
        transform="translate(-213 -423.437)">
        <Rect
          id="Rectangle_8568"
          data-name="Rectangle 8568"
          width="18"
          height="18"
          rx="5"
          transform="translate(213 423.437)"
          fill={containerColor}
        />
        <Path
          id="Path_9215"
          data-name="Path 9215"
          d="M.741,6.421a.746.746,0,0,0,.741-.741V.741A.746.746,0,0,0,.741,0,.746.746,0,0,0,0,.741V5.68A.746.746,0,0,0,.741,6.421Z"
          transform="translate(222.741 437.252) rotate(180)"
          fill={iconColor}
        />
        <Path
          id="Path_9216"
          data-name="Path 9216"
          d="M1.9.607A1.141,1.141,0,0,0,1.689.282,1.141,1.141,0,0,0,1.363.074a.988.988,0,0,0-.751,0A1.141,1.141,0,0,0,.286.282,1.141,1.141,0,0,0,.079.607.983.983,0,0,0,0,.983a.983.983,0,0,0,.079.375,1.02,1.02,0,0,0,.207.326,1.141,1.141,0,0,0,.326.207.983.983,0,0,0,.375.079.983.983,0,0,0,.375-.079,1.141,1.141,0,0,0,.326-.207A1.02,1.02,0,0,0,1.9,1.358.983.983,0,0,0,1.976.983.983.983,0,0,0,1.9.607Z"
          transform="translate(222.988 429.592) rotate(180)"
          fill={iconColor}
        />
      </G>
    </Svg>
  );
};

export default Icon;
