import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatCategoryType = (type: string | null) => {
	if (!type) return '';
	return type
		.toLowerCase()
		.split('_')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};

export function formatTime(totalMinutes: number): string {
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;

	let result = '';
	if (hours > 0) {
		result += `${hours} hour${hours > 1 ? 's' : ''}`;
	}
	if (minutes > 0) {
		if (hours > 0) result += ' ';
		result += `${minutes} min`;
	}
	return result || '0 min';
}
