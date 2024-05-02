import { ReactNode } from 'react';
import { Routes } from './enum';
import {
  LayoutDashboard,
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
];

export const DATA_ENTRY_ROUTES: NavLinkProps[] = [
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
];

export const WAREHOUSE_ROUTES: NavLinkProps[] = [
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
];

export const SALE_ROUTES: NavLinkProps[] = [
  {
    href: Routes.MntOrder,
    title: 'Đơn hàng',
    icon: <ShoppingCart size={18} />,
  },
];

export const MANAGER_ROUTES: NavLinkProps[] = [
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
  ...DATA_ENTRY_ROUTES,
  ...WAREHOUSE_ROUTES,
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
