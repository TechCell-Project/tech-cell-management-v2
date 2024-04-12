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
    href: Routes.MntUser,
    name: 'Quản lý tài khoản',
    disabled: true,
  },
  {
    href: Routes.MntUserCustomer,
    name: 'Khách hàng',
  },
  {
    href: Routes.MntUserStaff,
    name: 'Nhân viên',
  },
  {
    href: Routes.MntProduct,
    name: 'Quản lý sản phẩm',
    disabled: true,
  },
  {
    href: Routes.MntProductBrand,
    name: 'Thương hiệu',
  },
  {
    href: Routes.MntProductAttribute,
    name: 'Thông số',
  },
  {
    href: Routes.MntInventory,
    name: 'Quản lý kho hàng',
    disabled: true,
  },
  {
    href: Routes.MntInventorySpu,
    name: 'Đơn vị sản phẩm (SPU)',
  },
  {
    href: Routes.MntInventorySku,
    name: 'Đơn vị định danh sản phẩm (SKU)',
  },
  {
    href: Routes.Product,
    name: 'Sản phẩm',
  },
  {
    href: Routes.MntOrder,
    name: 'Đơn hàng',
  },
];
