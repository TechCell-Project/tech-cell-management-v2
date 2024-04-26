import { PaginationResponse } from '@/common/model';
import { Fragment } from 'react';
import { Attribute } from '~attribute-mnt/models';
import { useSkuStore } from '~sku-mnt/store';
import { TextDisplay } from '@/components/common/display';

const SkuUpdateAttribute = ({
  listAttribute,
}: {
  listAttribute?: PaginationResponse<Attribute>;
}) => {
  const { sku } = useSkuStore();

  return (
    sku &&
    listAttribute && (
      <>
        <h3 className="mb-2 font-semibold">Thông số</h3>
        <div className="grid grid-cols-4 gap-x-5 gap-y-2 items-end">
          {sku?.attributes.map((field, index) => (
            <Fragment key={field.k}>
              <TextDisplay label={field.name} content={field.v + ` ${field.u ?? ''}`} />
            </Fragment>
          ))}
        </div>
      </>
    )
  );
};

export default SkuUpdateAttribute;
