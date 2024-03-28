import { SocketEvent, socketIO } from '@/lib/socket-io';
import { ReactNode, useCallback, useEffect } from 'react';
import { useAuthStore } from '~auth/store';
import { useNotificationStore } from '~notifications/store';

/**
 * SocketProvider manages socket.io for real-time notifications.
 * Creates/connects socket based on user login, disconnects on logout.
 * Handles incoming notifications and updates app state.
 *
 * @param {Object} children - React components to access socket/notifications.
 * @returns {JSX.Element} - Wrapped children components.
 */
export const SocketProvider = ({ children }: Readonly<{ children: ReactNode }>): JSX.Element => {
  const { socket, notifyRealtime, setSocket, reset } = useNotificationStore();
  const { user: sessionUser } = useAuthStore();

  const handleNotiRealtime = useCallback(
    (data: { time: string; notifications: any }) => {
      console.log(data);
      notifyRealtime(data.notifications);
    },
    [notifyRealtime],
  );

  useEffect(() => {
    if (sessionUser && !socket) {
      const socketInstance = socketIO(sessionUser.accessToken);

      socketInstance.on(SocketEvent.newOrderAdmin, handleNotiRealtime);
      socketInstance.on(SocketEvent.allUserRoom, handleNotiRealtime);
      socketInstance.on(SocketEvent.userIdRoom(sessionUser.user._id), handleNotiRealtime);
      socketInstance.on(SocketEvent.roleRoom(sessionUser.user.role), handleNotiRealtime);

      setSocket(socketInstance);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionUser]);

  useEffect(() => {
    if (!sessionUser && socket?.connected) {
      reset();
      socket.disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket?.connected, sessionUser]);

  return <>{children}</>;
};
