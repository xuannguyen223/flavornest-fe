'use client';

import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface RecipeHighlight {
	id: string;
	title: string;
	description: string;
}

interface BlogPostProps {
	categoryName?: string;
	onViewAllClick?: () => void;
	onRecipeClick?: (id: string) => void;
}

export function BlogPost({
	categoryName = 'Healthy Eating Inspiration',
	onViewAllClick,
	onRecipeClick,
}: BlogPostProps) {
	const recipeHighlights: RecipeHighlight[] = [
		{
			id: '1',
			title: 'Delicious Dishes Packed with Nutrition',
			description:
				'Explore a collection of mouthwatering recipes that not only delight your taste buds but also pack a powerful nutritional punch.',
		},
		{
			id: '2',
			title: 'Fuel Your Day with Plant-Based Power',
			description:
				'Dive into the world of plant-based goodness with recipes that provide both energy and exceptional flavors, making each bite a celebration of health.',
		},
		{
			id: '3',
			title: 'One-Pan Wonders for Stress-Free Cooking',
			description:
				'Simplify your culinary journey with stress-free, one-pan wonders—recipes that prioritize convenience without compromising on nutritional value or taste.',
		},
	];

	return (
		<div className={`w-full mx-auto px-20`}>
			<div className="flex items-center justify-between mb-8">
				<div className="text-5xl font-cormorant font-semibold text-gray-900 tracking-tight text-balance">
					{categoryName}
				</div>
				<Button
					variant="ghost"
					onClick={onViewAllClick}
					className="text-gray-700 hover:text-gray-900 font-light text-lg tracking-wide uppercase cursor-pointer">
					VIEW ALL
					<ChevronRight className="w-4 h-4" />
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
				<div className="relative">
					<img
						src="/post-img.png"
						alt="Healthy bowl with avocado and greens"
						className="w-full h-[300px] md:h-[400px] object-cover shadow-sm rounded-lg"
					/>
				</div>

				<div className="flex flex-col justify-between h-full">
					{recipeHighlights.map(recipe => (
						<div
							key={recipe.id}
							className="pb-4 border-b border-b-gray-300 cursor-pointer group transition-all duration-200 hover:bg-gray-50"
							onClick={() => onRecipeClick?.(recipe.id)}>
							<div className="text-xl md:text-2xl font-medium text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
								{recipe.title}
							</div>
							<div className="text-gray-600 leading-relaxed text-base md:text-lg">
								{recipe.description}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
