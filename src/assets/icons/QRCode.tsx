import Svg, {G, Path, Defs, Rect, ClipPath, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" {...props}>
      <Defs>
        <ClipPath id="clip-Widi_-_QR_Code_Scanner">
          <Rect width="20" height="20" />
        </ClipPath>
      </Defs>
      <G
        id="Widi_-_QR_Code_Scanner"
        data-name="Widi - QR Code Scanner"
        clipPath="url(#clip-Widi_-_QR_Code_Scanner)">
        <Path
          id="qr-3"
          d="M3,8.25H8.25V3H3ZM4.5,4.5H6.75V6.75H4.5ZM15,3H9.75V8.25H15ZM13.5,6.75H11.25V4.5H13.5ZM3,15H8.25V9.75H3Zm1.5-3.75H6.75V13.5H4.5ZM2.25,16.5h3V18h-3A2.253,2.253,0,0,1,0,15.75v-3H1.5v3A.751.751,0,0,0,2.25,16.5ZM16.5,12.75H18v3A2.253,2.253,0,0,1,15.75,18h-3V16.5h3a.751.751,0,0,0,.75-.75ZM18,2.25v3H16.5v-3a.751.751,0,0,0-.75-.75h-3V0h3A2.253,2.253,0,0,1,18,2.25Zm-16.5,3H0v-3A2.253,2.253,0,0,1,2.25,0h3V1.5h-3a.751.751,0,0,0-.75.75Zm8.25,7.5H12V15H9.75Zm3-.75V9.75H15V12Zm-3-2.25H12V12H9.75Z"
          transform="translate(1 1)"
          fill="currentColor"
        />
      </G>
    </Svg>
  );
};

export default Icon;
