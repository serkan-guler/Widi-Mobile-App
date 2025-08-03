import Svg, {Path, G, SvgProps, ClipPath, Rect, Defs} from 'react-native-svg';

const Logo = (props: SvgProps) => {
  return (
    <Svg width={'50'} height={'42'} viewBox="0 0 50 42" fill="none" {...props}>
      <Defs>
        <ClipPath id="clip-Widi_-_Main_Logo_Red_">
          <Rect width={50} height={42} />
        </ClipPath>
      </Defs>
      <G
        id="Widi_-_Main_Logo_Red_"
        data-name="Widi - Main Logo (Red)"
        clipPath="url(#clip-Widi_-_Main_Logo_Red_)">
        <Path
          id="widi"
          d="M26.716,19.3H14.37L22.745,35.69h4.911l8.2,16.054H47.989L58.024,31.312H53.409L63.3,11.18H51.168l-2.022,4.043,4.187,8.158-2.166,4.043L45.1,15.223H32.758l.02.039L30.758,19.3l4.187,8.158L32.78,31.5ZM41.133,31.612h4.613l-1.871,3.743,4.187,8.158L45.9,47.556l-6.065-12.2H35.039l3.924-7.99Z"
          transform="translate(-13.834 -10.462)"
          fill="currentColor"
        />
      </G>
    </Svg>
  );
};

export default Logo;
