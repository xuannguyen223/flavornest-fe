import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type FormSelectProps = {
	label?: string;
	required?: boolean;
	value: string;
	onChange: (value: string) => void;
	options: string[];
	placeholder?: string;
	error?: string;
	className?: string;
	selectClassName?: string;
};

export function FormSelect({
	label,
	required,
	value,
	onChange,
	options,
	placeholder,
	error,
	className,
	selectClassName,
}: FormSelectProps) {
	return (
		<div className={cn('space-y-2', className)}>
			{label ? (
				<Label className="font-medium text-sm sm:text-base lg:text-lg xl:text-xl">
					{label}
					{required ? <span className="text-(--required-color)">*</span> : null}
				</Label>
			) : null}

			<select
				value={value}
				onChange={e => onChange(e.target.value)}
				style={{
					backgroundImage: 'url(/chevron.svg)',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'right 8px center',
				}}
				className={cn(
					'h-12 w-full rounded-[5px] px-4',
					'border border-solid border-(--border-color)',
					'text-xs sm:text-sm lg:text-base xl:text-lg',
					value === '' ? 'text-(--light-gray-color)' : 'text-(--primary-color)',
					'focus-visible:ring-0 focus:border-(--border-color)',
					'appearance-none pr-10',
					selectClassName,
				)}>
				<option
					value=""
					disabled
					hidden>
					{placeholder}
				</option>
				{options.map(option => (
					<option
						key={option}
						value={option}>
						{option}
					</option>
				))}
			</select>

			{error && <p className="text-sm text-red-500">{error}</p>}
		</div>
	);
}

export default FormSelect;
