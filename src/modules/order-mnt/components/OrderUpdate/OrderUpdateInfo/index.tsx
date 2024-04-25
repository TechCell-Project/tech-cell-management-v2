import { useOrderStore } from '@/modules/order-mnt/store';

const OrderUpdateInfo = () => {
  const { order } = useOrderStore();
  
  return (
    <>
      <h3 className="mb-2 font-semibold">Thông tin</h3>
      <div className="grid grid-cols-2 gap-x-5 gap-y-3"></div>
    </>
  );
};

export default OrderUpdateInfo;
