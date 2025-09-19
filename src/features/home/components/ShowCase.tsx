'use client';

import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface CuisineCard {
	id: string;
	title: string;
	description: string;
	image: string;
	category: string;
}

interface ShowCaseProps {
	onViewAll?: () => void;
	onCardClick?: (id: string) => void;
}

const cuisineData: CuisineCard[] = [
	{
		id: 'italian',
		title: 'Italian Delights: A Journey Through Classic Flavors',
		description:
			'Discover the heart of Italy with iconic dishes like pasta al pomodoro and tiramisu, bringing authentic Italian flavors to you.',
		image: '/showcase.png',
		category: 'RECIPE COMPILATION',
	},
	{
		id: 'indian',
		title: 'Spice Up Your Plate: Exploring the Richness of Indian Cuisine',
		description:
			'Dive into the vibrant world of Indian cuisine with aromatic curries, flavorful biryanis, and delectable sweets that ignite the senses.',
		image: '/showcase.png',
		category: 'RECIPE COMPILATION',
	},
	{
		id: 'asian',
		title: 'Savor the Orient: Must-Try Dishes from Asian Kitchens',
		description:
			'Embark on a culinary adventure with Asian favorites like sushi, stir-fries, and dumplings—delicious treasures from diverse Asian cultures.',
		image: '/showcase.png',
		category: 'RECIPE COMPILATION',
	},
];

export function ShowCase({ onViewAll, onCardClick }: ShowCaseProps) {
	const handleCardClick = (id: string) => {
		onCardClick?.(id);
	};

	return (
		<div className={`w-full mx-auto px-20 pb-20`}>
			<div className="flex items-center justify-between mb-8">
				<div className="text-5xl font-cormorant font-semibold text-gray-900 tracking-tight text-balance">
					International Flavor Showcase
				</div>
				<Button
					variant="ghost"
					onClick={onViewAll}
					className="text-gray-700 hover:text-gray-900 font-light text-lg tracking-wide uppercase cursor-pointer">
					VIEW ALL
					<ChevronRight className="w-4 h-4" />
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{cuisineData.map(cuisine => (
					<div
						key={cuisine.id}
						className="group cursor-pointer"
						onClick={() => handleCardClick(cuisine.id)}>
						<div className="relative overflow-hidden rounded-lg mb-4">
							<img
								src={cuisine.image || '/placeholder.svg'}
								alt={cuisine.title}
								className="rounded-lg w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
							/>
						</div>

						<div className="space-y-3 text-justify">
							<div className="text-xl font-medium text-gray-500 uppercase tracking-wide">
								{cuisine.category}
							</div>

							<div className="text-2xl font-semibold text-gray-900 leading-tight">
								{cuisine.title}
							</div>

							<div className="text-gray-600 text-lg leading-relaxed">{cuisine.description}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
