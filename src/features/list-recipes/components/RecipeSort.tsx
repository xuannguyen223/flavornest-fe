'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useSort } from '@/hooks';

const defaultSortOptions = [
	{ value: 'relevance', label: 'Relevance' },
	{ value: 'newest', label: 'Newest' },
	{ value: 'oldest', label: 'Oldest' },
	{ value: 'most-positive', label: 'Most positive' },
	{ value: 'least-positive', label: 'Least positive' },
];

interface RecipeSortProps {
	sortOptions?: { value: string; label: string }[];
	className?: string;
}

export function RecipeSort({ sortOptions = defaultSortOptions, className = '' }: RecipeSortProps) {
	const { sortBy, updateSort } = useSort();

	const getCurrentLabel = () => {
		return sortOptions.find(option => option.value === sortBy)?.label || 'Relevance';
	};

	return (
		<div className={`flex items-center gap-2 p-4 ${className}`}>
			<div className="text-lg text-gray-700">Sort by:</div>
			<Select
				value={sortBy}
				onValueChange={updateSort}>
				<SelectTrigger className="w-[140px] border-none shadow-none bg-transparent p-0 h-auto">
					<SelectValue>
						<div className="text-lg font-medium text-gray-900">{getCurrentLabel()}</div>
					</SelectValue>
				</SelectTrigger>
				<SelectContent className="w-fit border-0.5 border-grey-200 shadow-none bg-white p-0 h-auto">
					{sortOptions.map(option => (
						<SelectItem
							key={option.value}
							value={option.value}
							className="text-lg text-gray-900">
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
