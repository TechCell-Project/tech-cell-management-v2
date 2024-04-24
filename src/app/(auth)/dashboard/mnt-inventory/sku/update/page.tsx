import { SkuUpdate } from '~sku-mnt/components';

type Props = {
  searchParams: {
    id: string;
  };
};

const SkuUpdatePage = (props: Props) => {
  return <SkuUpdate id={props.searchParams.id} />;
};

export default SkuUpdatePage;
