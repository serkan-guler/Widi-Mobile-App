import Svg, {Path, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      {...props}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </Svg>
  );
};

export default Icon;
