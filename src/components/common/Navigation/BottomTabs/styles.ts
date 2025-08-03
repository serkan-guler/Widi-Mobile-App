import {StyleSheet} from 'react-native';
import {
  BORDER_WIDTH,
  FONT_SIZES,
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
    backgroundColor: COLORS.DARK,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: BORDER_WIDTH.THIN,
    borderTopColor: BORDER_COLORS.LIGHT,
    // padding: SPACING.SM,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingTop: scaleSize(10),
    // paddingBottom: SPACING.SM,
    // paddingHorizontal: SPACING.SM,
    borderRadius: scaleSize(23),
    gap: scaleSize(10),
  },
  active: {
    backgroundColor: COMPONENT_COLORS.PRIMARY_BUTTON.DISABLED,
  },
  buttonText: {
    fontFamily: FONTS.ULTRABOLD,
    // fontSize: FONT_SIZES.SM,
    // lineHeight: scaleFont(19),
    color: COLORS.PRIMARY,
  },
});
