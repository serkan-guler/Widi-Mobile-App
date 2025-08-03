import {memo} from 'react';
import styles from './styles';
import {Text, View} from 'react-native';
import {ellipsizeString, formatNumber} from '../../../../utils';
import {useTokenContext} from './context';

const Holders = () => {
  const {holdersData} = useTokenContext();

  return (
    <View style={[styles.holdersWrapper, styles.paddingHorizontal]}>
      {holdersData.map((holder, index) => (
        <View key={index} style={styles.holderContainer}>
          <View style={styles.holderLeftContainer}>
            <View style={styles.indexContainer}>
              <Text style={styles.indexText}>{index + 1}.</Text>
            </View>
            <View style={styles.columnContainer}>
              <Text style={styles.titleText}>
                {ellipsizeString(holder.address, 4, 4)}
              </Text>
            </View>
          </View>
          <View style={[styles.columnContainer, styles.holderRightContainer]}>
            <Text style={[styles.amountText, styles.fontMedium]}>
              {holder.percentage.toFixed(2)}
              <Text style={[styles.amountText, styles.fontNeue]}>%</Text> (
              {formatNumber(holder.amount, 1)})
            </Text>
            <Text style={styles.volumeText}>
              {formatNumber(holder.value.usd, 2)}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default memo(Holders);
