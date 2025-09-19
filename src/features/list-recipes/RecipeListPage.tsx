import FilterGroup from '@/components/common/filter-recipe/FilterGroup';
import { RecipeList } from './components/RecipeList';
import type { RecipeItemProps } from "@/features/list-recipes/components/RecipeItem";
import { RecipeSort } from './components/RecipeSort';
import SearchSection from '@/components/common/search-bar/SearchSection';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockFilter } from './components/filterData';
import type { Recipe } from '@/types/TypeRecipe';
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchAllRecipes, fetchRecipesByCategory } from "@/store/features/recipeAPISlice";

export default function RecipeListPage() {
	const [params] = useSearchParams();
	const searchValue = params.get('search');
	const categoryName = params.get('category');
	const description = params.get('desc');

	const [searchInput, setSearchInput] = useState(searchValue || '');

	const dispatch = useAppDispatch();
	const allRecipes = useAppSelector(state => state.recipeAPI.allRecipes);
	const recipesByCategory = useAppSelector(state => state.recipeAPI.recipesByCategory);

	const [displayRecipes, setDisplayRecipes] = useState<Recipe[]>([]);

	// Fetch when component mounts or category changes
	useEffect(() => {
		if (categoryName) {
			if (!recipesByCategory[categoryName]) 
				dispatch(fetchRecipesByCategory(categoryName));
		} else {
			if (allRecipes.length === 0) 
				dispatch(fetchAllRecipes());
		}
	}, [categoryName]);

	// Update local state for rendering
	useEffect(() => {
		if (categoryName) 
			setDisplayRecipes(recipesByCategory[categoryName] ?? []);
		else 
			setDisplayRecipes(allRecipes);
	}, [categoryName, recipesByCategory, allRecipes]);

	// map from Recipe -> RecipeItemProps to coordinate with params in RecipeList
	const mappedRecipes: RecipeItemProps[] = useMemo(
        () =>
          displayRecipes.map((r) => ({
            id: r.id,
            title: r.title,
            creator: r.author.email.split('@')[0],
            totalTime: `${r.cookTime + r.prepTime} min`,
            rating: r.avgRating,
            reviewCount: r.ratingCount,
            imageUrl: r.imageUrl ?? "/placeholder.svg",
          })),
        [displayRecipes]
    );

	const filter = mockFilter;

	const handleSearch = (value: string) => {
		console.log('Searching for:', value);
	};

	const handleRecipeClick = (id: string) => {
		console.log('Recipe clicked:', id);
	};

	return (
		<div>
			<SearchSection
				backgroundColor="bg-gray-300"
				searchPlaceholder={searchValue ? searchValue : 'Search by dish, ingredient, ......'}
				searchValue={searchInput}
				onSearchChange={setSearchInput}
				onSearch={handleSearch}
				breadcrumbTitle="Recipes"
				showBreadcrumbs={true}
				height="h-40"
			/>

			<div className="px-8 py-5">
				{categoryName && (
					<div className="text-center py-8">
						<div className="text-5xl font-cormorant font-semibold text-gray-900 tracking-tight text-balance mb-4">
							{categoryName}
						</div>
						<div className="w-full text-gray-600 text-lg leading-relaxed text-pretty">
							{description}
						</div>
					</div>
				)}

				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold text-neutral-800">FILTER BY</h3>
					<RecipeSort />
				</div>

				<div className="flex flex-row gap-8">
					<FilterGroup filterData={filter} />
					<RecipeList
						recipeList={mappedRecipes}
						layout="default"
						onRecipeClick={handleRecipeClick}
					/>
				</div>
			</div>
		</div>
	);
}
