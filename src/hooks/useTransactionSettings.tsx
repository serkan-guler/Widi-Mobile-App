import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {TransactionContext} from '../contexts/transaction';

export const useTransactionSettings = () => {
  const context = useContext(TransactionContext);
  const {t} = useTranslation('errors');

  if (!context) {
    throw new Error(t('context', {context: 'Transaction'}));
  }
  return context;
};
