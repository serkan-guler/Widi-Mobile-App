import {memo} from 'react';
import styles from '../styles';
import {Text, View} from 'react-native';
import {Layout, BaseButton, Header} from '../../../components';
import {useTranslation} from 'react-i18next';
import {AuthStackScreenProps} from '../../../types';
import {SCREEN_NAMES} from '../../../constants/navigation';

const PageOne = ({navigation}: AuthStackScreenProps<'Onboarding'>) => {
  const {t} = useTranslation(['common', 'content']);

  return (
    <Layout>
      <Header
        showLogo
        onPressBack={navigation.canGoBack() ? navigation.goBack : undefined}
      />
      <View style={styles.container}>
        <View style={styles.divider} />
        <Text style={styles.titleOne}>{t('content:onboarding1Title')}</Text>
        <Text style={[styles.textSecondaryOne, styles.maxWidth]}>
          {t('content:onboarding1Description1')}
        </Text>
        <Text style={[styles.textSecondaryOne, styles.maxWidth]}>
          {t('content:onboarding1Description2')}
        </Text>
        <View style={styles.buttonContainer}>
          <BaseButton
            label={t('getStarted')}
            wFull
            onPress={() =>
              navigation.navigate(SCREEN_NAMES.AUTH.CONNECT_ACCOUNT)
            }
          />
        </View>
      </View>
    </Layout>
  );
};

export default memo(PageOne);
