import { FormSelect } from '@/components/common/FormSelect';

type CategoryItemProps = {
	value: string;
	onChange: (value: string) => void;
	options: string[];
	placeholder?: string;
	error?: string;
};

export function CategoryItem({ value, onChange, options, placeholder, error }: CategoryItemProps) {
	return (
		<FormSelect
			value={value}
			onChange={onChange}
			options={options}
			placeholder={placeholder}
			error={error}
			className="mb-6"
		/>
	);
}
