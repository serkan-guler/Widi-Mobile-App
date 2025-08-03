import {memo} from 'react';
import styles from './styles';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {RouteSplitIcon} from '../../../assets/icons';
import {COLORS} from '../../../constants/colors';
import {scaleFont} from '../../../constants/dimensions';

type Props = {
  text: string;
} & TouchableOpacityProps;

const SortButton = ({text, ...props}: Props) => {
  const {disabled} = props;
  return (
    <TouchableOpacity
      style={[styles.sortButtonContainer, disabled && styles.disabled]}
      {...props}>
      <Text style={styles.sortLabel}>{text}</Text>
      <RouteSplitIcon
        width={scaleFont(10)}
        height={scaleFont(9)}
        color={COLORS.WHITE}
      />
    </TouchableOpacity>
  );
};

export default memo(SortButton);
