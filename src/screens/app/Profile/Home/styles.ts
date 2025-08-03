import {StyleSheet} from 'react-native';
import {
  BORDER_WIDTH,
  FONT_SIZES,
  LINE_HEIGHTS,
  scaleFont,
  scaleSize,
  SPACING,
} from '../../../../constants/dimensions';
import {
  BORDER_COLORS,
  COLORS,
  COMPONENT_COLORS,
} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    gap: scaleSize(33),
    paddingBottom: SPACING.MD_LG,
  },
  headerContainer: {
    // flex: 1,
    gap: scaleSize(14),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scaleSize(7),
    marginTop: scaleSize(40),
  },
  headerTitle: {
    fontSize: FONT_SIZES.XXL,
    lineHeight: scaleFont(34),
    fontFamily: FONTS.MEDIUM,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  headerBio: {
    textAlign: 'center',
    color: COLORS.GRAY,
    fontSize: FONT_SIZES.XS,
    lineHeight: scaleFont(17),
    fontFamily: FONTS.REGULAR,
    marginTop: scaleSize(-14),
  },
  editButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingTop: scaleSize(24),
    paddingBottom: scaleSize(22),
    paddingHorizontal: scaleSize(82),
    borderRadius: scaleSize(31),
  },
  editButtonText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.MD,
    lineHeight: LINE_HEIGHTS.LG,
    color: COLORS.DARK,
  },
  contentContainer: {
    gap: SPACING.SM,
  },
  navigationContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: scaleSize(13),
    paddingTop: scaleSize(9),
    paddingBottom: scaleSize(8),
    paddingRight: scaleSize(14),
    paddingLeft: scaleSize(11),
    gap: scaleSize(11),
  },
  baseContainer: {
    backgroundColor: '#1A1A1A',
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: '#232323',
  },
  dangerContainer: {
    backgroundColor: '#411918',
  },
  leadingContainer: {
    width: scaleSize(46),
    height: scaleSize(46),
  },
  trailingContainer: {
    width: scaleSize(35),
    height: scaleSize(35),
    transform: [{rotate: '180deg'}],
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scaleSize(9),
  },
  baseIcon: {
    borderWidth: BORDER_WIDTH.DEFAULT,
    borderColor: BORDER_COLORS.LIGHT,
    backgroundColor: COMPONENT_COLORS.BUTTON.BACKGROUND,
  },
  dangerIcon: {
    backgroundColor: '#2D0E0D',
  },
  navigationText: {
    fontSize: FONT_SIZES.MD,
    lineHeight: LINE_HEIGHTS.LG,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.WHITE,
    flex: 1,
  },
});
