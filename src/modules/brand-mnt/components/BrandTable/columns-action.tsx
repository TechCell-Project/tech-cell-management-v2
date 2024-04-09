import { DropdownDisplayItemProps } from "@/components/common/display";
import { Brand } from "../../models";

export const columnsAction = (brand: Brand): DropdownDisplayItemProps[] => {
  return [
    {
      content: 'Copy ID',
      key: 'copy-action',
      onClick: () => {
        navigator.clipboard.writeText(brand._id);
      },
    },
  ]
}