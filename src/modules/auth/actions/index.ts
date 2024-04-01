import { refreshApi } from '../apis';

export const refreshAction = async (refreshToken: string) => {
  try {
    const { data } = await refreshApi(refreshToken);
    return data;
  } catch (error) {
    throw new Error();
  }
};
