import { ReactNode } from 'react';
import { Routes } from './enum';
import {
  LayoutDashboard,
  ShoppingBasket,
  PanelsLeftBottom,
  CircleUserRound,
  UserRoundSearch,
  LogOut,
  ShoppingCart,
} from 'lucide-react';
import { Profile } from '@/modules/profile/components';
import { useAuthStore } from '@/modules/auth/store';

export type NavLinkProps = {
  href?: string;
  icon: React.ReactNode;
  title: string;
  childrenNav?: NavLinkChildrens[];
  action?: () => void;
  dialogComponent?: ReactNode;
};

export type NavLinkChildrens = {
  title: string;
  href: string;
};

export const ROUTES: NavLinkProps[] = [
  {
    href: Routes.Dashboard,
    title: 'Trang chủ',
    icon: <LayoutDashboard size={18} />,
  },
  {
    href: Routes.Product,
    title: 'Sản phẩm',
    icon: <ShoppingBasket size={18} />,
  },
  {
    title: 'Tiện ích sản phẩm',
    icon: <PanelsLeftBottom size={18} />,
    childrenNav: [
      {
        href: Routes.Category,
        title: 'Thể loại',
      },
      {
        href: Routes.Attribute,
        title: 'Thuộc tính',
      },
    ],
  },
  {
    href: Routes.Order,
    title: 'Đơn hàng',
    icon: <ShoppingCart size={18} />,
  },
  {
    href: Routes.User,
    title: 'Tài khoản',
    icon: <CircleUserRound size={18} />,
  },
];

export const ROUTES_UTILS: NavLinkProps[] = [
  {
    title: 'Thông tin cá nhân',
    icon: <UserRoundSearch size={18} />,
    dialogComponent: <Profile />,
  },
  {
    title: 'Đăng xuất',
    icon: <LogOut size={18} />,
    action: () => useAuthStore.getState().logout(),
  },
];
