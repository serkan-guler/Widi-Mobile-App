export type WebsocketMessageType =
  | 'authenticate'
  | 'favorite'
  | 'pong'
  | 'error'
  | 'subscribeToPool'
  | 'pool_update'
  | 'searchToken'
  | 'searchTokenResponse';

export type SocketMessageType<T> = {
  type: WebsocketMessageType;
  payload: T;
  timestamp: string | number;
};
