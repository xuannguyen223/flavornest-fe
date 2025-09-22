'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useSort } from '@/hooks';
import { cn } from '@/lib/utils';

const defaultSortOptions = [
	{ value: 'atoz', label: 'A - Z' },
	{ value: 'ztoa', label: 'Z - A' },
	{ value: 'newest', label: 'Newest' },
	{ value: 'oldest', label: 'Oldest' },
	{ value: 'rating', label: 'Most rating' },
];

interface RecipeSortProps {
	sortOptions?: { value: string; label: string }[];
	className?: string;
}

export function RecipeSort({ sortOptions = defaultSortOptions, className = '' }: RecipeSortProps) {
	const { sortBy, updateSort } = useSort();

	const getCurrentLabel = () => {
		return sortOptions.find(option => option.value === sortBy)?.label || 'Newest';
	};

	return (
		<div className={`flex items-center gap-2 p-4 ${className}`}>
			<div className="text-lg font-medium text-neutral-700">Sort by:</div>
			<Select
				value={sortBy}
				onValueChange={updateSort}>
				<SelectTrigger
					className={cn(
						'w-[160px] rounded-md border border-neutral-300 bg-white px-4 py-2 text-base font-medium text-neutral-700',
						'hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors duration-200',
					)}>
					<SelectValue>{getCurrentLabel()}</SelectValue>
				</SelectTrigger>
				<SelectContent
					className={cn(
						'w-[160px] rounded-md border border-neutral-300 bg-white shadow-md',
						'text-base text-neutral-900',
					)}>
					{sortOptions.map(option => (
						<SelectItem
							key={option.value}
							value={option.value}
							className={cn(
								'rounded-sm px-4 py-2 cursor-pointer',
								'hover:bg-neutral-100 hover:text-neutral-900 focus:bg-neutral-100 focus:text-neutral-800 transition-colors duration-150',
							)}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
