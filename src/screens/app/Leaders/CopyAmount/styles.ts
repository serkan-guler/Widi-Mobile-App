import {Dimensions, StyleSheet} from 'react-native';
import {
  BORDER_WIDTH,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../../constants/dimensions';
import {FONTS} from '../../../../constants/fonts';
import {
  BORDER_COLORS,
  COLORS,
  COMPONENT_COLORS,
} from '../../../../constants/colors';

const height = Dimensions.get('window').height * 1.2; // 120% of the screen height

export default StyleSheet.create({
  scrollContainer: {
    backgroundColor: COLORS.DARK,
  },
  contentContainer: {
    flex: 1,
    // paddingHorizontal: SPACING.MD_LG,
    justifyContent: 'space-between',
  },
  padding: {
    paddingHorizontal: SPACING.MD_LG,
  },
  bodyContainer: {
    flex: 1,
    paddingTop: SPACING.MD,
  },
  footerContainer: {
    paddingBottom: scaleSize(41),
    paddingTop: SPACING.MD,
    paddingHorizontal: SPACING.MD_LG,
  },
  footerBlur: {},
  container: {
    flex: 1,
    justifyContent: 'space-between',
    height: height,
    paddingBottom: SPACING.XXL,
    backgroundColor: COLORS.DARK,
  },
  content: {
    flex: 1,
  },
  cardContainer: {
    gap: scaleSize(17),
    marginTop: SPACING.XXXL,
  },
  cardWrapper: {
    gap: SPACING.XS,
  },
  amountContainer: {
    gap: SPACING.XXXL,
    marginTop: SPACING.MD_LG,
  },
  amountWrapper: {
    gap: SPACING.XXXL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountText: {
    fontSize: scaleFont(30),
    lineHeight: scaleFont(38),
    letterSpacing: scaleFont(-0.6),
    fontFamily: FONTS.MEDIUM,
    color: COLORS.WHITE,
  },
  touchPadContainer: {
    marginTop: scaleSize(20),
    gap: scaleSize(20),
  },
  touchPadRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // paddingHorizontal: scaleSize(20),
    // paddingVertical: scaleSize(10),
  },
  touchItem: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: scaleSize(70),
    height: scaleSize(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchPadText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(32),
    lineHeight: scaleFont(39),
    letterSpacing: scaleFont(-0.67),
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});
