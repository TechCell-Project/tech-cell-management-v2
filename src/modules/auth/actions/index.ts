import { refreshApi } from '../apis';

export const refreshAction = async () => {
  try {
    const { data } = await refreshApi();
    return data;
  } catch (error) {
    throw new Error();
  }
};
