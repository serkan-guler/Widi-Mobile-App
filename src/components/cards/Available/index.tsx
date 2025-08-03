import {memo} from 'react';
import styles from './styles';
import {AmountType} from '../../../types';
import {ActivityIndicator, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

type Props = {
  amount?: number;
  type?: AmountType | string;
  decimal?: number;
};

const AvailableCard = ({amount, type, decimal}: Props) => {
  const {t} = useTranslation();
  if (amount === undefined || !type) {
    return (
      <View style={[styles.container, styles.isLoading]}>
        <ActivityIndicator size="small" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.textDefault]}>
        {amount.toFixed(decimal || 2)} {type.toUpperCase()}
        <Text style={[styles.text, styles.textSecondary]}>
          {' '}
          - {t('available')}
        </Text>
      </Text>
    </View>
  );
};

export default memo(AvailableCard);
