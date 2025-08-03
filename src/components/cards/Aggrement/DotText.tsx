import {memo, PropsWithChildren} from 'react';
import styles from './styles';
import {View} from 'react-native';

const DotText = ({children}: PropsWithChildren) => {
  return (
    <View style={styles.itemRowContainer}>
      <View style={styles.dot} />
      {children}
    </View>
  );
};

export default memo(DotText);
