export enum Routes {
  SignIn = '/sign-in',
  ResetPassword = '/reset-password',
  Dashboard = '/dashboard',
  Product = '/dashboard/product',

  // Product management
  MntProduct = '/dashboard/mnt-product',
  MntProductAttribute = '/dashboard/mnt-product/attribute',
  MntProductBrand = '/dashboard/mnt-product/brand',
  MntProductTag = '/dashboard/mnt-product/tag',

  // Inventory management
  MntInventory = '/dashboard/mnt-inventory',
  MntInventorySpu = '/dashboard/mnt-inventory/spu',
  MntInventorySku = '/dashboard/mnt-inventory/sku',

  // User account management
  MntUser = '/dashboard/mnt-user',
  MntUserCustomer = '/dashboard/mnt-user/customer',
  MntUserStaff = '/dashboard/mnt-user/staff',

  // Order management
  MntOrder = '/dashboard/order',
}

export enum ApiTags {
  Auth = '/auth',
  Images = '/images',
  AttributeMnt = '/attributes',
  BrandMnt = '/brands',
  TagMnt = '/tags',
  SpuMnt = '/spus',
  SkuMnt = '/skus',
  UsersMnt = '/users',
  Address = '/address',
  Notifications = '/notifications',
}

export enum TypeAddress {
  Home = 'home',
  Office = 'office',
  Other = 'other',
}
