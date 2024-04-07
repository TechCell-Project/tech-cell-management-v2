export enum Routes {
  SignIn = '/sign-in',
  Dashboard = '/dashboard',
  Product = '/dashboard/product',
  Category = '/dashboard/product-utilities/category',
  Attribute = '/dashboard/product-utilities/attribute',
  // User = '/dashboard/user',
  UserCustomer = '/dashboard/user/customer',
  UserStaff = '/dashboard/user/staff',
  Order = '/dashboard/order',
  ResetPassword = '/reset-password',
}

export enum ApiTags {
  Auth = '/auth',
  Profile = '/profile',
  Images = '/images',
  Products = '/products',
  Categories = '/categories',
  Attributes = '/attributes',
  Address = '/address',
  OrdersMnt = '/orders-mnt',
  Users = '/users',
  Notifications = '/notifications',
}

export enum Roles {
  Customer = 'customer',
  Manager = 'manager',
  Sales = 'sales',
  Accountant = 'accountant',
  DataEntry = 'data_entry',
  Warehouse = 'warehouse',
}

export enum TypeAddress {
  Home = 'home',
  Office = 'office',
  Other = 'other',
}
