import { useState } from "react";
import type { FilterOption } from "@/features/list-recipes/components/filterData";

export interface FilterSectionProps {
  title: string;
  options: FilterOption[];
}

function FilterSection({ title, options }: FilterSectionProps)  {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleFilter = () => setOpen(!open);

  const handleSelect = (optionValue: string) => {
    setSelected((prev) =>
      prev.includes(optionValue)
        ? prev.filter((o) => o !== optionValue)
        : [...prev, optionValue]
    );
  };

  return (
    <div className="w-full border-b border-neutral-300 py-2">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <span className="text-neutral-700 text-base font-medium">{title}</span>
        <button
          onClick={toggleFilter}
          className="flex h-8 w-8 items-center justify-center rounded-full ml-auto hover:bg-neutral-100"
        >
          {open ? (
            <img src="/filter-icon/minus-icon.svg" alt="collapse" className="h-4 w-4" />
          ) : (
            <img src="/filter-icon/plus-icon.svg" alt="expand" className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Options list */}
      {open && (
        <div className="mt-3 flex flex-col gap-2">
          {options.map((option) => (
            <label
              key={option.id}
              className="flex items-center justify-between gap-2 cursor-pointer"
            >
              <span className="text-sm text-neutral-700">{option.label}</span>
              <input
                type="checkbox"
                checked={selected.includes(option.value)}
                onChange={() => handleSelect(option.value)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSection;