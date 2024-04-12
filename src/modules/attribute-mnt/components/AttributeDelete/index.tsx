import { ReactNode, memo, useState } from 'react';
import { Attribute } from '../../models';
import { Button, useToast } from '@/components/ui';
import { usePathname, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { deleteOneAttributeApi } from '../../apis';
import { DialogDisplay } from '@/components/common/display';

export const AttributeDelete = memo(
  ({ trigger, attribute }: { trigger: ReactNode; attribute: Attribute }) => {
    const [open, setOpen] = useState<boolean>(false);

    const { toast } = useToast();
    const router = useRouter();
    const pathname = usePathname();

    const { mutateAsync, isPending } = useMutation({
      mutationFn: (id: string) => deleteOneAttributeApi(id),
      onSuccess: () => {
        toast({
          variant: 'success',
          title: 'Xóa thông số thành công!',
        });

        setOpen(false);
        router.replace(pathname);
      },
      onError: () => {
        toast({
          variant: 'destructive',
          title: 'Xóa thông số thất bại!',
          description: 'Vui lòng thử lại sau',
        });
      },
    });

    return (
      <DialogDisplay trigger={trigger} title="Xóa thương hiệu" open={open} setOpen={setOpen}>
        <div className="mt-3">
          <p className="text-[15px]">
            Bạn có chắc muốn xóa <b>{attribute.name}</b>?
          </p>
          <div className="w-full flex justify-end gap-4 mt-7">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
              Đóng
            </Button>
            <Button onClick={() => mutateAsync(attribute._id)} variant="red" isLoading={isPending}>
              Xác nhận
            </Button>
          </div>
        </div>
      </DialogDisplay>
    );
  },
);

AttributeDelete.displayName = AttributeDelete.name;
