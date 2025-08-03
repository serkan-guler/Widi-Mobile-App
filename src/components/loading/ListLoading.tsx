import {memo} from 'react';
import styles from './styles';
import {View, Text, ActivityIndicator} from 'react-native';
import {useTranslation} from 'react-i18next';
import {COLORS} from '../../constants/colors';

const ListLoading = () => {
  const {t} = useTranslation('common');
  return (
    <View style={styles.listContainer}>
      <ActivityIndicator color={COLORS.PRIMARY} />
      <Text style={styles.listText}>{t('loading')}</Text>
    </View>
  );
};

export default memo(ListLoading);
