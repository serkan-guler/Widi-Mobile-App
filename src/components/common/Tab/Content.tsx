import {View, ViewProps} from 'react-native';
import styles from './styles';
import {PropsWithChildren} from 'react';

const Content = ({children, ...props}: PropsWithChildren<ViewProps>) => {
  return (
    <View style={styles.content} {...props}>
      {children}
    </View>
  );
};

export default Content;
