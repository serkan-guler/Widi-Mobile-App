import Svg, {G, Path, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => (
  <Svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    {...props}>
    <G id="Lock">
      <G>
        <Path d="M17.44,9.33h-1.1V6.4a4.34,4.34,0,0,0-8.68,0V9.33H6.56a2.5,2.5,0,0,0-2.5,2.5v7.61a2.507,2.507,0,0,0,2.5,2.5H17.44a2.507,2.507,0,0,0,2.5-2.5V11.83A2.5,2.5,0,0,0,17.44,9.33ZM8.66,6.4a3.34,3.34,0,0,1,6.68,0V9.33H8.66ZM18.94,19.44a1.511,1.511,0,0,1-1.5,1.5H6.56a1.511,1.511,0,0,1-1.5-1.5V11.83a1.5,1.5,0,0,1,1.5-1.5H17.44a1.5,1.5,0,0,1,1.5,1.5Z" />
        <Path d="M13,14.95a.984.984,0,0,1-.5.86v1.5a.5.5,0,0,1-1,0v-1.5a.984.984,0,0,1-.5-.86,1,1,0,0,1,2,0Z" />
      </G>
    </G>
  </Svg>
);

export default Icon;
