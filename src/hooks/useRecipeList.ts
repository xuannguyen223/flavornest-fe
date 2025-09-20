'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
	fetchAllRecipes,
	fetchRecipesByCategoryName,
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

	const categoryName = params.get('filter');
	const description = params.get('desc');
	const searchValue = params.get('search') || '';

	const [searchInput, setSearchInput] = useState(searchValue);

	const { allRecipes, recipesByCategory, loading } = useAppSelector(state => state.recipeAPI);
	const searchResults = useAppSelector(selectSearchResults);
	const categoriesByType = useAppSelector(state => state.category.categoriesByType);

	useEffect(() => {
		if (searchValue && categoryName) {
			// Search within a specific category - pass both parameters to the thunk
			dispatch(fetchRecipesBySearch({ searchValue, categoryName }));
		} else if (searchValue) {
			// Search only - pass just search value
			dispatch(fetchRecipesBySearch({ searchValue }));
		} else if (categoryName) {
			dispatch(fetchRecipesByCategoryName(categoryName));
		} else {
			dispatch(fetchAllRecipes());
		}
	}, [categoryName, searchValue, dispatch]);

	useEffect(() => {
		setSearchInput(searchValue);
	}, [searchValue]);

	const displayRecipes: Recipe[] = useMemo(() => {
		if (searchValue) {
			// When searching (with or without category), use search results
			return searchResults;
		} else if (categoryName) {
			return recipesByCategory[categoryName] || [];
		} else {
			return allRecipes;
		}
	}, [searchValue, searchResults, categoryName, recipesByCategory, allRecipes]);

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

	console.log('Filter Data:', filterData);

	const handleSearch = (value: string) => {
		setSearchInput(value);

		const currentParams = new URLSearchParams(params);

		if (value.trim()) {
			currentParams.set('search', value.trim());
		} else {
			currentParams.delete('search');
		}

		const queryString = currentParams.toString();
		navigate(queryString ? `?${queryString}` : '/recipes');
	};

	const handleFilterChange = (selectedCategories: string[]) => {
		const currentParams = new URLSearchParams(params);
		console.log('Selected Categories:', selectedCategories);

		if (selectedCategories.length > 0) {
			// For now, use the first selected category (can be extended for multiple)
			currentParams.set('filter', selectedCategories[0]);
		} else {
			currentParams.delete('filter');
		}

		const queryString = currentParams.toString();
		navigate(queryString ? `?${queryString}` : '/recipes');
	};

	const handleRecipeClick = (id: string) => {
		console.log('Recipe clicked:', id);
		// Add navigation logic here if needed
	};

	const hasNoResults = useMemo(() => {
		return (searchValue || categoryName) && displayRecipes.length === 0 && !loading;
	}, [searchValue, categoryName, displayRecipes.length, loading]);

	return {
		categoryName,
		description,
		searchValue,
		searchInput,
		setSearchInput,
		handleSearch,
		mappedRecipes,
		loading,
		hasNoResults,
		filterData,
		handleRecipeClick,
		handleFilterChange,
	};
}
