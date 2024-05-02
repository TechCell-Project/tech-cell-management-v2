import { TextDisplay } from '@/components/common/display';
import { Button } from '@/components/ui';
import { FORMAT_DATE } from '@/constants/utils';
import { useOrderStore } from '@/modules/order-mnt/store';
import { convertOrderPaymentStatus } from '@/utilities/convert.util';
import dayjs from 'dayjs';
import { CreditCard, MapPin, NotebookPen, User } from 'lucide-react';

const OrderUpdateInfo = () => {
  const { order } = useOrderStore();

  if (order) {
    const {
      shipping: { orderShipCode, expectedDeliveryTime },
      customer: { address, email },
    } = order;

    return (
      <>
        <h3 className="mb-3 font-semibold">Thông tin</h3>
        <TextDisplay label="ID" content={order._id} className="mb-1" />
        <TextDisplay label="Ship Code" content={orderShipCode} className="mb-1" />
        <TextDisplay
          label="Dự kiên giao hàng"
          content={dayjs(expectedDeliveryTime).format(FORMAT_DATE)}
        />

        <div className="grid grid-cols-2 gap-x-5 gap-y-8 mt-8">
          <div className="flex items-start gap-5 pointer-events-none">
            <Button variant="redLight" className="h-12 w-12">
              <User className="h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all" />
            </Button>
            <div>
              <h3 className="font-semibold text-lg mb-2">Khách hàng</h3>
              <TextDisplay label="Tên" content={address.customerName} className="mb-1" />
              <TextDisplay label="SĐT" content={address.phoneNumbers} className="mb-1" />
              <TextDisplay label="Email" content={email} className="mb-1" />
            </div>
          </div>

          <div className="flex items-start gap-5 pointer-events-none">
            <Button variant="redLight" className="h-12 w-12">
              <CreditCard className="h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all" />
            </Button>
            <div>
              <h3 className="font-semibold text-lg mb-2">Thanh toán</h3>
              <TextDisplay label="Phương thức" content={order.payment.method} className="mb-1" />
              <TextDisplay
                label="Trạng thái TT"
                content={convertOrderPaymentStatus[order.payment.status]}
              />
            </div>
          </div>

          <div className="flex items-start gap-5 pointer-events-none">
            <Button variant="redLight" className="h-12 w-12">
              <MapPin className="h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all" />
            </Button>
            <div>
              <h3 className="font-semibold text-lg mb-2">Địa chỉ</h3>
              <TextDisplay
                label="Địa chỉ"
                content={`${address.provinceLevel.provinceName}, ${address.districtLevel.districtName}, ${address.wardLevel.wardName}`}
              />
              {address.type && <TextDisplay label="Loại" content={address.type} />}
              <TextDisplay label="Chi tiết" content={address.detail} className="mb-1" />
            </div>
          </div>

          <div className="flex items-start gap-5 pointer-events-none">
            <Button variant="redLight" className="h-12 w-12">
              <NotebookPen className="h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all" />
            </Button>
            <div>
              <h3 className="font-semibold text-lg mb-2">Lưu ý của khách</h3>
              <p>{order.note ?? 'Không lưu ý.'}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default OrderUpdateInfo;
