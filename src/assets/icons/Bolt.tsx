import Svg, {Path, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 24 24" width="14" height="14">
      <Path fill="#ffffff" d="M13 2L3 14h7v8l10-12h-7z" />
    </Svg>
  );
};

export default Icon;
