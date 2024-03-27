import { io } from 'socket.io-client';

export const socketIO = (accessToken: string) => {
  const socket = io(process.env.NEXT_PUBLIC_WS as string, {
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  });

  socket.on('connect', () => {
    console.log('Connected to socket server! 🙃🙃🙃');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected to socket server! 😭😭😭');
  });

  return socket;
};
