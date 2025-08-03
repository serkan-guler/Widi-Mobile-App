import React, {
  createContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import {AppState, AppStateStatus, Platform} from 'react-native';
import {WS_URL} from '@env';
import {socketMessageSchema} from '../validations/socket';
import {
  PoolInfo,
  TokenResponse,
  SocketMessageType,
  WebSocketContextType,
  WebsocketMessageType,
  Trade,
} from '../types';
import {useSession} from '../hooks';
import EventEmitter from 'eventemitter3';
import {getToken} from '../lib/store';

export const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  isConnected: false,
  sendMessage: () => {},
  closeSocket: () => {},
  onPool: (poolId: string, callback: (data: PoolInfo) => void) => {},
  offPool: (poolId: string, callback: (data: PoolInfo) => void) => {},
  onTransaction: (wallet: string, callback: (data: Trade) => void) => {},
  offTransaction: (wallet: string, callback: (data: Trade) => void) => {},
  onTokenSearchResult: (callback: (data: TokenResponse[]) => void) => {},
  offTokenSearchResult: (callback: (data: TokenResponse[]) => void) => {},
});

export const WebSocketProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const {deviceId, sessionIsLoading} = useSession();
  const [isConnected, setIsConnected] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 5;

  const emitterRef = useRef(new EventEmitter());

  const connectWebSocket = useCallback(async () => {
    if (!deviceId) return;
    const token = await getToken();

    const socket = new WebSocket(WS_URL, [], {
      headers: {
        'X-App-Type': 'mobile',
        'X-Client-Type': 'mobile-app',
        'User-Agent': 'com.widi.app/1.0.0 (React Native)',
      },
    });

    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
      retryCountRef.current = 0;

      socket.send(
        JSON.stringify({
          type: 'authenticate',
          payload: {token, deviceId},
        }),
      );

      setTimeout(() => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
          socketRef.current.send(
            JSON.stringify({
              type: 'ping',
              payload: {timestamp: Date.now()},
            }),
          );
        }
      }, 1000);

      // startPing();
    };

    socket.onmessage = event => {
      try {
        const data = JSON.parse(event.data);

        const result = socketMessageSchema.safeParse(data);
        if (!result.success) {
          console.warn('❌ WS mesaj doğrulama hatası:', result.error);
          return;
        }

        if (
          result.data.type === 'error' &&
          result.data.payload === 'auth_required'
        ) {
          console.warn('⚠️ AUTH eksik, bağlantı kapatılıyor');
          socket.close();
        }

        if (result.data.type === 'pool_update') {
          const message = result.data as SocketMessageType<PoolInfo>;
          emitterRef.current.emit(
            `pool:${message.payload.poolId}`,
            message.payload,
          );
        }

        if (result.data.type === 'transaction_update') {
          const message = result.data as SocketMessageType<Trade>;
          emitterRef.current.emit(
            `transaction:${message.payload.wallet}`,
            message.payload,
          );
        }

        if (result.data.type === 'searchTokenResponse') {
          const message = result.data as SocketMessageType<TokenResponse[]>;
          emitterRef.current.emit('searchTokenResponse', message.payload);
        }
      } catch (error) {
        console.warn('❌ WS JSON parse hatası:', error);
      }
    };

    socket.onerror = e => {
      console.warn('❌ WS hata:', e.message);
      cleanupSocket();
      retryConnection();
    };

    socket.onclose = () => {
      console.warn('🔌 WS bağlantısı kapandı');
      cleanupSocket();
      retryConnection();
    };
  }, [deviceId]);

  const cleanupSocket = () => {
    // stopPing();
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.close();
    }
    setIsConnected(false);
    socketRef.current = null;
  };

  const onPool = (poolId: string, callback: (data: PoolInfo) => void) => {
    emitterRef.current.on(`pool:${poolId}`, callback);
  };

  const offPool = (poolId: string, callback: (data: PoolInfo) => void) => {
    emitterRef.current.off(`pool:${poolId}`, callback);
  };

  const onTransaction = (wallet: string, callback: (data: Trade) => void) => {
    emitterRef.current.on(`transaction:${wallet}`, callback);
  };

  const offTransaction = (wallet: string, callback: (data: Trade) => void) => {
    emitterRef.current.off(`transaction:${wallet}`, callback);
  };

  const onTokenSearchResult = (callback: (data: TokenResponse[]) => void) => {
    emitterRef.current.on('searchTokenResponse', callback);
  };
  const offTokenSearchResult = (callback: (data: TokenResponse[]) => void) => {
    emitterRef.current.off('searchTokenResponse', callback);
  };

  const retryConnection = () => {
    if (retryCountRef.current >= MAX_RETRIES) {
      console.warn('❌ Maksimum yeniden bağlanma denemesi aşıldı');
      return;
    }

    retryCountRef.current += 1;
    reconnectTimeoutRef.current = setTimeout(() => {
      connectWebSocket();
    }, 3000 * retryCountRef.current); // artan aralıklarla dene
  };

  useEffect(() => {
    if (!sessionIsLoading && deviceId) {
      connectWebSocket();
    }

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (
          !socketRef.current ||
          socketRef.current.readyState !== WebSocket.OPEN
        ) {
          connectWebSocket();
        }
      }
      appStateRef.current = nextAppState;
    };

    const appStateSub = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      appStateSub.remove();
      // stopPing();
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [deviceId, sessionIsLoading, connectWebSocket]);

  const sendMessage = (type: WebsocketMessageType, payload: unknown) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({type, payload}));
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        socket: socketRef.current,
        isConnected,
        sendMessage,
        closeSocket: cleanupSocket,
        onPool,
        offPool,
        onTransaction,
        offTransaction,
        onTokenSearchResult,
        offTokenSearchResult,
      }}>
      {children}
    </WebSocketContext.Provider>
  );
};
