import i18n, {LanguageDetectorAsyncModule} from 'i18next';
import {initReactI18next} from 'react-i18next';
import HttpBackend, {HttpBackendOptions} from 'i18next-http-backend';
import {API_URL} from '@env';
import {NativeModules, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// export const SUPPORTED_LANGUAGES = ['en', 'tr', 'zh-CN', 'zh-TW'];
export const SUPPORTED_LANGUAGES = ['en', 'tr'];

const LANGUAGE_STORAGE_KEY = 'user-language';

const getDeviceLanguage = async (): Promise<string> => {
  try {
    const locale: string = Platform.select({
      ios:
        NativeModules.SettingsManager?.settings?.AppleLocale ||
        NativeModules.SettingsManager?.settings?.AppleLanguages?.[0] ||
        'en',
      android: NativeModules.I18nManager?.localeIdentifier || 'en',
      default: 'en',
    });

    const language = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

    return language || locale.split('_')[0].split('-')[0] || 'en';
  } catch (error) {
    console.warn(
      'Device dili alınamadı, varsayılan olarak en kullanılıyor:',
      error,
    );
    return 'en';
  }
};

const LANGUAGE_DETECTOR: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: async (
    callback: (lng: string | readonly string[] | undefined) => void | undefined,
  ) => {
    try {
      const deviceLang = await getDeviceLanguage();
      const storedLang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      const selectedLang = storedLang || deviceLang;

      callback(selectedLang);
    } catch (error) {
      console.error('❌ Language detection error:', error);
      return 'en';
    }
  },
  cacheUserLanguage: async (language: string) => {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  },
};

// Namespace modüllerini içe aktarma
import commonTR from './namespaces/common/tr';
import commonEN from './namespaces/common/en';
// import commonZH_CN from './namespaces/common/zh-CN';
// import commonZH_TW from './namespaces/common/zh-TW';
import navigationTR from './namespaces/navigation/tr';
import navigationEN from './namespaces/navigation/en';
// import navigationZH_CN from './namespaces/navigation/zh-CN';
// import navigationZH_TW from './namespaces/navigation/zh-TW';
import errorTR from './namespaces/errors/tr';
import errorEN from './namespaces/errors/en';
// import errorZH_CN from './namespaces/errors/zh-CN';
// import errorZH_TW from './namespaces/errors/zh-TW';

const resources = {
  tr: {
    common: commonTR,
    navigation: navigationTR,
    errors: errorTR,
  },
  en: {
    common: commonEN,
    navigation: navigationEN,
    errors: errorEN,
  },
  // zh: {
  //   common: commonZH_CN,
  //   navigation: navigationZH_CN,
  //   errors: errorZH_CN,
  // },
  // 'zh-CN': {
  //   common: commonZH_CN,
  //   navigation: navigationZH_CN,
  //   errors: errorZH_CN,
  // },
  // 'zh-TW': {
  //   common: commonZH_TW,
  //   navigation: navigationZH_TW,
  //   errors: errorZH_TW,
  // },
};

i18n
  .use(HttpBackend)
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init<HttpBackendOptions>(
    {
      resources,
      debug: false,
      supportedLngs: [...SUPPORTED_LANGUAGES, 'zh'],
      fallbackLng: {zh: ['zh-CN'], en: ['en']},
      ns: ['common', 'navigation', 'errors', 'zod'],
      defaultNS: 'common',
      preload: SUPPORTED_LANGUAGES,
      partialBundledLanguages: true,
      updateMissing: true,
      backend: {
        loadPath: `${API_URL}/locales/{{lng}}/{{ns}}.json`,
        requestOptions: {
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      },
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['asyncstorage', 'languageDetector', 'device'],
        caches: ['asyncstorage'],
        asyncStorage: AsyncStorage,
        asyncStorageKey: LANGUAGE_STORAGE_KEY,
        lookupAsyncStorage: true,
        lookupDevice: true,
        // lookupFromPathIndex: 0,
        lookupQuerystring: 'i18nextLng',
        lookupCookie: 'i18nextLng',
      },
    },
    (err, _t) => {
      if (err) {
        console.error('❌ i18n başlatma hatası:', err);
      }
    },
  );

// i18n.on('loaded', loaded => {
//   console.log('📦 i18n yüklenen dil dosyaları:', loaded);
// });

// i18n.on('failedLoading', (lng, ns, msg) => {
//   console.log(`❌ ${lng}/${ns} uzak sunucudan yüklenemedi: ${msg}`);
//   console.log(
//     `🔗 Denenen URL: ${API_URL.replace(/\/$/, '')}/locales/${lng}/${ns}.json`,
//   );
//   console.log('🔄 Local dosyaya geri dönülüyor...');
// });

i18n.on('languageChanged', async lng => {
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
    const storedLang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch (error) {
    console.error("❌ Dil AsyncStorage'a kaydedilemedi:", error);
  }
});

// i18n.on('initialized', options => {
//   console.log('🎯 i18n initialized - language:', i18n.language);
// });

export default i18n;
