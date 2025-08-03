import {memo} from 'react';
import styles from './styles';
import {View} from 'react-native';
import {
  FilterButton,
  Header,
  PageHeaderCard,
  ScrollLayout,
} from '../../../../components';
import {AppStackScreenProps} from '../../../../types';
import {useTranslation} from 'react-i18next';
import {SUPPORTED_LANGUAGES} from '../../../../localization/i18n';

const LanguageScreen = ({navigation}: AppStackScreenProps<'Language'>) => {
  const {t, i18n} = useTranslation(['navigation', 'common', 'content']);

  return (
    <ScrollLayout>
      <Header
        title={t('navigation:language')}
        onPressBack={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <PageHeaderCard title={t('content:languages')} />
        {SUPPORTED_LANGUAGES.map((lang, index) => (
          <FilterButton
            key={index}
            title={t(`common:${lang}`)}
            selected={i18n.language === lang}
            onPress={async () => {
              await i18n.changeLanguage(lang);
              navigation.goBack();
            }}
          />
        ))}
      </View>
    </ScrollLayout>
  );
};

export default memo(LanguageScreen);
