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
  Package,
} from 'lucide-react';
import { Profile } from '~auth/components';
import { useAuthStore } from '~auth/store';

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
    href: Routes.MntOrder,
    title: 'Đơn hàng',
    icon: <ShoppingCart size={18} />,
  },
  {
    title: 'Quản lý sản phẩm',
    icon: <PanelsLeftBottom size={18} />,
    childrenNav: [
      {
        href: Routes.MntProductBrand,
        title: 'Thương hiệu',
      },
      {
        href: Routes.MntProductAttribute,
        title: 'Thông số',
      },
      {
        href: Routes.MntProductTag,
        title: 'Tiêu chí (Tag)',
      },
    ],
  },
  {
    title: 'Quản lý kho hàng',
    icon: <Package size={18} />,
    childrenNav: [
      {
        href: Routes.MntInventorySpu,
        title: 'Đơn vị sản phẩm (SPU)',
      },
      {
        href: Routes.MntInventorySku,
        title: 'Đơn vị định danh sản phẩm (SKU)',
      },
    ],
  },
  {
    title: 'Quản lý tài khoản',
    icon: <CircleUserRound size={18} />,
    childrenNav: [
      {
        href: Routes.MntUserCustomer,
        title: 'Khách hàng',
      },
      {
        href: Routes.MntUserStaff,
        title: 'Nhân viên',
      },
    ],
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
