import { Separator } from '@/components/ui';
import { useOrderStore } from '@/modules/order-mnt/store';
import { formatWithCommas } from '@/utilities/func.util';
import Image from 'next/image';

const OrderUpdateInvoice = () => {
  const { order } = useOrderStore();

  return (
    order && (
      <>
        <h3 className="mb-2 font-semibold">Hoá đơn</h3>
        {order?.products.map((product) => (
          <div className="flex items-center py-2 gap-4" key={product.productName}>
            <Image
              width={80}
              height={80}
              src={product?.image?.url ?? 'https://github.com/shadcn.png'}
              alt="product-image"
              className="rounded"
            />
            <div className="w-full">
              <h3 className="font-semibold mb-1">{product.productName}</h3>
              <p className="text-sm font-medium">{product.productType}</p>
              <p className="text-sm font-medium">x{product.quantity}</p>
              <div className="flex items-center justify-end gap-3 w-full">
                {product.unitPrice.special ? (
                  <>
                    <h2 className="font-semibold">{formatWithCommas(product.unitPrice.special)}</h2>
                    <h2 className="font-semibold line-through text-sm">
                      {formatWithCommas(product.unitPrice.base)}
                    </h2>
                  </>
                ) : (
                  <h2 className="font-semibold ">{formatWithCommas(product.unitPrice.base)}</h2>
                )}
              </div>
            </div>
          </div>
        ))}
        <Separator className="my-5" />
        <div className="flex items-center justify-between mb-2">
          <h5 className="font-medium text-md">Phí vận chuyển</h5>
          <span className="font-semibold text-red text-md">
            {formatWithCommas(order?.shipping.fee)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-md">Phụ phí</h5>
          <span className="font-semibold text-red text-md">0 ₫</span>
        </div>
        <Separator className="my-5" />
        <div className="flex items-center justify-between">
          <h5 className="font-bold text-lg">Thành tiền</h5>
          <h5 className="font-bold text-lg">{formatWithCommas(order?.totalPrice)}</h5>
        </div>
      </>
    )
  );
};

export default OrderUpdateInvoice;
