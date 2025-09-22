import { RecipeList } from '@/features/list-recipes/components/RecipeList';
import { useMemo } from 'react';
import type { RecipeItemProps } from '@/features/list-recipes/components/RecipeItem';
import type { Recipe } from '../../../types/TypeRecipe';
import { formatTime } from '@/lib/utils';

export interface RecipeRecommendProps {
	recipes: Recipe[];
}
export default function RecipeRecommend({ recipes }: RecipeRecommendProps) {
	// map từ Recipe -> RecipeItemProps để tương ứng với params trong RecipeList
	const mappedRecipes: RecipeItemProps[] = useMemo(
		() =>
			recipes.map(r => ({
				id: r.id,
				title: r.title,
				creator: r.author.profile.name,
				totalTime: formatTime(r.cookTime + r.prepTime),
				rating: r.avgRating,
				reviewCount: r.ratingCount,
				imageUrl: r.imageUrl ?? '/placeholder.svg',
			})),
		[recipes],
	);

	return (
		<section className="text-left mt-8">
			{/* Header */}
			<h2
				className="text-4xl font-semibold 
            leading-tight text-neutral-700">
				Recipes You'll Love
			</h2>
			<RecipeList
				recipeList={mappedRecipes}
				layout="2-rows-4"
				viewAll={{ show: false }}
				className="my-8"
			/>
		</section>
	);
}
