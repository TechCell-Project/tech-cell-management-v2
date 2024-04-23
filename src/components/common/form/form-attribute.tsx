// 'use client';

// import { PaginationResponse } from '@/common/model';
// import { Attribute } from '@/modules/attribute-mnt/models';
// import { Fragment } from 'react';
// import { ArrayPath, FieldValues, Path, PathValue, useFieldArray, useFormContext } from 'react-hook-form';
// import { SelectInput, TextInput } from '../form-handle';

// type FormAttributeProps<T extends FieldValues> = {
//   name: keyof T;
//   listAttribute?: PaginationResponse<Attribute>;
// };

// export const FormAttribute = <T extends FieldValues>({
//   name,
//   listAttribute,
// }: FormAttributeProps<T>) => {
//   const { control, setValue } = useFormContext<T>();

//   const { fields, remove, append } = useFieldArray({
//     control,
//     name: name as ArrayPath<T>,
//   });

//   return fields.map((field, index) => (
//     <Fragment key={field.id}>
//       <SelectInput<T>
//         label="Thông số"
//         name={`${name as string}.${index}.k` as Path<T>}
//         options={listAttribute?.data ?? []}
//         typeOption="custom"
//         displayLabel="name"
//         displayValue="label"
//         onChange={(value) => {
//           setValue(`${name as string}.${index}.k` as Path<T>, value as PathValue<T, Path<T>>);
//           const matchingOption = listAttribute?.data.find(
//             (attribute) => attribute.label === value,
//           );
//           if (matchingOption) {
//             setValue(`${name}.${index}.name`, matchingOption.name);
//             setValue(`${name}.${index}.u`, matchingOption.unit);
//             setValue(`${name}.${index}.v`, '');
//           }
//         }}
//       />
//       <TextInput<T> label="Giá trị" name={`${name}.${index}.v`} isDebounce />
//       <Button
//         variant="ghost"
//         type="button"
//         className="h-8 w-8 p-0"
//         onClick={() => remove(index)}
//       >
//         <span className="sr-only">Open menu</span>
//         <X className="h-4 w-4" />
//       </Button>
//     </Fragment>
//   ))
// };
