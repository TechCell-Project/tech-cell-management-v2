import { Routes } from '@/constants/enum';

export type LinksRouteType = {
  href: string;
  name: string;
  disabled?: boolean;
};

export const LINKS_ROUTE: LinksRouteType[] = [
  {
    href: Routes.Dashboard,
    name: 'Trang chủ',
  },
  {
    href: Routes.User,
    name: 'Tài khoản',
    disabled: true,
  },
  {
    href: Routes.UserCustomer,
    name: 'Tài khoản khách hàng',
  },
  {
    href: Routes.UserStaff,
    name: 'Tài khoản nhân viên',
  },
  {
    href: Routes.Utils,
    name: 'Tiện tích sản phẩm',
    disabled: true,
  },
  {
    href: Routes.UtilsBrand,
    name: 'Thương hiệu',
  },
  {
    href: Routes.UtilsAttribute,
    name: 'Thông số',
  },
  {
    href: Routes.Product,
    name: 'Sản phẩm',
  },
  {
    href: Routes.Order,
    name: 'Đơn hàng',
  },
];
