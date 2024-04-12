import { DropdownDisplayItemProps } from "@/components/common/display";
import { Attribute } from "../../models";

export const columnsAction = (brand: Attribute): DropdownDisplayItemProps[] => {
  return [
    {
      content: 'Copy ID',
      key: 'copy-action',
      onClick: () => {
        navigator.clipboard.writeText(brand._id);
      },
    },
    // {
    //   content: <BrandUpdate brand={brand} trigger="Cập nhật" />,
    //   key: 'update-action',
    //   onClick: (e) => {
    //     e.preventDefault();
    //   },
    // },
    // {
    //   content: <BrandDelete brand={brand} trigger="Xóa" />,
    //   key: 'delete-action',
    //   onClick: (e) => {
    //     e.preventDefault();
    //   },
    // },
  ];
};