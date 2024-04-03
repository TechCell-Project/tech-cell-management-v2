import { TextDisplay } from '@/components/common/display';
import { Separator } from '@/components/ui';
import { convertTypeAddress } from '@/utilities/convert.util';
import { useAuthStore } from '~auth/store';

export const AddressInfo = () => {
  const { user: sessionUser } = useAuthStore();

  if (sessionUser) {
    return (
      <>
        <h3 className="mt-5 mb-3 text-[16px] font-semibold">Địa chỉ</h3>

        {(sessionUser.user.address?.length as number) > 0 ? (
          sessionUser.user.address?.map((add) => (
            <>
              <Separator className="my-6" />
              <div className="grid grid-cols-2 gap-x-5 gap-y-1" key={add.type}>
                <TextDisplay label="Loại" content={convertTypeAddress[add.type]} />
                <TextDisplay label="Tên" content={add.customerName} />
                <TextDisplay label="SĐT" content={add.phoneNumbers} />
                <TextDisplay label="Chi tiết" content={add.detail} />
              </div>
            </>
          ))
        ) : (
          <>
            <Separator className="my-6" />
            <p>Chưa cập nhật địa chỉ !</p>
          </>
        )}
      </>
    );
  }
};
