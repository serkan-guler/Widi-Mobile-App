import {memo} from 'react';
import styles from './styles';
import {ActivityIndicator, Platform, Text, View} from 'react-native';
import {scaleSize} from '../../constants/dimensions';
import {COLORS} from '../../constants/colors';
import {useTranslation} from 'react-i18next';

const PageLoading = () => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={Platform.OS === 'ios' ? 'large' : scaleSize(48)}
        color={COLORS.PRIMARY}
      />
      <Text style={styles.text}>{t('loading')}</Text>
    </View>
  );
};

export default memo(PageLoading);
