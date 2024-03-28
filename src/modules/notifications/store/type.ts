import { Socket } from 'socket.io-client';

export type NotificationState = {
  notifications: any;
  socket?: Socket;
  readMore: boolean;
  ping: boolean;
};

export type NotificationAction = {
  setSocket: (socket: Socket) => void;
  onClickPing: () => void;
  notifyRealtime: (notification: any) => void;
  getSuccess: (notifications: any) => void;
  getMoreSuccess: (notifications: any) => void;
  reset: () => void;
};

export type NotificationStore = NotificationState & NotificationAction;
