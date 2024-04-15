import { ReactNode, memo, useState } from 'react';
import { Attribute, AttributeUpdate as AttributeUpdateDto } from '../../models';
import { Button, Form, useToast } from '@/components/ui';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { createAttrValidateSchema } from '../AttributeCreate/validate-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { patchOneAttributeApi } from '../../apis';
import { DialogDisplay } from '@/components/common/display';
import { SelectInput, TextInput } from '@/components/common/form-handle';
import { OPTIONS_STATUS_3 } from '@/constants/options';
import { getFieldChanges } from '@/utilities/func.util';

export const AttributeUpdate = memo(
  ({ trigger, attribute }: { trigger: ReactNode; attribute: Attribute }) => {
    const [open, setOpen] = useState<boolean>(false);

    const { toast } = useToast();
    const router = useRouter();
    const pathname = usePathname();

    const updateAttributeForm = useForm<AttributeUpdateDto>({
      resolver: yupResolver(createAttrValidateSchema),
      defaultValues: new AttributeUpdateDto(attribute),
    });

    const {
      handleSubmit,
      formState: { isSubmitting },
    } = updateAttributeForm;

    const { mutateAsync } = useMutation({
      mutationFn: (values: Partial<AttributeUpdateDto>) =>
        patchOneAttributeApi(attribute._id, values),
      onSuccess: () => {
        toast({
          variant: 'success',
          title: 'Cập nhật thông số thành công!',
        });

        setOpen(false);
        router.replace(pathname);
      },
      onError: () => {
        toast({
          variant: 'destructive',
          title: 'Cập nhật thông số thất bại!',
          description: 'Vui lòng thử lại sau',
        });
      },
    });

    return (
      <DialogDisplay trigger={trigger} title="Cập nhật thông số" open={open} setOpen={setOpen}>
        <Form {...updateAttributeForm}>
          <form className="mt-3">
            <TextInput<AttributeUpdateDto> label="Tên thương hiệu" name="name" className="mb-3" />
            <TextInput<AttributeUpdateDto> label="Mô tả" name="description" className="mb-3" />

            <SelectInput<AttributeUpdateDto>
              label="Trạng thái"
              name="status"
              options={OPTIONS_STATUS_3}
            />

            <div className="w-full flex justify-end gap-4 mt-7">
              <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
                Đóng
              </Button>
              <Button
                onClick={handleSubmit((data) => {
                  const values = getFieldChanges(data, attribute);
                  mutateAsync(values);
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
  },
);

AttributeUpdate.displayName = AttributeUpdate.name;
