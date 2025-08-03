import {useContext} from 'react';
import {FilterContext} from '../contexts/filter';
import {useTranslation} from 'react-i18next';

export const useFilter = () => {
  const context = useContext(FilterContext);
  const {t} = useTranslation('errors');

  if (!context) {
    throw new Error(t('context', {context: 'Filter'}));
  }
  return context;
};
