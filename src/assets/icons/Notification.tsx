import Svg, {G, Path, Defs, Rect, ClipPath, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg width="18" height="21" viewBox="0 0 18 21" {...props}>
      <Defs>
        <ClipPath id="clip-Widi_-_Notification_Bell">
          <Rect width="18" height="21" />
        </ClipPath>
      </Defs>
      <G
        id="Widi_-_Notification_Bell"
        data-name="Widi - Notification Bell"
        clipPath="url(#clip-Widi_-_Notification_Bell)">
        <Path
          id="bell"
          d="M18.829,11.783l-1.572-5.9A7.757,7.757,0,0,0,9.626.005,7.8,7.8,0,0,0,2.3,6.3L1.084,12A4.452,4.452,0,0,0,1.9,15.635a4.075,4.075,0,0,0,3.227,1.614h.922A4.183,4.183,0,0,0,10.1,20.7a4.183,4.183,0,0,0,4.054-3.454h.693a4.081,4.081,0,0,0,3.293-1.7,4.459,4.459,0,0,0,.692-3.763ZM10.1,18.974a2.491,2.491,0,0,1-2.33-1.725h4.659a2.491,2.491,0,0,1-2.33,1.725ZM16.82,14.5a2.43,2.43,0,0,1-1.976,1.022H5.122a2.445,2.445,0,0,1-1.935-.968,2.671,2.671,0,0,1-.487-2.18L3.916,6.669A6.126,6.126,0,0,1,9.67,1.728a6.093,6.093,0,0,1,5.994,4.621l1.572,5.9A2.655,2.655,0,0,1,16.82,14.5Z"
          transform="translate(-0.981 0.147)"
          fill="currentColor"
        />
      </G>
    </Svg>
  );
};

export default Icon;
