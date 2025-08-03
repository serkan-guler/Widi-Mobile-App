import {memo, useCallback, useState} from 'react';
import styles from './styles';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  BaseButton,
  Header,
  Input,
  Layout,
  Notification,
} from '../../../../components';
import {AppStackScreenProps} from '../../../../types';
import {SCREEN_NAMES} from '../../../../constants/navigation';
import {checkPortfolioCodeService} from '../../../../services';

const PrivateCodeScreen = ({
  route,
  navigation,
}: AppStackScreenProps<'PrivateCode'>) => {
  const {t} = useTranslation(['common', 'content', 'errors']);

  const [code, setCode] = useState('');
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePress = useCallback(async () => {
    setIsSubmitting(true);
    if (code.length < 3 || code.length > 10) {
      setError(t('zod:errors.private_code_invalid_length'));
    } else {
      const response = await checkPortfolioCodeService(route.params.id, code);

      if (response.status === 'error') {
        setError(response.message);
      } else {
        setError(undefined);
        navigation.navigate(SCREEN_NAMES.APP.COPY_AMOUNT, route.params);
      }
    }
    setIsSubmitting(false);
  }, [code, route.params.id, navigation, t]);

  return (
    <Layout>
      <Header title="" onPressBack={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>{t('common:code')}</Text>
          <Text style={styles.description}>{t('content:privateCopyText')}</Text>
          <View style={styles.inputWrapper}>
            <Input
              placeholder={t('common:code')}
              value={code}
              onChangeText={setCode}
              autoCapitalize="words"
            />
            <TouchableOpacity style={styles.pasteButton}>
              <Text style={styles.pasteText}>{t('common:paste')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.submitContainer}>
          {error && error.length > 0 && (
            <View style={styles.notificationContainer}>
              <Notification type="error" message={error} />
            </View>
          )}
          <BaseButton
            label={t('common:continue')}
            disabled={isSubmitting || code.length < 3}
            isLoading={isSubmitting}
            onPress={handlePress}
          />
        </View>
      </View>
    </Layout>
  );
};

export default memo(PrivateCodeScreen);
