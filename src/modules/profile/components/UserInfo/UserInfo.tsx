import { useQuery } from '@tanstack/react-query';
import { useProfileStore } from '~profile/store';
import { getProfileApi } from '~profile/apis';
import { useEffect } from 'react';

export const UserInfo = () => {
  const { profile, setProfile } = useProfileStore();

  const { data: dataProfile, isSuccess } = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => getProfileApi(),
  });

  useEffect(() => {
    if (isSuccess) setProfile(dataProfile.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return profile && <></>;
};
