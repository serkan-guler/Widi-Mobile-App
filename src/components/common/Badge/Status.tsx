import {memo} from 'react';
import styles from './styles';
import {Text, View, TextStyle, ViewStyle} from 'react-native';

type BadgeTypes = 'success' | 'danger';

type Props = {
  label: string;
  type?: BadgeTypes;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const Badge = ({label, type = 'success', containerStyle, textStyle}: Props) => {
  return (
    <View
      style={[
        styles.container,
        type === 'success' ? styles.successContainer : styles.dangerContainer,
        containerStyle,
      ]}>
      <Text
        style={[
          styles.text,
          type === 'success' ? styles.successText : styles.dangerText,
          textStyle,
        ]}>
        {label}
      </Text>
    </View>
  );
};

export default memo(Badge);
