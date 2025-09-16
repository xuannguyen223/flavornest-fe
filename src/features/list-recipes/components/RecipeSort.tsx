'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useSort } from '@/hooks';

const sortOptions = [
	{ value: 'relevance', label: 'Relevance' },
	{ value: 'newest', label: 'Newest' },
	{ value: 'oldest', label: 'Oldest' },
	{ value: 'most-positive', label: 'Most positive' },
	{ value: 'least-positive', label: 'Least positive' },
] as const;

export function RecipeSort() {
	const { sortBy, updateSort } = useSort();

	const getCurrentLabel = () => {
		return sortOptions.find(option => option.value === sortBy)?.label || 'Relevance';
	};

	return (
		<div className="flex items-center gap-2">
			<div className="text-sm text-gray-700">Sort by:</div>
			<Select
				value={sortBy}
				onValueChange={updateSort}>
				<SelectTrigger className="w-[140px] border-none shadow-none bg-transparent p-0 h-auto">
					<SelectValue>
						<div className="text-sm font-medium text-gray-900">{getCurrentLabel()}</div>
					</SelectValue>
				</SelectTrigger>
				<SelectContent className="w-[140px] border border-grey-400 shadow-none bg-white p-0 h-auto">
					{sortOptions.map(option => (
						<SelectItem
							key={option.value}
							value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
