import {Linking} from 'react-native';
import {showAlert} from './alert';
import i18n from '../localization/i18n';

const errorNs = {
  ns: 'errors',
};

const getSolScanUrl = (tx: string) => {
  return `https://solscan.io/tx/${tx}?cluster=mainnet`;
};

export const openURL = async (url: string) => {
  const t = i18n.t;

  try {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.warn('Bu URL desteklenmiyor:', url);
      showAlert(t('error', errorNs), t('unsupportedURL', errorNs));
    }
  } catch (error) {
    console.error('URL açılırken hata oluştu:', error);
    showAlert(t('error', errorNs), t('unknownError', errorNs));
  }
};

export const openSolscan = async (tx: string) => {
  const url = getSolScanUrl(tx);
  await openURL(url);
};
