import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {DataContext} from '../contexts/data';

export const useData = () => {
  const context = useContext(DataContext);
  const {t} = useTranslation('errors');

  if (!context) {
    throw new Error(t('context', {context: 'Data'}));
  }

  return context;
};
