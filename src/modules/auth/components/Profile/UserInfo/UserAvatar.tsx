'use client';

import Dropzone from 'react-dropzone';
import { useAuthStore } from '~auth/store';
import { Avatar, AvatarFallback, AvatarImage, Button, useToast } from '@/components/ui';
import { getShortName } from '@/utilities/func.util';
import { Pencil } from 'lucide-react';
import { postImagesApi } from '~images/apis';
import { HttpStatusCode } from 'axios';
import { patchMeApi } from '~auth/apis';
import { memo } from 'react';
import { AuthLoginResponse } from '~auth/models';
import { setOneSessionStorage } from '@/utilities/session.util';
import HashLoader from 'react-spinners/HashLoader';

export const UserAvatar = memo(() => {
  const { user: sessionUser, setUser, fetching, fetched, isLoading } = useAuthStore();
  const { toast } = useToast();

  const handleDrop = async (dropped: File[]) => {
    if (dropped.length > 0) {
      fetching();
      const formData = new FormData();
      formData.append('images', dropped[0]);

      const { data: imagesResponse, status } = await postImagesApi(formData);
      if (status === HttpStatusCode.Created) {
        const { data: userResponse } = await patchMeApi({
          avatarImageId: imagesResponse.publicId,
        });

        if (userResponse) {
          const newUser: AuthLoginResponse = {
            ...(sessionUser as AuthLoginResponse),
            user: userResponse,
          };

          setOneSessionStorage<AuthLoginResponse>('user', newUser);
          setUser(newUser);

          toast({
            variant: 'success',
            title: 'Tải ảnh thành công!',
          });

          fetched();
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Tải ảnh lên thất bại!',
        });
      }
    }
  };

  return (
    <Dropzone onDrop={handleDrop} noClick={isLoading} noKeyboard>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()} className="w-max pt-2">
          {sessionUser && (
            <div className={`${isLoading && 'pointer-events-none'} relative w-max`}>
              <Avatar className="cursor-pointer relative w-[90px] h-[90px] p-1 ring-2 ring-gray-300 dark:ring-gray-500">
                <AvatarImage
                  src={sessionUser.user.avatar?.url}
                  alt="avatar"
                  className="rounded-full"
                />
                <AvatarFallback>
                  {getShortName(`${sessionUser.user.firstName} ${sessionUser.user.lastName}`)}
                </AvatarFallback>

                {isLoading && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center bg-[#ffffff7a]">
                    <HashLoader color="#ee4949" loading={true} size={28} />
                  </div>
                )}
              </Avatar>

              <Button
                variant="outline"
                className="h-6 w-6 p-0 rounded-full absolute bottom-0 right-0"
              >
                <span className="sr-only">Open menu</span>
                <Pencil className="h-3 w-3" />
                <input {...getInputProps()} />
              </Button>
            </div>
          )}
        </div>
      )}
    </Dropzone>
  );
});

UserAvatar.displayName = UserAvatar.name;
