import { Fragment, ReactNode, memo, useState } from 'react';
import { Sku, SkuCreateSerialNum, SkuCreateSerialObj } from '../../models';
import { DialogDisplay } from '@/components/common/display';
import { Button, Form, useToast } from '@/components/ui';
import { usePathname, useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { postOneSkuSerialNumApi } from '../../apis';
import { TextInput } from '@/components/common/form-handle';
import { yupResolver } from '@hookform/resolvers/yup';
import { createSerialValidateSchema } from './validate-schema';
import { X } from 'lucide-react';

const SkuCreateSerials = ({ trigger, sku }: { trigger: ReactNode; sku: Sku }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const createSerialsForm = useForm<SkuCreateSerialObj>({
    resolver: yupResolver(createSerialValidateSchema),
    defaultValues: new SkuCreateSerialObj(),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = createSerialsForm;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'serialNumbers',
  });

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
          <div className="grid grid-cols-5 gap-x-5 gap-y-4 items-end">
            {fields.map((field, i) => (
              <Fragment key={field.id}>
                <TextInput<SkuCreateSerialObj>
                  label="Số Serial"
                  name={`serialNumbers.${i}.serial`}
                  className="col-span-4"
                  isDebounce
                  notTriggerRealtime
                />

                <Button
                  variant="ghost"
                  type="button"
                  className="h-8 w-8 p-0 col-span-1"
                  onClick={() => remove(i)}
                >
                  <span className="sr-only">Open menu</span>
                  <X className="h-4 w-4" />
                </Button>
              </Fragment>
            ))}
          </div>

          <Button variant="redLight" className="mt-3" onClick={() => append({ serial: '' })}>
            Thêm
          </Button>

          <div className="w-full flex justify-end gap-4 mt-7">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
              Đóng
            </Button>
            <Button
              onClick={handleSubmit((data) => {
                const serials = data.serialNumbers.map((value) => value.serial);
                return mutateAsync({ serialNumbers: serials });
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
