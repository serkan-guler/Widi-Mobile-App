import {useContext} from 'react';
import {SessionContext} from '../contexts/session';
import {useTranslation} from 'react-i18next';

export const useSession = () => {
  const context = useContext(SessionContext);
  const {t} = useTranslation('errors');

  if (!context) {
    throw new Error(t('context', {context: 'Session'}));
  }

  return context;
};
