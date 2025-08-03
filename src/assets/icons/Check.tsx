import Svg, {Path, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      {...props}>
      <Path
        fill="none"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="44"
        d="M416 128 192 384l-96-96"
      />
    </Svg>
  );
};

export default Icon;
