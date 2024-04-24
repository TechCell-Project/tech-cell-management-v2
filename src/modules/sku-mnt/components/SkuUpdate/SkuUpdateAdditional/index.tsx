import { PaginationResponse } from '@/common/model';
import { MultiSelectInput, RichTextInput } from '@/components/common/form-handle';
import { Tag } from '@/modules/tag-mnt/models';
import { UpdateSkuDto } from '@techcell/node-sdk';

type SkuUpdateAdditionalProps = {
  listTag?: PaginationResponse<Tag>;
};

const SkuUpdateAdditional = ({ listTag }: SkuUpdateAdditionalProps) => {
  return (
    listTag && (
      <>
        <h3 className="mb-2 font-semibold">Thông tin bổ sung</h3>
        <div className="grid grid-cols-4 gap-x-5 gap-y-3 mb-3">
          <MultiSelectInput<UpdateSkuDto, Tag>
            label="Tiêu chí lọc"
            name="tags"
            options={listTag?.data ?? []}
            displayLabel="name"
            displayValue="_id"
          />
        </div>
        <RichTextInput<UpdateSkuDto> label="Mô tả" name="description" />
      </>
    )
  );
};

export default SkuUpdateAdditional;
