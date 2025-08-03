import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {WalletContext} from '../contexts/wallet';

export const useWallet = () => {
  const context = useContext(WalletContext);
  const {t} = useTranslation('errors');

  if (!context) {
    throw new Error(t('context', {context: 'Wallet'}));
  }

  return context;
};
