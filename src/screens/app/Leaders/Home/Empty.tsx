import {memo} from 'react';
import styles from './styles';
import {Text, View} from 'react-native';

type Props = {
  label: string;
};

const EmptyCart = ({label}: Props) => {
  return (
    <View style={styles.noFavoritesContainer}>
      <Text style={styles.noFavoritesText}>{label}</Text>
    </View>
  );
};

export default memo(EmptyCart);
