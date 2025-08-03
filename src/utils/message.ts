import {AppResponseType} from '../types';
import i18n from '../localization/i18n';

export const customErrorMessage = <T>(message: string): AppResponseType<T> => ({
  status: 'error',
  message,
  error: {
    message,
    logs: [message],
  },
});

export const unknownErrorMessage = <T>() =>
  customErrorMessage<T>(i18n.t('unknownError', {ns: 'errors'}));
