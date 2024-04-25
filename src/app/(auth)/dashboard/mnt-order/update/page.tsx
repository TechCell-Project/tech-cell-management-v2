import { OrderUpdate } from '~order-mnt/components';

type Props = {
  searchParams: {
    id: string;
  };
};

const OrderUpdatePage = (props: Props) => {
  return <OrderUpdate id={props.searchParams.id} />;
};

export default OrderUpdatePage;
