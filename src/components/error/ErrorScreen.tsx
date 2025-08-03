import {memo} from 'react';
import styles from './styles';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';

type Props = {
  message?: string;
  onRetry: () => void;
};

const ErrorScreen = ({message, onRetry}: Props) => {
  const {t} = useTranslation(['common', 'errors']);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('errors:error')}</Text>
      <Text style={styles.description}>{t('errors:unknownError')}</Text>
      {message && <Text style={styles.message}>{message}</Text>}
      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.text}>{t('common:retry')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(ErrorScreen);
