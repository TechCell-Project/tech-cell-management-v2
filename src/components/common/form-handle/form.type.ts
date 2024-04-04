import {
  Control,
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';

/**
 * FormReturn is a type that encapsulates the necessary functions and objects
 * returned by React Hook Form for managing form state.
 *
 * @template T - Type extending FieldValues for the form control.
 * @property {UseFormGetValues<T>} getValues - A function to retrieve the current values of the form fields.
 * @property {UseFormSetValue<T>} setValue - A function to set the value of a form field programmatically.
 * @property {Control<T, any>} control - An object containing the form control methods and properties provided by React Hook Form.
 */
export type FormReturn<T extends FieldValues> = {
  getValues: UseFormGetValues<T>;
  setValue: UseFormSetValue<T>;
  control: Control<T, any>;
  trigger: UseFormTrigger<T>;
};

/**
 * Options interface defines the structure for options.
 * 
 * @template TValue - Type defined for field 'value'.
 * @property {string} label - The label of the option.
 * @property {TValue} value - The value of the option.
 */
export type Options<TValue> = { label: string; value: TValue };
