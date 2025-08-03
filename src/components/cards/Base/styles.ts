import {StyleSheet} from 'react-native';
import {BORDER_RADIUS, scaleSize, SPACING} from '../../../constants/dimensions';
import {CARD_COLORS} from '../../../constants/colors';

export default StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.XXL,
    backgroundColor: CARD_COLORS.BACKGROUND,
  },
  headerContainer: {
    padding: SPACING.SM,
    gap: SPACING.SM,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {
    position: 'relative',
    backgroundColor: CARD_COLORS.SECONDARY,
    borderRadius: BORDER_RADIUS.XXL,
    paddingHorizontal: SPACING.SM,
    paddingTop: scaleSize(10),
    paddingBottom: scaleSize(17),
    gap: scaleSize(21),
  },
  contentHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentRowsContainer: {
    gap: scaleSize(8),
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(8),
  },
  fligrant: {
    position: 'absolute',
    bottom: scaleSize(12),
    right: scaleSize(14),
  },
});
