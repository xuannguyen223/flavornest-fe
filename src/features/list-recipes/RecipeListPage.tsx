import FilterGroup from '@/components/common/filter-recipe/FilterGroup';
import { RecipeList } from './components/RecipeList';
import type { RecipeItemProps } from "@/features/list-recipes/components/RecipeItem";
import { RecipeSort } from './components/RecipeSort';
import SearchSection from '@/components/common/search-bar/SearchSection';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Recipe } from '@/types/TypeRecipe';
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchAllRecipes, fetchRecipesByCategory, fetchRecipesByCategoryType } from "@/store/features/recipeAPISlice";
import type { Filter } from './components/filterData';
import { formatCategoryType } from '@/lib/utils';

export default function RecipeListPage() {
	const [params] = useSearchParams();
	const searchValue = params.get('search');
	const categoryName = params.get('category');
	const description = params.get('desc');
	const categoryType = params.get('categoryType');

	const [searchInput, setSearchInput] = useState(searchValue || '');

	const dispatch = useAppDispatch();
	const {
		allRecipes,
		recipesByCategory,
		recipesByCategoryType,
		loading,
	} = useAppSelector((state) => state.recipeAPI);

	const categoriesByType = useAppSelector((state) => state.category.categoriesByType);

	const [displayRecipes, setDisplayRecipes] = useState<Recipe[]>([]);

	// Gọi API khi mount hoặc params thay đổi
	useEffect(() => {
    if (categoryType) {
      if (!recipesByCategoryType[categoryType]) {
        dispatch(fetchRecipesByCategoryType(categoryType));
      }
    } else if (categoryName) {
      if (!recipesByCategory[categoryName]) {
        dispatch(fetchRecipesByCategory(categoryName));
		console.log(categoryName);
      }
    } else {
      if (allRecipes.length === 0) {
        dispatch(fetchAllRecipes());
      }
    }
  	}, [categoryName, categoryType, dispatch]);

	// Update displayRecipes khi data Redux thay đổi
	useEffect(() => {
		if (categoryType) {
		  setDisplayRecipes(recipesByCategoryType[categoryType] ?? []);
		} else if (categoryName) {
		  setDisplayRecipes(recipesByCategory[categoryName] ?? []);
		} else {
		  setDisplayRecipes(allRecipes);
		}
	  }, [categoryName, categoryType, recipesByCategory, recipesByCategoryType, allRecipes]);

	// map from Recipe -> RecipeItemProps to coordinate with params in RecipeList Component
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

	const filterData: Filter[] = Object.entries(categoriesByType).map(([type, items]) => ({
		id: type,
		title: formatCategoryType(type), 
		options: items.map(item => ({
		  id: item.id,
		  label: item.name, // 'Thai', 'Italian'
		  value: item.id
		}))
	  }));

	const handleSearch = (value: string) => {
		console.log('Searching for:', value);
	};

	const handleRecipeClick = (id: string) => {
		console.log('Recipe clicked:', id);
	};

	return (
		<div>
			<SearchSection
				backgroundColor="bg-neutral-300"
				searchPlaceholder={searchValue ? searchValue : 'Search by dish, ingredient, ......'}
				searchValue={searchInput}
				onSearchChange={setSearchInput}
				onSearch={handleSearch}
				breadcrumbTitle="Recipes"
				showBreadcrumbs={true}
				height="h-40"
			/>

			<div className="px-8 py-3">
				{categoryName && (
					<div className="text-center">
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
					<FilterGroup filterData={filterData} />
					{loading ? (
						<p>Loading recipes...</p>
					) : (
						<RecipeList 
							recipeList={mappedRecipes} 
							layout="default" 
							onRecipeClick={handleRecipeClick} />
					)}
				</div>
			</div>
		</div>
	);
}
