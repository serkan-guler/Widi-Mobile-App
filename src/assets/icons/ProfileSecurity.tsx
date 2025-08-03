import Svg, {G, Path, Defs, Rect, ClipPath, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg width="21" height="22" viewBox="0 0 21 22" {...props}>
      <Defs>
        <ClipPath id="clip-Widi_-_Profile_Security">
          <Rect width="21" height="22" />
        </ClipPath>
      </Defs>
      <G
        id="Widi_-_Profile_Security"
        data-name="Widi - Profile Security"
        clipPath="url(#clip-Widi_-_Profile_Security)">
        <Path
          id="private-account"
          d="M15.245,16.927v-.836A2.544,2.544,0,0,0,12.7,13.551H7.622a2.544,2.544,0,0,0-2.541,2.541v.831A8.459,8.459,0,0,1,10.163,1.694H11.19A4.644,4.644,0,0,1,11.952.168a10.159,10.159,0,1,0,7.977,12.78,4.189,4.189,0,0,1-2,.589A8.529,8.529,0,0,1,15.245,16.927Zm-8.469.993V16.092a.848.848,0,0,1,.847-.847H12.7a.848.848,0,0,1,.847.847v1.827a8.4,8.4,0,0,1-6.775,0ZM18.632,3.388V2.964a2.964,2.964,0,0,0-5.928,0v.423H11.01V9.316a2.544,2.544,0,0,0,2.541,2.541h4.235a2.544,2.544,0,0,0,2.541-2.541V3.388ZM14.4,2.964a1.27,1.27,0,0,1,2.541,0v.423H14.4Zm4.235,6.352a.848.848,0,0,1-.847.847H13.551a.848.848,0,0,1-.847-.847V5.082h5.928Zm-2.117-.847H14.821V6.775h1.694Zm-8.046,0a1.689,1.689,0,0,0,.912,1.494,4.2,4.2,0,0,0,.8,1.892l-.02,0A3.381,3.381,0,0,1,9.315,5.2V7.011a1.688,1.688,0,0,0-.847,1.458Z"
          transform="translate(0.337 0.837)"
          fill="currentColor"
        />
      </G>
    </Svg>
  );
};

export default Icon;
