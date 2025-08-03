import Svg, {G, Path, Defs, Rect, ClipPath, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Defs>
        <ClipPath id="clip-Widi_-_X_Connect">
          <Rect width="24" height="24" />
        </ClipPath>
      </Defs>
      <G
        id="Widi_-_X_Connect"
        data-name="Widi - X Connect"
        clipPath="url(#clip-Widi_-_X_Connect)">
        <G
          id="Group_6262"
          data-name="Group 6262"
          transform="translate(-169 -470.665)">
          <G
            id="Group_5931"
            data-name="Group 5931"
            transform="translate(169 471.001)">
            <G
              id="Group_4908"
              data-name="Group 4908"
              transform="translate(0 0)">
              <Rect
                id="Rectangle_3049"
                data-name="Rectangle 3049"
                width="24"
                height="24"
                rx="7"
                transform="translate(0 -0.336)"
                fill="#0019fe"
              />
            </G>
          </G>
          <Path
            id="icons8-twitter-384"
            d="M2.367,3l3.96,5.66L2.575,13.047H4.049L6.987,9.6,9.4,13.047h3.857L9.111,7.116,12.622,3H11.171L8.453,6.174,6.236,3ZM4.51,4.116H5.654l5.457,7.814H9.977Z"
            transform="translate(173.022 474.81)"
            fill="#fff"
          />
        </G>
      </G>
    </Svg>
  );
};

export default Icon;
