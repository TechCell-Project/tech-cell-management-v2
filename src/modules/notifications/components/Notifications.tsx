import { SheetDisplay, TabsDisplay } from '@/components/common/display';
import { Button } from '@/components/ui';
import { Bell } from 'lucide-react';
import { forwardRef, memo, useMemo, useState } from 'react';
import { NotificationsTab } from './NotificationsTab';

const TriggerButton = forwardRef<HTMLButtonElement, { setOpen: () => void }>(({ setOpen }, ref) => {
  return (
    <Button ref={ref} variant="outline" size="icon" className="relative" onClick={setOpen}>
      <Bell className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      <span className="sr-only">Bell Notification</span>
      <span className="absolute top-[-4px] right-[-4px] bg-[#ee4949] rounded-full h-2 w-2"></span>
    </Button>
  );
});

TriggerButton.displayName = 'TriggerButton';

export const Notifications = memo(() => {
  const [open, setOpen] = useState<boolean>(false);

  const tabs = useMemo(() => {
    return [
      {
        value: 'tab-all',
        name: 'Tất cả',
        component: <NotificationsTab type="all" onClose={() => setOpen(false)} />,
      },
      {
        value: 'tab-unread',
        name: 'Chưa đọc',
        component: <NotificationsTab type="unread" onClose={() => setOpen(false)} />,
      },
      {
        value: 'tab-read',
        name: 'Đã đọc',
        component: <NotificationsTab type="read" onClose={() => setOpen(false)} />,
      },
    ];
  }, []);

  return (
    <SheetDisplay
      trigger={<TriggerButton setOpen={() => setOpen(true)} />}
      title="Thông báo"
      open={open}
      setOpen={setOpen}
    >
      <TabsDisplay tabs={tabs} className="mt-5" />
    </SheetDisplay>
  );
});

Notifications.displayName = 'Notifications';
