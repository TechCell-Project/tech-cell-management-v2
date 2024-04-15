import { Options } from '@/components/common/form-handle';
import {
  CreateBrandDtoStatusEnum,
  FilterAttributeDtoStatusEnum,
  UserRoleEnum,
} from '@techcell/node-sdk';

export const SELECT_ROLE_OPTIONS: Options<string>[] = [
  {
    label: 'Nhân viên bán hàng',
    value: UserRoleEnum.Sales,
  },
  {
    label: 'Nhân viên kho',
    value: UserRoleEnum.Warehouse,
  },
  {
    label: 'Nhân viên nhập liệu',
    value: UserRoleEnum.DataEntry,
  },
  {
    label: 'Kế toán',
    value: UserRoleEnum.Accountant,
  },
];

export const REASON_BLOCK_OPTIONS: Options<string>[] = [
  {
    label: 'Gửi tin nhắn rác, quảng cáo, hoặc nội dung không phù hợp',
    value: 'spam',
  },
  {
    label: 'Bắt nạt, quấy rối, hoặc đe dọa người khác',
    value: 'abuse',
  },
  {
    label: 'Chia sẻ nội dung bạo lực, khiêu dâm, hoặc vi phạm bản quyền',
    value: 'harmful-content',
  },
  {
    label: 'Giả mạo người khác hoặc tạo tài khoản giả',
    value: 'impersonate',
  },
  {
    label: 'Cố gắng lừa đảo hoặc chiếm đoạt thông tin cá nhân',
    value: 'scam',
  },
  {
    label: 'Tham gia vào các hoạt động vi phạm pháp luật',
    value: 'illegal-activity',
  },
  {
    label: 'Sử dụng tên giả hoặc thông tin cá nhân không chính xác',
    value: 'false-information',
  },
  {
    label: 'Tạo nhiều tài khoản để thao túng hệ thống',
    value: 'too-many-accounts',
  },
  {
    label: 'Mua bán hoặc trao đổi tài khoản người dùng',
    value: 'trading-accounts',
  },
  {
    label: 'Lý do khác',
    value: 'other',
  },
];

export const OPTIONS_STATUS_1: Options<string>[] = [
  {
    label: 'Active',
    value: CreateBrandDtoStatusEnum.Active,
  },
  {
    label: 'Delete',
    value: CreateBrandDtoStatusEnum.Deleted,
  },
];

export const OPTIONS_STATUS_2: Options<string>[] = [
  {
    label: 'Active',
    value: CreateBrandDtoStatusEnum.Active,
  },
  {
    label: 'Inactive',
    value: CreateBrandDtoStatusEnum.Inactive,
  },
];

export const OPTIONS_STATUS_3: Options<string>[] = [
  {
    label: 'Avaiable',
    value: FilterAttributeDtoStatusEnum.Available,
  },
  {
    label: 'Deleted',
    value: FilterAttributeDtoStatusEnum.Deleted,
  },
];
