import Svg, {Path, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      {...props}>
      <Path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v.5" />
      <Path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
      <Path d="M8 11v-4a4 4 0 1 1 8 0v4" />
      <Path d="M15 19l2 2l4 -4" />
    </Svg>
  );
};

export default Icon;
