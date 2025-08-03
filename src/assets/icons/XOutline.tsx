import Svg, {Path, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 24 24"
      {...props}>
      <Path
        d="M 2.5 3 L 9.8652344 13.197266 L 3.4414062 21 L 4.7363281 21 L 10.470703 14.037109 L 15.5 21 L 21.5 21 L 13.666016 10.154297 L 19.558594 3 L 18.263672 3 L 13.060547 9.3164062 L 8.5 3 L 2.5 3 z M 4.4550781 4 L 7.9882812 4 L 19.544922 20 L 16.011719 20 L 4.4550781 4 z"
        fill={'#fff'}
      />
    </Svg>
  );
};

export default Icon;
