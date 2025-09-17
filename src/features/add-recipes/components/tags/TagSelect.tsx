import { FormSelect } from "@/components/common/FormSelect";

type TagSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  error?: string;
};

export function TagSelect({
  value,
  onChange,
  options,
  placeholder,
  error,
}: TagSelectProps) {
  return (
    <FormSelect
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      error={error}
      className="mb-[30px]"
    />
  );
}

