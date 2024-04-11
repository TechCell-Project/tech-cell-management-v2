import { Plus } from 'lucide-react';
import { Button } from '../ui';
import { TooltipDisplay } from '../common/display';

export const AddToggle = () => {
  return (
    <div className="fixed right-[22px] bottom-[22px]">
      <TooltipDisplay
        trigger={
          <Button variant="red" className="h-14 w-14 p-0 rounded-full">
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
