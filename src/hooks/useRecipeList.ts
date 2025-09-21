'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
	fetchAllRecipes,
	fetchRecipesByCategoryNames,
	fetchRecipesBySearch,
	selectSearchResults,
} from '@/store/features/recipeAPISlice';
import type { Recipe } from '@/types/TypeRecipe';
import type { RecipeItemProps } from '@/features/list-recipes/components/RecipeItem';
import type { Filter } from '@/components/common/filter-recipe/FilterGroup';
import { formatCategoryType } from '@/lib/utils';

export function useRecipeList() {
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const categoryNames = params.getAll('filter');
	const description = params.get('desc');
	const searchValue = params.get('search') || '';

	const [searchInput, setSearchInput] = useState(searchValue);

	const { allRecipes, recipesByCategory, loading } = useAppSelector(state => state.recipeAPI);
	const searchResults = useAppSelector(selectSearchResults);
	const categoriesByType = useAppSelector(state => state.category.categoriesByType);

	const memoizedCategoryNames = useMemo(() => categoryNames, [categoryNames.join(',')]);

	useEffect(() => {
		if (searchValue && memoizedCategoryNames.length > 0) {
			dispatch(fetchRecipesBySearch({ searchValue, categoryNames: memoizedCategoryNames }));
		} else if (searchValue) {
			dispatch(fetchRecipesBySearch({ searchValue }));
		} else if (memoizedCategoryNames.length) {
			dispatch(fetchRecipesByCategoryNames({ categoryNames: memoizedCategoryNames }));
		} else {
			dispatch(fetchAllRecipes());
		}
	}, [memoizedCategoryNames, searchValue, dispatch]);

	useEffect(() => {
		setSearchInput(searchValue);
	}, [searchValue]);

	const displayRecipes: Recipe[] = useMemo(() => {
		if (searchValue) {
			return searchResults;
		} else if (memoizedCategoryNames.length > 1) {
			return searchResults;
		} else if (memoizedCategoryNames.length === 1) {
			return recipesByCategory[memoizedCategoryNames[0]] || [];
		} else {
			return allRecipes;
		}
	}, [searchValue, searchResults, memoizedCategoryNames, recipesByCategory, allRecipes]);

	const mappedRecipes: RecipeItemProps[] = useMemo(
		() =>
			displayRecipes.map(r => ({
				id: r.id,
				title: r.title,
				creator: r.author.profile.name,
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

	const displayCategoryNames = useMemo(() => {
		if (memoizedCategoryNames.length === 0) return [];

		const categoryMap = new Map();
		filterData.forEach(filter => {
			filter.options.forEach(option => {
				categoryMap.set(option.value, option.label);
			});
		});

		return memoizedCategoryNames.map(id => categoryMap.get(id)).filter(Boolean);
	}, [memoizedCategoryNames, filterData]);

	const hasNoResults = useMemo(() => {
		return (
			(searchValue || memoizedCategoryNames.length > 0) && displayRecipes.length === 0 && !loading
		);
	}, [searchValue, memoizedCategoryNames.length, displayRecipes.length, loading]);

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

	const handleCategorySelect = (categoryName: string) => {
		const currentParams = new URLSearchParams(params);
		currentParams.set('filter', categoryName);

		const queryString = currentParams.toString();
		navigate(`?${queryString}`);
	};

	const handleRecipeClick = (id: string) => {
		console.log('Recipe clicked:', id);
		// Add navigation logic here if needed
	};

	const handleFilterChange = (selectedCategories: string[]) => {
		const currentParams = new URLSearchParams(params);

		currentParams.delete('filter');

		selectedCategories.forEach(category => {
			currentParams.append('filter', category);
		});

		const queryString = currentParams.toString();
		navigate(queryString ? `?${queryString}` : '/recipes');
	};

	return {
		categoryNames: memoizedCategoryNames,
		displayCategoryNames,
		description,
		searchValue,

		searchInput,
		setSearchInput,
		handleSearch,

		mappedRecipes,
		loading,
		hasNoResults,

		filterData,
		handleFilterChange,

		handleRecipeClick,
		handleCategorySelect,
	};
}
