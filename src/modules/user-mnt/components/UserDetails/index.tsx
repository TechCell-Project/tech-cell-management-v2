import { memo, useState } from 'react';
import dayjs from 'dayjs';
import { DialogDisplay, TextDisplay } from '@/components/common/display';
import { UserActionProps } from '../../models';
import { Button, Separator } from '@/components/ui';
import { FORMAT_DATE } from '@/constants/utils';
import { convertRoleViVN, convertTypeAddress } from '@/utilities/convert.util';

export const UserDetails = memo(({ user, trigger }: UserActionProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DialogDisplay
      trigger={trigger}
      title="Chi tiết người dùng"
      open={open}
      setOpen={setOpen}
      classContent="max-w-[36rem]"
    >
      <h3 className="mt-5 mb-3 text-[16px] font-semibold">Thông tin</h3>
      <div className="grid grid-cols-2 gap-x-5 gap-y-1">
        <TextDisplay label="Họ tên" content={`${user.firstName} ${user.lastName}`} />
        <TextDisplay label="ID" content={user._id} />
        <TextDisplay label="Email" content={user.email} />
        <TextDisplay label="Chức vụ" content={convertRoleViVN[user.role]} />
        <TextDisplay label="Trạng thái" content={user.block?.isBlocked ? 'Bị chặn' : 'Hoạt động'} />
      </div>
      <Separator className="my-6" />

      <h3 className="mt-5 mb-3 text-[16px] font-semibold">Địa chỉ</h3>
      {(user.address?.length as number) < 1 ? (
        <p>Chưa cập nhật địa chỉ !</p>
      ) : (
        <>
          {user.address?.map((add) => (
            <div className="grid grid-cols-2 gap-x-5 gap-y-1" key={add.type}>
              <TextDisplay label="Loại" content={convertTypeAddress[add.type]} />
              <TextDisplay label="Tên" content={add.customerName} />
              {/* <TextDisplay label="SĐT" content={add.phoneNumbers} /> */}
              <TextDisplay label="Chi tiết" content={add.detail} />
            </div>
          ))}
        </>
      )}

      <Separator className="my-6 h-[0.5px]" />

      <h3 className="mt-5 mb-3 text-[16px] font-semibold">Khác</h3>
      <div className="grid grid-cols-2 gap-x-5 gap-y-1">
        <TextDisplay label="Ngày tạo" content={dayjs(user.createdAt).format(FORMAT_DATE)} />
        <TextDisplay label="Ngày cập nhật" content={dayjs(user.updatedAt).format(FORMAT_DATE)} />
      </div>

      <div className="w-full flex justify-end gap-4 mt-7">
        <Button variant="ghost" type="button" onClick={() => setOpen((prev) => !prev)}>
          Đóng
        </Button>
      </div>
    </DialogDisplay>
  );
});

UserDetails.displayName = 'UserDetails';
