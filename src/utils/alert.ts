import {Alert, AlertButton, AlertOptions} from 'react-native';
import i18n from '../localization/i18n';
import {ErrorResponseWrapper} from '../types';

export const showAlert = (
  title: string,
  message?: string,
  buttons?: AlertButton[],
  options?: AlertOptions,
) => {
  const haveCancelButton = buttons?.some(
    button => button.style === 'cancel' || button.style === 'destructive',
  );

  const defaultCloseButton: AlertButton = {
    text: i18n.t('close'),
    style: 'cancel',
  };

  if (haveCancelButton) {
    options = {
      ...options,
      cancelable: true,
    };
  } else {
    buttons = buttons ? [defaultCloseButton, ...buttons] : [defaultCloseButton];
  }

  if (title === 'success') {
    title = i18n.t('success', {ns: 'common'});
  }

  if (title === 'error') {
    title = i18n.t('error', {ns: 'errors'});
  }

  if (title === 'warning') {
    title = i18n.t('warning', {ns: 'common'});
  }

  if (buttons) {
    buttons = buttons.map(button => {
      if (button.style === 'cancel') {
        return {
          ...button,
          style: 'cancel',
        };
      }
      if (button.style === 'destructive') {
        return {
          ...button,
          style: 'destructive',
        };
      }
      return {
        ...button,
        style: 'default',
      };
    });
  }

  return Alert.alert(
    title,
    message,
    buttons || [
      {
        text: 'OK',
        onPress: () => {},
        style: 'cancel',
      },
    ],
    {userInterfaceStyle: 'dark', ...options},
  );
};

export const showErrorAlert = (
  response: ErrorResponseWrapper,
  buttons?: AlertButton[],
) => showAlert(response.status, response.message, buttons);
