import {useContext} from 'react';
import {WebSocketContext} from '../contexts/socket';
import {useTranslation} from 'react-i18next';

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  const {t} = useTranslation('errors');

  if (!context) {
    throw new Error(t('context', {context: 'WebSocket'}));
  }
  return context;
};
