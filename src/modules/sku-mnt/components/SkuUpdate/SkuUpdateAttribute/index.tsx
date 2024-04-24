import { PaginationResponse } from '@/common/model';
import { Attribute } from '~attribute-mnt/models';
import { useSkuStore } from '~sku-mnt/store';

const SkuUpdateAttribute = ({
  listAttribute,
}: {
  listAttribute?: PaginationResponse<Attribute>;
}) => {
  const { sku } = useSkuStore();

  return <></>;
};

export default SkuUpdateAttribute;
