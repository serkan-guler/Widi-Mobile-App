import Svg, {Path, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 24 24" width="14" height="14" {...props}>
      <Path
        fill="#ffffff"
        d="M12 2C6 3 2 8 2 14c0 5 4 8 9 8s9-3 9-8c0-5-4-10-8-12zM7 14c0-2.21 1.79-4 4-4s4 1.79 4 4h-2c0-1.1-.9-2-2-2s-2 .9-2 2H7z"
      />
    </Svg>
  );
};

export default Icon;
