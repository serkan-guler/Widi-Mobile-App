import {memo} from 'react';
import styles from './styles';
import {Text, TouchableOpacity, View} from 'react-native';

type Props = {
  options?: number[];
  onPress: (percentage: number) => void;
};

const PercentageButtons = ({options = [25, 50, 75, 100], onPress}: Props) => {
  return (
    <View style={styles.percentageContainer}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          style={[styles.percentageButton]}
          onPress={() => onPress(option)}>
          <Text style={[styles.percentageText, styles.fontMedium]}>
            {option}
            <Text style={[styles.percentageText, styles.fontNeue]}>%</Text>
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default memo(PercentageButtons);
