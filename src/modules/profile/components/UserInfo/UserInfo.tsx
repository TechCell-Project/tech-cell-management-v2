import { useQuery } from '@tanstack/react-query';
import { useProfileStore } from '~profile/store';
import { getProfileApi } from '~profile/apis';

export const UserInfo = () => {
  const { profile, setProfile } = useProfileStore();

  const { data: dataProfile, isSuccess } = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => getProfileApi(),
  });

  if (isSuccess) {
    setProfile(dataProfile.data)
  }

  return profile && <></>;
};
