import {memo, useCallback, useState} from 'react';
import styles from './styles';
import {LayoutChangeEvent, Text, TouchableOpacity, View} from 'react-native';
import {TouchpadLeftIcon} from '../../assets/icons';
import {scaleSize} from '../../constants/dimensions';
import {COLORS} from '../../constants/colors';
import {TouchpadValueType} from '../../types';

type Props = {
  onLayout?: (event: LayoutChangeEvent) => void;
  onPress?: (value: string) => void;
  amount: string;
  decimal?: number;
};

const Touchpad = ({onLayout, onPress, amount, decimal}: Props) => {
  // const [amount, setAmount] = useState<string>(parentAmount || '0');

  const handleAmountChange = useCallback(
    (value: TouchpadValueType) => {
      let newAmount = amount;

      if (value === 'del') {
        newAmount = newAmount.length > 1 ? newAmount.slice(0, -1) : '0';
        if (newAmount.endsWith('.')) {
          newAmount = newAmount.slice(0, -1);
        }
      } else if (value === '.') {
        if (!newAmount.includes('.')) {
          newAmount += '.';
        }
      } else {
        if (newAmount === '0' && !newAmount.includes('.')) {
          newAmount = value.toString();
        } else {
          newAmount += value.toString();
        }
      }

      if (newAmount.includes('.')) {
        const lastCheck = newAmount.split('.');

        const decimals = decimal || 6;

        if (lastCheck[1] && lastCheck[1].length > decimals) {
          newAmount = `${lastCheck[0]}.${lastCheck[1].slice(0, decimals)}`;
        }
      }

      if (onPress) {
        onPress(newAmount);
      }

      // setAmount(newAmount);
    },
    [amount, onPress, decimal],
  );

  return (
    <View style={styles.touchPadContainer} onLayout={onLayout}>
      <View style={styles.touchPadRowContainer}>
        <TouchableOpacity
          style={styles.touchItem}
          onPress={() => handleAmountChange(1)}>
          <Text style={styles.touchPadText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchItem}
          onPress={() => handleAmountChange(2)}>
          <Text style={styles.touchPadText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchItem}
          onPress={() => handleAmountChange(3)}>
          <Text style={styles.touchPadText}>3</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.touchPadRowContainer}>
        <TouchableOpacity
          style={styles.touchItem}
          onPress={() => handleAmountChange(4)}>
          <Text style={styles.touchPadText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchItem}
          onPress={() => handleAmountChange(5)}>
          <Text style={styles.touchPadText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchItem}
          onPress={() => handleAmountChange(6)}>
          <Text style={styles.touchPadText}>6</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.touchPadRowContainer}>
        <TouchableOpacity
          style={styles.touchItem}
          onPress={() => handleAmountChange(7)}>
          <Text style={styles.touchPadText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchItem}
          onPress={() => handleAmountChange(8)}>
          <Text style={styles.touchPadText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchItem}
          onPress={() => handleAmountChange(9)}>
          <Text style={styles.touchPadText}>9</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.touchPadRowContainer}>
        <TouchableOpacity
          style={styles.touchItem}
          onPress={() => handleAmountChange('.')}>
          <Text style={styles.touchPadText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchItem}
          onPress={() => handleAmountChange(0)}>
          <Text style={styles.touchPadText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchItem}
          onPress={() => handleAmountChange('del')}>
          <Text style={styles.touchPadText}>
            <TouchpadLeftIcon
              width={scaleSize(22)}
              height={scaleSize(22)}
              color={COLORS.WHITE}
            />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(Touchpad);
