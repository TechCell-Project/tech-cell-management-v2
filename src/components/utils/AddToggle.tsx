import { Plus } from 'lucide-react';
import { Button } from '../ui';
import { TooltipDisplay } from '../common/display';

export const AddToggle = () => {
  return (
    <div className="absolute right-[22px] top-[85px]">
      <TooltipDisplay
        trigger={
          <Button variant="red" className="h-12 w-12 p-0 rounded-full">
            <span className="sr-only">Open menu</span>
            <Plus className="h-5 w-5" />
          </Button>
        }
        content="Thêm mới"
        side="left"
      />
    </div>
  );
};
