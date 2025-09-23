import { cn } from "@/lib/utils";

type CategoryItemProps = {
  value: string[];
  onChange: (values: string[]) => void;
  options: string[];
  placeholder?: string;
  error?: string;
};

export function CategoryItem({
  value,
  onChange,
  options,
  placeholder,
  error,
}: CategoryItemProps) {
  const availableOptions = options.filter((opt) => !value.includes(opt));

  const handleAdd = (newVal: string) => {
    if (!newVal) return;
    if (value.includes(newVal)) return;
    onChange([...value, newVal]);
  };

  const handleRemove = (name: string) => {
    onChange(value.filter((v) => v !== name));
  };

  return (
    <div className="mb-6 space-y-2">
      <div
        className={cn(
          "min-h-12 w-full rounded-[5px] px-2 py-2 border border-solid border-(--border-color) text-xs sm:text-sm lg:text-base xl:text-lg flex flex-wrap gap-2 items-center"
        )}
      >
        {value.map((name) => (
          <span
            key={name}
            className="flex items-center gap-2 rounded-[5px] px-2 py-1 bg-(--secondary-bg-color) text-(--primary-color) border border-solid border-(--border-color)"
          >
            {name}
            <button
              type="button"
              aria-label={`Remove ${name}`}
              className="text-(--light-gray-color) hover:text-(--primary-color)"
              onClick={() => handleRemove(name)}
            >
              ×
            </button>
          </span>
        ))}

        <select
          value=""
          onChange={(e) => {
            handleAdd(e.target.value);
            e.currentTarget.value = "";
          }}
          style={{
            backgroundImage: "url(/chevron.svg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 8px center",
          }}
          className={cn(
            "h-8 min-w-[160px] flex-1 rounded-[5px] px-2 text-(--light-gray-color) border-none outline-none focus:border-transparent focus:outline-none focus-visible:ring-0 appearance-none pr-8"
          )}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {availableOptions.map((option) => (
            <option
              key={option}
              value={option}
              className="text-(--primary-color)"
            >
              {option}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
