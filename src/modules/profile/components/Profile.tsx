'use client';

import { useState } from 'react';
import { DialogDisplay, TabsDisplay } from '@/components/common/display';
import { UserRoundSearch } from 'lucide-react';
import { UserInfo } from './UserInfo';
import { AddressInfo } from './AddressInfo';
import { ChangePassword } from './ChangePassword';

const tabs = [
  { value: 'user-info', name: 'Thông tin', component: <UserInfo /> },
  { value: 'address-info', name: 'Địa chỉ', component: <AddressInfo /> },
  { value: 'change-pw', name: 'Đổi mật khẩu', component: <ChangePassword /> },
];

export const Profile = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DialogDisplay
      trigger={
        <button
          type="button"
          className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        >
          <UserRoundSearch size={18} />
          <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-sm font-bold">
            Thông tin cá nhân
          </span>
        </button>
      }
      title="Thông tin cá nhân"
      classNameTrigger="w-full"
      open={open}
      setOpen={setOpen}
    >
      <TabsDisplay tabs={tabs} className='mt-4' />
    </DialogDisplay>
  );
};
