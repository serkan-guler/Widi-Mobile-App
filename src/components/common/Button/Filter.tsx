import {memo} from 'react';
import styles from './styles';
import {Text, TouchableOpacity} from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
  selected: boolean;
};

const SortItemButton = ({title, onPress, selected}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.sortItemButton}>
      <Text
        style={[
          styles.sortItemText,
          selected
            ? styles.sortItemTextSelected
            : styles.SortItemTextUnselected,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(SortItemButton);
