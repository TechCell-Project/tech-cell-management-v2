import { useAuthStore } from '@/modules/auth/store';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from '../ui';
import { getRoleViVN } from '@/utilities/func.util';
import { LogOut } from 'lucide-react';

export const AvatarPopover = () => {
  const { user, logout } = useAuthStore();

  return (
    user && (
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user.avatar.url} alt="avatar" />
            <AvatarFallback>Null</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <h4 className="text-lg font-semibold">{`${user.firstName} ${user.lastName}`}</h4>
          <p className="text-sm">{getRoleViVN[user.role]}</p>

          <Separator className='my-4'/>

          <button
            type="button"
            className="flex items-center w-full transition duration-75 mt-3"
            onClick={logout}
          >
            <LogOut size={16} />
            <span className="flex-1 ms-4 text-left text-sm font-medium">
              Đăng xuất
            </span>
          </button>
        </PopoverContent>
      </Popover>
    )
  );
};
