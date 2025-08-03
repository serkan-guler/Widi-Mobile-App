import {useContext} from 'react';
import {AppContext} from '../contexts/app';
import {useTranslation} from 'react-i18next';

export const useApp = () => {
  const context = useContext(AppContext);
  const {t} = useTranslation('errors');

  if (!context) {
    throw new Error(t('context', {context: 'App'}));
  }
  return context;
};
