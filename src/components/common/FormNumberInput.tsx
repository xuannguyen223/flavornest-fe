import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type FormNumberInputProps = {
	label?: string;
	required?: boolean;
	value: number | '';
	onChange: (value: number | '') => void;
	placeholder?: string;
	min?: number;
	max?: number;
	step?: number;
	error?: string;
	className?: string;
	inputClassName?: string;
};

export function FormNumberInput({
	label,
	required,
	value,
	onChange,
	placeholder,
	min,
	max,
	step,
	error,
	className,
	inputClassName,
}: FormNumberInputProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		if (val === '') return onChange('');
		const num = Number(val);
		if (!Number.isNaN(num)) onChange(num);
	};

	return (
		<div className={cn('space-y-2', className)}>
			{label ? (
				<Label className="font-medium text-sm sm:text-base lg:text-lg xl:text-xl">
					{label}
					{required ? <span className="text-(--required-color)">*</span> : null}
				</Label>
			) : null}

			<Input
				type="number"
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				min={min}
				max={max}
				step={step}
				className={cn(
					'w-full sm:w-48 lg:w-64 xl:w-[288px] h-8 sm:h-8 lg:h-10 xl:h-12 placeholder:text-(--light-gray-color) text-(--primary-color) text-xs sm:text-sm lg:text-base xl:text-lg border-1 border-solid border-(--border-color) rounded-[10px]',
					inputClassName,
				)}
			/>

			{error && <p className="text-sm text-red-500">{error}</p>}
		</div>
	);
}

export default FormNumberInput;
