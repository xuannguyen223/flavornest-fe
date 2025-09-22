import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
	updateField,
	selectCurrentRecipe,
	selectValidationErrors,
} from '@/store/features/recipeSlice';
import { FormNumberInput } from '@/components/common/FormNumberInput';
import { Label } from '@/components/ui/label';
import type { TimeValue } from '@/store/features/recipeSlice';

type ReduxTimeFieldProps = {
	field: 'prepTime' | 'cookTime';
	label: string;
	required?: boolean;
};

export function ReduxTime({ field, label, required }: ReduxTimeFieldProps) {
	const dispatch = useAppDispatch();
	const currentRecipe = useAppSelector(selectCurrentRecipe);
	const validationErrors = useAppSelector(selectValidationErrors);

	const timeValue = currentRecipe[field] as TimeValue;
	const error = validationErrors[field];

	const handleTimeChange = (fieldName: 'hrs' | 'mins', value: string) => {
		const numValue = value === '' ? '' : parseInt(value, 10);
		if (value !== '' && (typeof numValue !== 'number' || isNaN(numValue) || numValue < 0)) {
			return;
		}

		// Validation cho minutes: phải từ 0 đến 60
		if (
			fieldName === 'mins' &&
			value !== '' &&
			typeof numValue === 'number' &&
			(numValue < 0 || numValue > 60)
		) {
			return;
		}

		const newTimeValue = {
			...timeValue,
			[fieldName]: numValue,
		};

		dispatch(updateField({ field, value: newTimeValue }));
	};

	return (
		<div
			data-field={field}
			className="space-y-2">
			<div className="flex items-center gap-4">
				<Label
					className="w-[150px] font-medium text-sm sm:text-base lg:text-lg xl:text-xl flex-shrink-0">
					{label}
					{required ? <span className="text-(--required-color)">*</span> : null}
				</Label>
				<div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
					<FormNumberInput
						value={timeValue.hrs}
						onChange={v => handleTimeChange('hrs', String(v))}
						placeholder="hrs"
						min={0}
						inputClassName="w-20 sm:w-24 lg:w-28 xl:w-[134px] h-8 sm:h-8 lg:h-10 xl:h-14 placeholder:text-(--light-gray-color) text-(--primary-color) text-xs sm:text-sm lg:text-base xl:text-lg border-1 border-solid border-(--border-color) rounded-[10px]"
					/>
					<FormNumberInput
						value={timeValue.mins}
						onChange={v => handleTimeChange('mins', String(v))}
						placeholder="mins"
						min={0}
						max={60}
						inputClassName="w-20 sm:w-24 lg:w-28 xl:w-[134px] h-8 sm:h-8 lg:h-10 xl:h-14 placeholder:text-(--light-gray-color) text-(--primary-color) text-xs sm:text-sm lg:text-base xl:text-lg border-1 border-solid border-(--border-color) rounded-[10px]"
					/>
				</div>
			</div>
			{error && <p className="text-sm text-red-500">{error}</p>}
		</div>
	);
}
