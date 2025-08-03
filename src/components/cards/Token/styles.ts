import {StyleSheet} from 'react-native';
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  FONT_SIZES,
  LINE_HEIGHTS,
  scaleFont,
  scaleSize,
} from '../../../constants/dimensions';
import {BORDER_COLORS, CARD_COLORS, COLORS} from '../../../constants/colors';
import {FONTS} from '../../../constants/fonts';

export default StyleSheet.create({
  cardLeftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(10),
  },
  logo: {
    position: 'relative',
  },
  size: {
    width: scaleSize(39),
    height: scaleSize(39),
    borderRadius: BORDER_RADIUS.XL,
  },
  cardTitleText: {
    fontSize: scaleFont(14),
    lineHeight: scaleFont(34),
    fontFamily: FONTS.MEDIUM,
    color: COLORS.WHITE,
    marginLeft: scaleSize(4),
  },
  marketContainer: {
    backgroundColor: '#020202',
    borderWidth: BORDER_WIDTH.THIN,
    borderColor: BORDER_COLORS.LIGHT,
    borderRadius: scaleSize(6),
    alignItems: 'center',
    justifyContent: 'center',
    width: scaleSize(25),
    height: scaleSize(25),
  },
  marketImage: {
    width: scaleSize(13),
    height: scaleSize(13),
  },
  navigateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(10),
  },
  navigateButton: {
    backgroundColor: COLORS.DARK,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
    borderRadius: scaleSize(9),
    width: scaleSize(34),
    height: scaleSize(34),
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyText: {
    fontSize: scaleFont(12),
    lineHeight: LINE_HEIGHTS.XXS,
    letterSpacing: scaleFont(-0.24),
    fontFamily: FONTS.MEDIUM,
    color: COLORS.WHITE,
  },
  cardRightHeader: {
    position: 'absolute',
    right: scaleSize(13),
    top: scaleSize(13),
  },
  titleBigText: {
    fontSize: FONT_SIZES.XXL,
    lineHeight: LINE_HEIGHTS.XXXL,
    letterSpacing: scaleFont(-0.5),
    fontFamily: FONTS.MEDIUM,
    color: COLORS.WHITE,
  },
  percentageText: {
    fontSize: FONT_SIZES.XS,
    lineHeight: scaleFont(17),
    fontFamily: FONTS.MEDIUM,
    letterSpacing: scaleFont(-0.26),
    textAlign: 'right',
  },
  percentageDanger: {
    color: '#E70806',
  },
  percentageSuccess: {
    color: '#13FA19',
  },
});
