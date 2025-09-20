'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
	fetchAllRecipes,
	fetchRecipesByCategory,
	fetchRecipesByCategoryType,
	fetchRecipesBySearch,
	selectSearchResults,
} from '@/store/features/recipeAPISlice';
import type { Recipe } from '@/types/TypeRecipe';
import type { RecipeItemProps } from '@/features/list-recipes/components/RecipeItem';
import type { Filter } from '@/features/list-recipes/components/filterData';
import { formatCategoryType } from '@/lib/utils';

export function useRecipeList() {
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const categoryName = params.get('category');
	const description = params.get('desc');
	const categoryType = params.get('categoryType');
	const searchValue = params.get('search') || '';

	const [searchInput, setSearchInput] = useState(searchValue);

	const { allRecipes, recipesByCategory, recipesByCategoryType, loading } = useAppSelector(
		state => state.recipeAPI,
	);
	const searchResults = useAppSelector(selectSearchResults);
	const categoriesByType = useAppSelector(state => state.category.categoriesByType);

	useEffect(() => {
		if (searchValue) {
			dispatch(fetchRecipesBySearch(searchValue));
			return;
		}

		if (categoryType && !recipesByCategoryType[categoryType]) {
			dispatch(fetchRecipesByCategoryType(categoryType));
		} else if (categoryName && !recipesByCategory[categoryName]) {
			dispatch(fetchRecipesByCategory(categoryName));
		} else if (!categoryName && !categoryType && allRecipes.length === 0) {
			dispatch(fetchAllRecipes());
		}
	}, [categoryType, categoryName, searchValue, dispatch]);

	useEffect(() => {
		setSearchInput(searchValue);
	}, [searchValue]);

	const displayRecipes: Recipe[] = useMemo(() => {
		if (searchValue && searchResults.length > 0) {
			return searchResults;
		} else if (categoryType) {
			return recipesByCategoryType[categoryType] ?? [];
		} else if (categoryName) {
			return recipesByCategory[categoryName] ?? [];
		} else {
			return allRecipes;
		}
	}, [
		searchValue,
		searchResults,
		categoryType,
		categoryName,
		allRecipes,
		recipesByCategory,
		recipesByCategoryType,
	]);

	const mappedRecipes: RecipeItemProps[] = useMemo(
		() =>
			displayRecipes.map(r => ({
				id: r.id,
				title: r.title,
				creator: r.author.email.split('@')[0],
				totalTime: `${r.cookTime + r.prepTime} min`,
				rating: r.avgRating,
				reviewCount: r.ratingCount,
				imageUrl: r.imageUrl ?? '/placeholder.svg',
			})),
		[displayRecipes],
	);

	const filterData: Filter[] = useMemo(
		() =>
			Object.entries(categoriesByType).map(([type, items]) => ({
				id: type,
				title: formatCategoryType(type),
				options: items.map(item => ({
					id: item.id,
					label: item.name,
					value: item.id,
				})),
			})),
		[categoriesByType],
	);

	const handleSearch = (value: string) => {
		setSearchInput(value);

		if (value.length > 0 && value.trim()) {
			navigate(`?search=${encodeURIComponent(value.trim())}`);
		} else {
			// Clear search and show all recipes
			navigate(`/recipes`);
		}
	};

	const handleRecipeClick = (id: string) => {
		console.log('Recipe clicked:', id);
		// Add navigation logic here if needed
	};

	const hasNoResults = useMemo(() => {
		return searchValue && searchResults.length === 0 && !loading;
	}, [searchValue, searchResults.length, loading]);

	return {
		categoryName,
		description,
		searchValue,
		searchInput,
		setSearchInput,
		handleSearch,
		hasNoResults,
		mappedRecipes,
		loading,
		filterData,
		handleRecipeClick,
	};
}
