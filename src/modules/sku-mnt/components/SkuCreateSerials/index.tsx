import { ReactNode, memo, useState } from 'react';
import { Sku, SkuCreateSerialNum } from '../../models';
import { DialogDisplay } from '@/components/common/display';
import { Button, Form, useToast } from '@/components/ui';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { postOneSkuSerialNumApi } from '../../apis';
import { TextInput } from '@/components/common/form-handle';
import { yupResolver } from '@hookform/resolvers/yup';
import { createSerialValidateSchema } from './validate-schema';

const SkuCreateSerials = ({ trigger, sku }: { trigger: ReactNode; sku: Sku }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const createSerialsForm = useForm<SkuCreateSerialNum>({
    resolver: yupResolver(createSerialValidateSchema),
    defaultValues: new SkuCreateSerialNum(),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    setValue,
    getValues,
  } = createSerialsForm;

  const { mutateAsync } = useMutation({
    mutationFn: (values: SkuCreateSerialNum) => postOneSkuSerialNumApi(sku._id, values),
    onSuccess: (data) => {
      const res = data.data.errors;
      // toast({
      //   variant: 'success',
      //   title: `Thêm mới ${res?.existAvailable?.length} sản phẩm thành công, ${res?.existSold?.length} đã bán`,
      // });

      toast({
        variant: 'success',
        title: `Thêm mới thành công!`,
      });

      setOpen(false);
      router.replace(pathname);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Thêm mới thất bại!',
        description: 'Vui lòng thử lại sau',
      });
    },
  });

  return (
    <DialogDisplay trigger={trigger} title="Cập nhật tiêu chí" open={open} setOpen={setOpen}>
      <Form {...createSerialsForm}>
        <form className="mt-3">
          {getValues('serialNumbers').map((serial, i) => (
            <TextInput<SkuCreateSerialNum>
              key={serial}
              label="Số Serial"
              name={`serialNumbers.${i}`}
              className="mb-3"
              isDebounce
              notTriggerRealtime
            />
          ))}

          <Button
            variant="redLight"
            onClick={() => setValue('serialNumbers', [...watch('serialNumbers'), ''])}
          >
            Thêm
          </Button>

          <div className="w-full flex justify-end gap-4 mt-7">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
              Đóng
            </Button>
            <Button
              onClick={handleSubmit((data) => {
                const payload = data.serialNumbers.map((serial) => serial.toUpperCase());
                return mutateAsync({ serialNumbers: payload });
              })}
              variant="red"
              isLoading={isSubmitting}
            >
              Xác nhận
            </Button>
          </div>
        </form>
      </Form>
    </DialogDisplay>
  );
};

export default memo(SkuCreateSerials);
