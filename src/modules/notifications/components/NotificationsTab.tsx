import { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Notifications, NotificationsReq, ReadType } from '../models';
import { getNotificationsApi } from '../apis';
import { PaginationResponse } from '@/common/model';
import { NotificationsItem } from './NotificationsItem';

type NotificationsTabProps = {
  type: ReadType;
  onClose: () => void;
};

const getNotifications = async (params: NotificationsReq) => {
  const { data } = await getNotificationsApi(params);
  return data;
};

export const NotificationsTab = memo(({ type, onClose }: NotificationsTabProps) => {
  const { data } = useQuery<PaginationResponse<Notifications>>({
    queryKey: ['get-notifications', { type }],
    queryFn: () => getNotifications(new NotificationsReq()),
  });

  return (
    <div className="mt-5">
      <NotificationsItem />
      <NotificationsItem />
    </div>
  );
});

NotificationsTab.displayName = 'NotificationsTab';
