import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { NotificationState, NotificationStore } from './type';
import { Socket } from 'socket.io-client';

const initialState: NotificationState = {
  notifications: [],
  socket: undefined,
  readMore: true,
  ping: false,
};

export const useNotificationStore = create<NotificationStore>()(
  immer((set) => ({
    ...initialState,
    setSocket: (socket: Socket) => {
      set((state) => {
        state.socket = socket as any;
      });
    },
    onClickPing: () => {
      set((state) => {
        state.ping = false;
      });
    },
    notifyRealtime: (notification: any) => {
      set((state) => {
        state.notifications = [notification, ...state.notifications];
        state.ping = true;
      });
    },
    getSuccess: (notifications) => {},
    getMoreSuccess: (notifications) => {},
    reset: () => {
      set(initialState);
    },
  })),
);
