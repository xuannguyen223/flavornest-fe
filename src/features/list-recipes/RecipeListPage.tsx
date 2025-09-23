'use client';

import { useRecipeList } from '@/hooks/useRecipeList';
import SearchSection from '@/components/common/search-bar/SearchSection';
import { RecipeSort } from './components/RecipeSort';
import FilterGroup from '@/components/common/filter-recipe/FilterGroup';
import { RecipeList } from './components/RecipeList';
import { formatCategoryType } from '@/lib/utils';
import { useSort } from '@/hooks/useSort';
import { useMemo } from 'react';
import { useAppSelector } from '@/hooks/redux';

export default function RecipeListPage() {
	const {
		categoryNames,
		categoryType,
		description,
		searchInput,
		setSearchInput,
		handleSearch,
		mappedRecipes,
		searchValue,
		filterData,
		handleRecipeClick,
		handleFilterChange,
	} = useRecipeList();

	const loading = useAppSelector(state => state.recipeAPI.loading);

	const { sortBy } = useSort();

	const sortedRecipes = useMemo(() => {
		if (!mappedRecipes || mappedRecipes.length === 0) return mappedRecipes;

		const sorted = [...mappedRecipes].sort((a, b) => {
			switch (sortBy) {
				case 'newest': {
					const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
					const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
					return dateB - dateA;
				}
				case 'oldest': {
					const oldDateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
					const oldDateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
					return oldDateA - oldDateB;
				}
				case 'atoz':
					return (a.title || '').localeCompare(b.title || '');
				case 'ztoa':
					return (b.title || '').localeCompare(a.title || '');
				case 'rating':
					return (b.rating || 0) - (a.rating || 0);
				default:
					return 0;
			}
		});

		return sorted;
	}, [mappedRecipes, sortBy]);

	return (
		<div>
			<SearchSection
				backgroundColor="bg-neutral-300"
				searchPlaceholder="Search recipe by title ......"
				backgroundImage="/home.png"
				searchValue={searchInput}
				onSearchChange={setSearchInput}
				onSearch={handleSearch}
				breadcrumbTitle="Recipes"
				showBreadcrumbs={true}
				height="h-40"
			/>

			<div className="px-8 py-3">
				{categoryNames.length > 0 && (
					<div className="text-center">
						<div className="text-5xl font-cormorant font-semibold text-gray-900 tracking-tight text-balance mb-4">
							{categoryNames.join(' - ')}
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
					<FilterGroup
						filterData={filterData}
						onFilterChange={handleFilterChange}
						initialSelected={categoryNames}
					/>

					{(() => {
						if (loading) {
							return (
								<div className="h-[200px] w-full mx-auto flex flex-col items-center justify-center">
									<div className="text-center">
										<p className="text-xl text-gray-700 mb-2">Loading recipes...</p>
									</div>
								</div>
							);

							
						}

						if (sortedRecipes && sortedRecipes.length > 0) {
							return (
								<RecipeList
									recipeList={sortedRecipes}
									layout="default"
									onRecipeClick={handleRecipeClick}
								/>
							);
						}

						if (!sortedRecipes) {
							return (
								<div className="h-[200px] w-full mx-auto flex flex-col items-center justify-center">
									<div className="text-center">
										<h3 className="text-2xl font-semibold text-gray-900 mb-2">No Results Found</h3>
										<p className="text-gray-600 text-lg">
											There are no results from "
											{searchValue || categoryNames.join(', ') || formatCategoryType(categoryType)}"
										</p>
										<p className="text-gray-500 text-sm mt-2">
											Try searching with different keywords or browse all recipes
										</p>
									</div>
								</div>
							);
						}
					})()}
				</div>
			</div>
		</div>
	);
}
