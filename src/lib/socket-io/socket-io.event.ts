export const SocketEvent = {
  newOrderAdmin: 'new-order-admin',
  allUserRoom: 'all_user_room',
  userIdRoom: (userId: string) => `user_id_${userId}`,
  roleRoom: (role: string) => `${role}_room`,
  markNotifyAsRead: 'mark-notification-as-read',
};
