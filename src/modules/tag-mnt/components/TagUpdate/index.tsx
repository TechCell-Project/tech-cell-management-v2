import { ReactNode, memo, useState } from 'react';
import { Tag, TagUpdate as TagUpdateDto } from '../../models';
import { Button, Form, useToast } from '@/components/ui';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { createTagValidateSchema } from '../TagCreate/validate-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { DialogDisplay } from '@/components/common/display';
import { SelectInput, TextInput } from '@/components/common/form-handle';
import { OPTIONS_STATUS_1 } from '@/constants/options';
import { getFieldChanges } from '@/utilities/func.util';
import { useMutation } from '@tanstack/react-query';
import { patchOneTagApi } from '../../apis';

export const TagUpdate = memo(({ trigger, tag }: { trigger: ReactNode; tag: Tag }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const updateTagForm = useForm<TagUpdateDto>({
    resolver: yupResolver(createTagValidateSchema),
    defaultValues: new TagUpdateDto(tag),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = updateTagForm;

  const { mutateAsync } = useMutation({
    mutationFn: (values: Partial<TagUpdateDto>) => patchOneTagApi(tag._id, values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Cập nhật tiêu chí thành công!',
      });

      setOpen(false);
      router.replace(pathname);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Cập nhật tiêu chí thất bại!',
        description: 'Vui lòng thử lại sau',
      });
    },
  });

  return (
    <DialogDisplay trigger={trigger} title="Cập nhật tiêu chí" open={open} setOpen={setOpen}>
      <Form {...updateTagForm}>
        <form className="mt-3">
          <TextInput<TagUpdateDto> label="Tên tiêu chí" name="name" className="mb-3" />
          <TextInput<TagUpdateDto> label="Mô tả" name="description" className="mb-3" />

          <SelectInput<TagUpdateDto>
            label="Trạng thái"
            name="status"
            options={OPTIONS_STATUS_1}
          />

          <div className="w-full flex justify-end gap-4 mt-7">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
              Đóng
            </Button>
            <Button
              onClick={handleSubmit((data) => {
                const values = getFieldChanges(data, tag)
                return mutateAsync(values)
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
});

TagUpdate.displayName = TagUpdate.name;
