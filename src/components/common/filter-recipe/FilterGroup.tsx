'use client';

import { useState } from 'react';
import FilterSection from './FilterSection'; 

export interface FilterOption {
	id: string;
	label: string;
	value: string;
}

export interface Filter {
	id: string;
	title: string;
	options: FilterOption[];
}

interface FilterGroupProps {
	filterData: Filter[];
	onFilterChange?: (selectedCategories: string[]) => void;
}

export default function FilterGroup({ filterData, onFilterChange }: FilterGroupProps) {
	const [selected, setSelected] = useState<string[]>([]);

	const handleSelect = (optionValue: string) => {
		const newSelected = selected.includes(optionValue)
			? selected.filter(o => o !== optionValue)
			: [...selected, optionValue];

		setSelected(newSelected);
		onFilterChange?.(newSelected);
	};

	return (
		<div className="w-64 space-y-4">
			{filterData.map(filter => (
				<FilterSection
					key={filter.id}
					title={filter.title}
					options={filter.options}
					selected={selected}
					onSelect={handleSelect}
				/>
			))}
		</div>
	);
}
