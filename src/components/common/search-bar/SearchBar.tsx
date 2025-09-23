'use client';

import type React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
	placeholder?: string;
	onSearch?: (value: string) => void;
	value?: string;
	onChange?: (value: string) => void;
	className?: string;
}

export default function SearchBar({
	placeholder = 'Search recipes by name...',
	onSearch,
	value,
	onChange,
	className = '',
}: SearchBarProps) {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (onSearch) {
			onSearch(value ?? '');
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(e.target.value);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={className}>
			<div className="mx-auto flex w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl items-center rounded-full bg-white px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 border border-neutral-400/50">
				<Search className="h-5 w-5 sm:h-6 sm:w-6 text-neutral-600" />
				<input
					type="text"
					placeholder={placeholder}
					value={value}
					onChange={handleInputChange}
					className="ml-3 sm:ml-4 w-full border-none bg-transparent text-gray-600 placeholder-gray-400 focus:outline-none text-sm sm:text-base"
				/>
			</div>
		</form>
	);
}
