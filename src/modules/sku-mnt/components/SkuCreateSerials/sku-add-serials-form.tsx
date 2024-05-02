'use client';

import { Fragment, useEffect, useState } from 'react';
import { Sku, SkuCreateSerialNum, SkuCreateSerialObj } from '../../models';
import { Button, Form, useToast } from '@/components/ui';
import { usePathname, useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { postOneSkuSerialNumApi } from '../../apis';
import { TextInput } from '@/components/common/form-handle';
import { yupResolver } from '@hookform/resolvers/yup';
import { createSerialValidateSchema } from './validate-schema';
import { X } from 'lucide-react';

interface SkuAddSerialsFormProps {
  sku: Sku;
  handleCloseModal: () => void;
}

export const SkuAddSerialsForm = ({ sku, handleCloseModal }: SkuAddSerialsFormProps) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [haveDuplicateError, setHaveDuplicateError] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(-1);

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
    watch,
    getFieldState,
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

      handleCloseModal();
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

  function hasDuplicates(arr: string[]): boolean {
    return new Set(arr).size !== arr.length;
  }

  const fieldWatch = watch(`serialNumbers.${index}.serial`);
  const serialWatch = watch(`serialNumbers`);

  useEffect(() => {
    if (index >= 0) {
      const { error } = getFieldState(`serialNumbers.${index}.serial`);

      if (fieldWatch === '') {
        setIsError(true);
        return;
      }

      if (!error) {
        if (index >= 1) {
          const isDuplicate = hasDuplicates(serialWatch.map((item) => item.serial));

          if (isDuplicate) {
            setHaveDuplicateError(true);
            setIsError(true);
            return;
          }
        }
        setIsError(false);
        return;
      }

      if (!isError) {
        setIsError(true);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldWatch, index]);

  console.log(haveDuplicateError);

  return (
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
                msgDirection="top"
              />

              <Button
                variant="ghost"
                type="button"
                className="h-8 w-8 p-0 col-span-1"
                disabled={index === 0}
                onClick={() => {
                  remove(i);
                  setIndex((prev) => prev - 1);
                }}
              >
                <span className="sr-only">Open menu</span>
                <X className="h-4 w-4" />
              </Button>
            </Fragment>
          ))}
        </div>

        {haveDuplicateError && <p className="text-sm text-red mt-3">Số Serial không được trùng lặp</p>}

        <Button
          variant="redLight"
          className="mt-3"
          disabled={isError}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isError) {
              append({ serial: '' });
              setIndex((prev) => prev + 1);
              setIsError(true);
            }
          }}
        >
          Thêm
        </Button>

        <div className="w-full flex justify-end gap-4 mt-7">
          <Button variant="ghost" type="button" onClick={() => handleCloseModal()}>
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
  );
};
