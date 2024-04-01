'use client';

import { TextDisplay } from '@/components/common/display';
import { useAuthStore } from '@/modules/auth/store';
import { convertRoleViVN } from '@/utilities/convert.util';

export const UserInfo = () => {
  const { user: sessionUser } = useAuthStore();

  if (sessionUser) {
    return (
      <div className="grid grid-cols-2 gap-5 mt-5">
        <TextDisplay label="Email" content={sessionUser.user.email} />
        <TextDisplay label="Chức vụ" content={convertRoleViVN[sessionUser.user.role]} />
      </div>
    );
  }
};
