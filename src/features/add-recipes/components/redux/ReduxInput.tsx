import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateField, selectCurrentRecipe, selectValidationErrors } from '@/store/features/recipeSlice';
import { FormInput } from '@/components/common/FormInput';

type ReduxFieldProps = {
  field: keyof import('@/store/features/recipeSlice').RecipeFormData;
  label?: string;
  placeholder?: string;
  required?: boolean;
  as?: 'input' | 'textarea';
  inputClassName?: string;
  rows?: number;
};

export function ReduxInput({
  field,
  label,
  placeholder,
  required,
  as = 'input',
  inputClassName,
  rows,
}: ReduxFieldProps) {
  const dispatch = useAppDispatch();
  const currentRecipe = useAppSelector(selectCurrentRecipe);
  const validationErrors = useAppSelector(selectValidationErrors);
  
  const value = currentRecipe[field];
  const error = validationErrors[field];

  const handleChange = (newValue: string) => {
    dispatch(updateField({ field, value: newValue }));
  };

  return (
    <div data-field={field}>
      <FormInput
        as={as}
        label={label}
        required={required}
        value={value as string}
        onChange={handleChange}
        placeholder={placeholder}
        error={error}
        inputClassName={inputClassName}
        rows={rows}
      />
    </div>
  );
}