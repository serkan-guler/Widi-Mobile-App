import styles from './styles';
import {View, FlatList, FlatListProps} from 'react-native';

const FlatContent = <T,>(props: FlatListProps<T>) => {
  return (
    <View style={styles.scrollContainer}>
      <FlatList<T>
        contentContainerStyle={styles.flatList}
        keyExtractor={(_, index) => index.toString()}
        keyboardShouldPersistTaps="handled"
        indicatorStyle="white"
        {...props}
      />
    </View>
  );
};

export default FlatContent;
