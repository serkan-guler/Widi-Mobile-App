import Clipboard from '@react-native-clipboard/clipboard';
import {showAlert} from './alert';
import i18n from '../localization/i18n';

export const copyToClipboard = (text: string) => {
  Clipboard.setString(text);
  showAlert(i18n.t('copied'), i18n.t('copiedMessage'));
};

export const fetchCopiedText = async () => {
  try {
    const text = await Clipboard.getString();
    return text;
  } catch (error) {
    showAlert('error', i18n.t('clipboardError', {ns: 'errors'}));
  }
};
