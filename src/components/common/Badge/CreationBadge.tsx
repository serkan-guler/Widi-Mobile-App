import {memo} from 'react';
import styles from './styles';
import {formatTimestamp} from '../../../utils';
import {Text, View} from 'react-native';

type Props = {
  createdAt?: number;
};

const CreationBadge = ({createdAt}: Props) => {
  return (
    <View style={styles.dayContainer}>
      <Text style={styles.dayText}>
        {createdAt ? formatTimestamp(createdAt) : '-'}
      </Text>
    </View>
  );
};

export default memo(CreationBadge);
