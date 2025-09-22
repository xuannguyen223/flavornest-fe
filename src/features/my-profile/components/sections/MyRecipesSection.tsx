import SearchBar from '@/components/common/search-bar/SearchBar';
import { RecipeList } from '@/features/list-recipes/components/RecipeList';
import { RecipeSort } from '@/features/list-recipes/components/RecipeSort';
import { sampleRecipes } from '@/features/list-recipes/components/tempData';
import Sections from '@/features/my-profile/components/sections/Sections';
import { useSort } from '@/hooks/useSort';
import { useMemo, useState } from 'react';

function MyRecipesSection() {
	const { sortBy } = useSort();

	const [searchQuery, setSearchQuery] = useState('');

	const sortedRecipes = useMemo(() => {
		if (!sampleRecipes || sampleRecipes.length === 0) return sampleRecipes;

		let filteredRecipes = sampleRecipes;
		if (searchQuery.trim()) {
			filteredRecipes = sampleRecipes.filter(recipe => {
				const query = searchQuery.toLowerCase();
				return recipe.title?.toLowerCase().includes(query);
			});
		}

		const sorted = [...filteredRecipes].sort((a, b) => {
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
	}, [sortBy, searchQuery]);

	return (
		<Sections title="My Recipes">
			<div className="w-full flex flex-row justify-between mb-4">
				<SearchBar
					className="w-[40%] text-gray-400"
					value={searchQuery}
					onChange={setSearchQuery}
					onSearch={setSearchQuery}
				/>
				<RecipeSort className="p-0" />
			</div>
			{sortedRecipes.length > 0 ? (
				<RecipeList
					layout="list-rows-3"
					recipeList={sortedRecipes.slice(0, 10)}
				/>
			) : (
				<div className="text-center text-gray-500 py-40">
					You haven't added any favorite recipes yet.
				</div>
			)}
		</Sections>
	);
}

export default MyRecipesSection;
