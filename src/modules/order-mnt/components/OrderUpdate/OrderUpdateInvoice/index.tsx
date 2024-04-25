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
            <div className='w-full'>
              <h3 className="font-semibold">{product.productName}</h3>
              <p className="text-[12px] font-medium">{product.productType}</p>
              <p className="text-[12px] font-medium">x{product.quantity}</p>
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
      </>
    )
  );
};

export default OrderUpdateInvoice;
