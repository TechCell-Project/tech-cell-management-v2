import { SpuUpdate } from '~spu-mnt/components';

type Props = {
  searchParams: {
    id: string;
  };
};

const SpuUpdatePage = (props: Props) => {
  return <SpuUpdate id={props.searchParams.id} />;
};

export default SpuUpdatePage;
