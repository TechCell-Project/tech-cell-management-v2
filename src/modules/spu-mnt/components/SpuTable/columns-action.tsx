import { DropdownDisplayItemProps } from "@/components/common/display";
import { Spu } from "../../models";

export const columnsAction = (spu: Spu): DropdownDisplayItemProps[] => {
  return [
    {
      content: 'Copy ID',
      key: 'copy-action',
      onClick: () => {
        navigator.clipboard.writeText(spu._id);
      },
    },
    // {
    //   content: <AttributeUpdate attribute={attribute} trigger="Cập nhật" />,
    //   key: 'update-action',
    //   onClick: (e) => {
    //     e.preventDefault();
    //   },
    // },
    // {
    //   content: <AttributeDelete attribute={attribute} trigger="Xóa" />,
    //   key: 'delete-action',
    //   onClick: (e) => {
    //     e.preventDefault();
    //   },
    // },
  ];
};