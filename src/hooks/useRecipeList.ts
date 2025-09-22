'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
	fetchAllRecipes,
	fetchRecipesByCategoryNames,
	fetchRecipesByCategoryType,
	fetchRecipesBySearch,
	selectSearchResults,
	fetchFavoriteRecipes,
} from '@/store/features/recipeAPISlice';
import type { Recipe } from '@/types/TypeRecipe';
import type { RecipeItemProps } from '@/features/list-recipes/components/RecipeItem';
import type { Filter } from '@/components/common/filter-recipe/FilterGroup';
import { formatCategoryType, formatTime } from '@/lib/utils';
import type { FilterOption } from '@/components/common/filter-recipe/FilterGroup';
import { useLocation } from "react-router-dom";
import { useRef } from 'react';

export function useRecipeList() {
	const location = useLocation();
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isInitialMount = useRef(true);

	const categoryNames = params.getAll('category');
	const categoryType = params.get('categoryType');
	const description = params.get('desc');
	const searchValue = params.get('search') || '';

	const [searchInput, setSearchInput] = useState(searchValue);

	const { allRecipes, recipesByCategory, recipesByCategoryType, loading } = useAppSelector(
		state => state.recipeAPI,
	);
	const searchResults = useAppSelector(selectSearchResults);
	const categoriesByType = useAppSelector(state => state.category.categoriesByType);
	const isAuthenticated = useAppSelector((state) => state.loginSlice.isAuthenticated);
	const userId = useAppSelector((state) => state.userSlice.profile.userId);

	const memoizedCategoryNames = useMemo(() => categoryNames, [categoryNames.join(',')]);

	// Tải danh sách favorite khi đăng nhập
	useEffect(() => {
		if (isAuthenticated && userId) {
			dispatch(fetchFavoriteRecipes({userId}))
				.unwrap()
				.catch((error) => {
					console.error('Failed to fetch favorites:', error);
				});
		}
	}, [dispatch, isAuthenticated, userId]);

	// Xử lý reload: Set flag trước khi unload
	useEffect(() => {
		const handleBeforeUnload = () => {
			if (location.pathname === '/recipes' && params.toString()) {
				sessionStorage.setItem('recipeListReload', 'true');
			}
		};
		window.addEventListener('beforeunload', handleBeforeUnload);
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [location.pathname, params]);

	// Kiểm tra reload khi mount: Reset URL nếu cần
	useEffect(() => {
		if (isInitialMount.current && location.pathname === '/recipes') {
			const wasReload = sessionStorage.getItem('recipeListReload');
			if (wasReload === 'true' && params.toString()) {
				navigate('/recipes', { replace: true }); 
				sessionStorage.removeItem('recipeListReload'); 
			}
			isInitialMount.current = false;
		}
	}, [navigate, dispatch, params, location.pathname]);

	useEffect(() => {
		if (searchValue && memoizedCategoryNames.length > 0) {
			dispatch(fetchRecipesBySearch({ searchValue, categoryNames: memoizedCategoryNames }));
		} else if (searchValue) {
			// Search only - pass just search value
			dispatch(fetchRecipesBySearch({ searchValue }));
		} else if (memoizedCategoryNames.length) {
			dispatch(fetchRecipesByCategoryNames({ categoryNames: memoizedCategoryNames }));
		} else if (categoryType) {
			dispatch(fetchRecipesByCategoryType({ categoryType: categoryType }));
		} else {
			dispatch(fetchAllRecipes());
		}
	}, [memoizedCategoryNames, categoryType, searchValue, dispatch]);

	useEffect(() => {
		setSearchInput(searchValue);
	}, [searchValue]);

	const displayRecipes: Recipe[] = useMemo(() => {
		if (searchValue) {
			// When searching, always use search results
			return searchResults;
		} else if (memoizedCategoryNames.length > 1) {
			return searchResults;
		} else if (memoizedCategoryNames.length === 1) {
			return recipesByCategory[memoizedCategoryNames[0]] || [];
		} else if (categoryType) {
			return recipesByCategoryType[categoryType] || [];
		} else {
			return allRecipes;
		}
	}, [
		searchValue,
		searchResults,
		memoizedCategoryNames,
		categoryType,
		recipesByCategory,
		recipesByCategoryType,
		allRecipes,
	]);

	const mappedRecipes: RecipeItemProps[] = useMemo(
		() =>
			displayRecipes.map(r => ({
				id: r.id,
				title: r.title,
				creator: r.author.profile.name,
				totalTime: formatTime(r.cookTime + r.prepTime),
				rating: r.avgRating,
				reviewCount: r.ratingCount,
				imageUrl: r.imageUrl ?? '/placeholder.svg',
				createdAt: r.createdAt,
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
			filter.options.forEach((option: FilterOption) => {
				categoryMap.set(option.value, option.label);
			});
		});

		return memoizedCategoryNames.map(id => categoryMap.get(id)).filter(Boolean);
	}, [memoizedCategoryNames, filterData]);

	const displayCategoryTypes = useMemo(() => {
		if (memoizedCategoryNames.length === 0) return [];

		const categoryTypeMap = new Map();
		filterData.forEach(filter => {
			filter.options.forEach((option: FilterOption) => {
				categoryTypeMap.set(option.value, filter.title);
			});
		});

		const types = memoizedCategoryNames.map(id => categoryTypeMap.get(id)).filter(Boolean);
		return [...new Set(types)];
	}, [memoizedCategoryNames, filterData]);

	const hasNoResults = useMemo(() => {
		return (
			(searchValue || memoizedCategoryNames.length > 0 || categoryType) &&
			displayRecipes.length === 0 &&
			!loading
		);
	}, [searchValue, memoizedCategoryNames.length, categoryType, displayRecipes.length, loading]);

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
		currentParams.set('category', categoryName);

		const queryString = currentParams.toString();
		navigate(`?${queryString}`);
	};

	const handleRecipeClick = (id: string) => {
		console.log('Recipe clicked:', id);
		// Add navigation logic here if needed
	};

	const handleFilterChange = (selectedCategories: string[]) => {
		const currentParams = new URLSearchParams(params);

		currentParams.delete('category');

		selectedCategories.forEach(category => {
			currentParams.append('category', category);
		});

		const queryString = currentParams.toString();
		navigate(queryString ? `?${queryString}` : '/recipes');
	};

	const getRecipesByCategoryType = (categoryType: string) => {
		return recipesByCategoryType[categoryType] || [];
	};

	return {
		categoryNames: memoizedCategoryNames,
		categoryType,
		displayCategoryNames,
		displayCategoryTypes,
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
		getRecipesByCategoryType,
	};
}
