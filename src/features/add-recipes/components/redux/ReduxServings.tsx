import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  updateField,
  selectCurrentRecipe,
  selectValidationErrors,
} from "@/store/features/recipeSlice";
import { FormNumberInput } from "@/components/common/FormNumberInput";
import { Label } from "@/components/ui/label";

type ReduxNumberFieldProps = {
  field: keyof import("@/store/features/recipeSlice").RecipeFormData;
  label?: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  inputClassName?: string;
  showLabel?: boolean;
};

export function ReduxServings({
  field,
  label,
  placeholder,
  required,
  min,
  max,
  inputClassName,
  showLabel = true,
}: ReduxNumberFieldProps) {
  const dispatch = useAppDispatch();
  const currentRecipe = useAppSelector(selectCurrentRecipe);
  const validationErrors = useAppSelector(selectValidationErrors);

  const value = currentRecipe[field];
  const error = validationErrors[field];

  const handleChange = (newValue: number | "") => {
    // Validation: chỉ cho phép số nguyên dương
    if (newValue !== "" && (isNaN(newValue) || newValue <= 0 || !Number.isInteger(newValue))) {
      return;
    }
    dispatch(updateField({ field, value: newValue }));
  };

  const content = (
    <FormNumberInput
      value={value as number | ""}
      onChange={handleChange}
      placeholder={placeholder}
      min={min}
      max={max}
      inputClassName={inputClassName}
    />
  );

  if (!showLabel || !label) {
    return content;
  }

  return (
    <div data-field={field} className="space-y-2">
      <div className="flex items-center gap-4">
        <Label className="w-[200px] font-medium text-lg sm:text-xl lg:text-2xl xl:text-[24px] flex-shrink-0">
          {label}
          {required ? <span className="text-(--required-color)">*</span> : null}
        </Label>
        <div className="flex">{content}</div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
