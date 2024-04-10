import { ReactNode, memo, useState } from 'react';
import { Brand } from '../../models';
import { DialogDisplay } from '@/components/common/display';
import { useMutation } from '@tanstack/react-query';
import { Button, useToast } from '@/components/ui';
import { usePathname, useRouter } from 'next/navigation';
import { deleteBrandApi } from '../../apis';

export const BrandDelete = memo(({ trigger, brand }: { trigger: ReactNode; brand: Brand }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id: string) => deleteBrandApi(id),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Xóa thương hiệu thành công!',
      });

      setOpen(false);
      router.replace(pathname);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Xóa thương hiệu thất bại!',
        description: 'Vui lòng thử lại sau',
      });
    },
  });

  return (
    <DialogDisplay trigger={trigger} title="Xóa thương hiệu" open={open} setOpen={setOpen}>
      <div className="mt-3">
        <p className='text-[15px]'>
          Bạn có chắc muốn xóa <b>{brand.name}</b>?
        </p>
        <div className="w-full flex justify-end gap-4 mt-7">
          <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
            Đóng
          </Button>
          <Button onClick={() => mutateAsync(brand._id)} variant="red" isLoading={isPending}>
            Xác nhận
          </Button>
        </div>
      </div>
    </DialogDisplay>
  );
});

BrandDelete.displayName = BrandDelete.name;
