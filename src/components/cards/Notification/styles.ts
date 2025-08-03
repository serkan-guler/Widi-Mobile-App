import {Dimensions, StyleSheet} from 'react-native';
import {BORDER_COLORS, COLORS, NOTIFICATION} from '../../../constants/colors';
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  FONT_SIZES,
  LINE_HEIGHTS,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../constants/dimensions';
import {FONTS} from '../../../constants/fonts';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    position: 'relative',
  },
  wrapper: {
    backgroundColor: COLORS.TERTIARY,
    borderRadius: BORDER_RADIUS.XXL,
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
    padding: SPACING.SM,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    gap: scaleSize(10),
  },
  imageSize: {
    width: scaleSize(42),
    height: scaleSize(42),
    borderRadius: BORDER_RADIUS.XL,
  },
  imageContainer: {
    backgroundColor: '#003C00',
  },
  detailContainer: {
    flex: 1,
    marginTop: scaleSize(13),
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: scaleFont(16),
    lineHeight: LINE_HEIGHTS.MD,
    letterSpacing: scaleFont(0.32),
    color: NOTIFICATION.SUCCESS.TEXT,
  },
  titleTime: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.XXS,
    lineHeight: scaleFont(13),
    letterSpacing: scaleFont(-0.22),
    color: '#676A6F',
  },
  descriptionText: {
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.XS,
    lineHeight: scaleFont(17),
    color: '#9F9F9F',
  },
  deleteButtonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    right: 0,
    top: 0,
    bottom: 0,
    width: 120, // Genişleme için daha geniş alan
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 0,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: NOTIFICATION.DANGER.BACKGROUND,
    width: scaleSize(45),
    height: scaleSize(45),
    borderRadius: BORDER_RADIUS.LG,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
