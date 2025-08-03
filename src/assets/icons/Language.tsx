import Svg, {G, Path, Defs, Rect, ClipPath, SvgProps} from 'react-native-svg';

const Icon = (props: SvgProps) => {
  return (
    <Svg width="18" height="19" viewBox="0 0 18 19" {...props}>
      <Defs>
        <ClipPath id="clip-Widi_-_Language_EN_">
          <Rect width="18" height="19" />
        </ClipPath>
      </Defs>
      <G
        id="Widi_-_Language_EN_"
        data-name="Widi - Language (EN)"
        clipPath="url(#clip-Widi_-_Language_EN_)">
        <Path
          id="english"
          d="M15.744,3h-1.5v-.75A2.252,2.252,0,0,0,12,0H2.249A2.252,2.252,0,0,0,0,2.249V13.387a1.621,1.621,0,0,0,2.5,1.34l2-1.33v2.348h8.02l2.971,1.981a1.621,1.621,0,0,0,2.5-1.34V5.248A2.252,2.252,0,0,0,15.744,3ZM1.671,13.479c-.037.059-.2-.029-.172-.092V2.249a.751.751,0,0,1,.75-.75H12a.75.75,0,0,1,.75.75v9H5.021Zm14.823,2.907c.029.064-.137.152-.172.092l-3.349-2.233H6v-1.5h8.247V4.5h1.5a.75.75,0,0,1,.75.75V16.385ZM6.372,9H3.748V3.749H6.372v1.2H4.948v.825H6.372v1.2H4.948V7.8H6.372V9ZM8.242,9H7.122V3.749H8.242v.006L9.5,6.414V3.749H10.62V9H9.5L8.242,6.338Z"
          transform="translate(0.006 0.501)"
          fill="currentColor"
        />
      </G>
    </Svg>
  );
};

export default Icon;
