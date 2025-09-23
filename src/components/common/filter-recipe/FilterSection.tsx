'use client';

import { useState, useEffect } from 'react';
import type { FilterOption } from './FilterGroup';

export interface FilterSectionProps {
	title: string;
	options: FilterOption[];
	selected: string[];
	onSelect: (optionValue: string) => void;
}

function FilterSection({ title, options, selected, onSelect }: FilterSectionProps) {
	const [open, setOpen] = useState(false);

	// Kiểm tra xem có option nào trong section này được chọn hay không
    useEffect(() => {
        const hasSelectedOption = options.some(option => selected.includes(option.label));
        setOpen(hasSelectedOption);
    }, [selected, options]);

	const toggleFilter = () => setOpen(!open);

	return (
		<div className="w-full border-b border-neutral-300 py-2">
			{/* Section header */}
			<div className="flex items-center justify-between">
				<span className="text-neutral-700 text-base font-medium">{title}</span>
				<button
					onClick={toggleFilter}
					className="flex h-8 w-8 items-center justify-center rounded-full ml-auto hover:bg-neutral-100">
					{open ? (
						<img
							src="/filter-icon/minus-icon.svg"
							alt="collapse"
							className="h-4 w-4"
						/>
					) : (
						<img
							src="/filter-icon/plus-icon.svg"
							alt="expand"
							className="h-4 w-4"
						/>
					)}
				</button>
			</div>

			{open && (
				<div className="mt-3 flex flex-col gap-2">
					{options.map(option => (
						<label
							key={option.id}
							className="flex items-center justify-between gap-2 cursor-pointer">
							<span className="text-sm text-neutral-700">{option.label}</span>
							<input
								type="checkbox"
								checked={selected.includes(option.label)}
								onChange={() => onSelect(option.label)}
								className="h-4 w-4 text-neutral-600 rounded border-gray-300 focus:ring-neutral-500"
							/>
						</label>
					))}
				</div>
			)}
		</div>
	);
}

export default FilterSection;
