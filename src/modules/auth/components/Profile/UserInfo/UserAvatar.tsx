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

export const UserAvatar = memo(() => {
  const { user: sessionUser, setUser } = useAuthStore();
  const { toast } = useToast();

  const handleDrop = async (dropped: File[]) => {
    if (dropped.length > 0) {
      const formData = new FormData();
      formData.append('images', dropped[0]);

      const { data: imagesResponse, status } = await postImagesApi(formData);
      if (status === HttpStatusCode.Created) {
        const { data: userResponse } = await patchMeApi({
          avatarImageId: imagesResponse.data[0].publicId,
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
    <Dropzone onDrop={handleDrop} noClick={false} noKeyboard>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()} className="w-max">
          {sessionUser && (
            <div className="relative w-max">
              <Avatar className="cursor-pointer relative w-[75px] h-[75px]">
                <AvatarImage src={sessionUser.user.avatar?.url} alt="avatar" />
                <AvatarFallback>
                  {getShortName(`${sessionUser.user.firstName} ${sessionUser.user.lastName}`)}
                </AvatarFallback>
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
