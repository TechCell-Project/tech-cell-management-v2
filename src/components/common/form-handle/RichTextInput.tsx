import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui';
import { memo } from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';
import Tiptap from '../tiptap';

/**
 * RichTextInputProps defines the props for the RichTextInput component.
 *
 * @template T - Type extending FieldValues for the control.
 * @property {FieldPath<T>} name - The name/path of the field in the form.
 * @property {string} label - The label for the text input field.
 * @property {string} [className] - Optional class name for styling purposes.
 */
type RichTextInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  className?: string;
};

/**
 * RichTextInput is a component used for rendering a text input field.
 * It integrates with React Hook Form + Tiptap editor for form management.
 *
 * @template T - Type extending FieldValues for the control.
 * @param {TextInputProps<T>} props - Props object for the TextInput component.
 * @returns {JSX.Element} - Returns the JSX element for the text input field.
 */
const RichTextInput = <T extends FieldValues>({
  name,
  label,
  className,
}: RichTextInputProps<T>): JSX.Element => {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-[13px]">{label}</FormLabel>
          <FormControl>
            <Tiptap value={field.value} onChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const MemoizedRichTextInput = memo(RichTextInput) as <T extends FieldValues>(
  props: RichTextInputProps<T>,
) => JSX.Element;

export { MemoizedRichTextInput as RichTextInput };
