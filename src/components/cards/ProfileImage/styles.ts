import {StyleSheet} from 'react-native';
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  FONT_SIZES,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../constants/dimensions';
import {COLORS} from '../../../constants/colors';
import {FONTS} from '../../../constants/fonts';

export default StyleSheet.create({
  container: {
    height: scaleSize(122),
    borderRadius: BORDER_RADIUS.XXXL,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  coloredContainer: {
    backgroundColor: COLORS.PRIMARY,
  },
  bgImage: {
    height: scaleSize(122),
    borderRadius: BORDER_RADIUS.XXXL,
    width: '100%',
  },
  profileImage: {
    position: 'absolute',
    bottom: scaleSize(-40),
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    position: 'relative',
  },
  editProfileButton: {
    width: scaleSize(25),
    height: scaleSize(25),
    position: 'absolute',
    bottom: scaleSize(-6),
    right: scaleSize(-6),
    backgroundColor: COLORS.PRIMARY,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scaleSize(6),
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: COLORS.DARK,
  },
  imageSize: {
    borderWidth: BORDER_WIDTH.THICK,
    borderColor: COLORS.DARK,
    borderRadius: BORDER_RADIUS.XL,
    width: scaleSize(80),
    height: scaleSize(80),
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // zIndex: 1,
    overflow: 'hidden',
    borderRadius: scaleSize(13),
    // backgroundColor: COLORS.DARK,
  },
  editCoverButton: {
    position: 'absolute',
    top: scaleSize(11),
    right: scaleSize(8),
    zIndex: 1,
    paddingVertical: SPACING.SM,
    paddingHorizontal: scaleSize(9),
    // backgroundColor: COLORS.DARK,
    borderWidth: BORDER_WIDTH.THIN,
    borderColor: '#1D1D1D',
    borderRadius: scaleSize(13),
  },
  editText: {
    color: COLORS.PRIMARY,
    fontSize: FONT_SIZES.XXS,
    lineHeight: scaleFont(12),
    fontFamily: FONTS.REGULAR,
    letterSpacing: scaleFont(-0.17),
  },
});
