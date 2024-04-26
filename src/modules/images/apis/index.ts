import { ImageObj } from '@/common/model';
import { ApiTags } from '@/constants/enum';
import { axiosInstance } from '@/lib/axios';

export const postImagesApi = (payload: FormData) =>
  axiosInstance.post<ImageObj>(ApiTags.Images, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  });

export const getImageApi = (publicId: string) => {
  const encode = encodeURI(`${ApiTags.Images}/${publicId}`);
  return axiosInstance.get(encode);
};
