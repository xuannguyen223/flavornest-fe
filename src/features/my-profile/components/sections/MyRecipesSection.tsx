import SearchBar from '@/components/common/search-bar/SearchBar';
import { RecipeList } from '@/features/list-recipes/components/RecipeList';
import { RecipeSort } from '@/features/list-recipes/components/RecipeSort';
import { sampleRecipes } from '@/features/list-recipes/components/tempData';
import Sections from '@/features/my-profile/components/sections/Sections';

const myRecipeSortOptions = [
	{ value: 'relevance', label: 'Relevance' },
	{ value: 'newest', label: 'Newest' },
	{ value: 'oldest', label: 'Oldest' },
	{ value: 'most-positive', label: 'Most positive' },
	{ value: 'most-negative', label: 'Most negative' },
];

function MyRecipesSection() {
	// if (!isAuthenticated) {
	// 	return (
	// 		<Sections title="My Recipes">
	// 			<div className="text-center py-8 text-gray-500">
	// 				Please log in to view your own recipes.
	// 			</div>
	// 		</Sections>
	// 	);
	// }

	// if (loading) {
	// 	return (
	// 		<Sections title="My Recipes">
	// 			<div className="text-center py-8 text-gray-500">Loading your own recipes...</div>
	// 		</Sections>
	// 	);
	// }

	return (
		<Sections title="My Recipes">
			<div className="w-full flex flex-row justify-between mb-4">
				<SearchBar className="w-[40%] text-gray-400" />
				<RecipeSort
					sortOptions={myRecipeSortOptions}
					className="p-0"
				/>
			</div>
			{sampleRecipes.length > 0 ? (
				<RecipeList
					layout="list-rows-3"
					recipeList={sampleRecipes.slice(0, 10)}
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
