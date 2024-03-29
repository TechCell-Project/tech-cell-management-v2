import { useAuthStore } from '~auth/store';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from '../ui';
import { LogOut } from 'lucide-react';
import { convertRoleViVN } from '@/utilities/convert.util';

export const AvatarPopover = () => {
  const { user: sessionUser, logout } = useAuthStore();

  return (
    sessionUser && (
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={sessionUser.user.avatar?.url} alt="avatar" />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <h4 className="text-lg font-semibold">{`${sessionUser.user.firstName} ${sessionUser.user.lastName}`}</h4>
          <p className="text-sm">{convertRoleViVN[sessionUser.user.role]}</p>

          <Separator className="my-4" />

          <button
            type="button"
            className="flex items-center w-full transition duration-75 mt-3"
            onClick={logout}
          >
            <LogOut size={16} />
            <span className="flex-1 ms-4 text-left text-sm font-medium">Đăng xuất</span>
          </button>
        </PopoverContent>
      </Popover>
    )
  );
};
