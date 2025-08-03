import Svg, {G, Path, Defs, Rect, ClipPath, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg width="28" height="25" viewBox="0 0 28 25" {...props}>
      <Defs>
        <ClipPath id="clip-Widi_-_Wallet">
          <Rect width="28" height="25" />
        </ClipPath>
      </Defs>
      <G
        id="Widi_-_Wallet"
        data-name="Widi - Wallet"
        clipPath="url(#clip-Widi_-_Wallet)">
        <G id="wallet-4" transform="translate(-0.853 -1.919)">
          <Path
            id="Path_9187"
            data-name="Path 9187"
            d="M23.9,24.993H5.8A3.559,3.559,0,0,1,2.25,21.438V9.8A3.559,3.559,0,0,1,5.8,6.25H23.9A3.559,3.559,0,0,1,27.456,9.8V21.438A3.559,3.559,0,0,1,23.9,24.993ZM5.8,8.189A1.618,1.618,0,0,0,4.189,9.8V21.438A1.618,1.618,0,0,0,5.8,23.054H23.9a1.618,1.618,0,0,0,1.616-1.616V9.8A1.618,1.618,0,0,0,23.9,8.189Z"
            transform="translate(0 0.994)"
            fill="currentColor"
          />
          <Path
            id="Path_9188"
            data-name="Path 9188"
            d="M16.646,14.293a.646.646,0,1,1,.646-.646A.646.646,0,0,1,16.646,14.293Z"
            transform="translate(4.023 2.969)"
            fill="currentColor"
          />
          <Path
            id="Path_9188_-_Outline"
            data-name="Path 9188 - Outline"
            d="M16.866,15.482a1.616,1.616,0,1,1,1.616-1.616A1.618,1.618,0,0,1,16.866,15.482Z"
            transform="translate(3.804 2.75)"
            fill="currentColor"
          />
          <Path
            id="Path_9189"
            data-name="Path 9189"
            d="M4.189,10.8H2.25v-.6A3.559,3.559,0,0,1,4.889,6.765L19.107,2.974a3.555,3.555,0,0,1,4.471,3.435V8.214H21.639V6.408a1.616,1.616,0,0,0-2.032-1.561L5.388,8.639a1.618,1.618,0,0,0-1.2,1.561Z"
            fill="currentColor"
          />
        </G>
      </G>
    </Svg>
  );
};

export default Icon;
