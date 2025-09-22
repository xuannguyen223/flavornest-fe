import SearchBar from '@/components/common/search-bar/SearchBar';
import { RecipeList } from '@/features/list-recipes/components/RecipeList';
import { RecipeSort } from '@/features/list-recipes/components/RecipeSort';
import Sections from '@/features/my-profile/components/sections/Sections';
import { useAppSelector } from '@/hooks/redux';
import { useSort } from '@/hooks/useSort';
import { formatTime } from '@/lib/utils';
import { fetchUserRecipes } from '@/store/features/recipeAPISlice';
import type { AppDispatch, RootState } from '@/store/store';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function MyRecipesSection() {
	const navigate = useNavigate();

	const dispatch = useDispatch<AppDispatch>();
	const { userRecipes, loading } = useSelector((state: RootState) => state.recipeAPI);

	const userProfile = useAppSelector(state => state.userSlice.profile);
	const userId = userProfile.userId;
	const isAuthenticated = useAppSelector(state => state.loginSlice.isAuthenticated);

	const { sortBy } = useSort();
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		if (isAuthenticated && userId) {
			dispatch(fetchUserRecipes({ userId }));
		}
	}, [dispatch, userId, isAuthenticated]);

	const userRecipesForDisplay = userRecipes.map(recipe => ({
		id: recipe.id,
		title: recipe.title,
		creator: recipe.author.profile.name,
		totalTime: formatTime(recipe.cookTime + recipe.prepTime),
		rating: recipe.avgRating,
		reviewCount: recipe.ratingCount,
		imageUrl: recipe.imageUrl,
		createdAt: recipe.createdAt,
	}));

	const sortedRecipes = useMemo(() => {
		if (!userRecipesForDisplay || userRecipesForDisplay.length === 0) return userRecipesForDisplay;

		let filteredRecipes = userRecipesForDisplay;
		if (searchQuery.trim()) {
			filteredRecipes = userRecipesForDisplay.filter(recipe => {
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

	if (!isAuthenticated) {
		return (
			<Sections title="Favorite Recipes">
				<div className="text-center py-8 text-gray-500">Please log in to view your recipes.</div>
			</Sections>
		);
	}

	if (loading) {
		return (
			<Sections title="Favorite Recipes">
				<div className="text-center py-8 text-gray-500">Loading your recipes...</div>
			</Sections>
		);
	}

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
				<div className="text-center text-gray-500 py-20">
					You haven’t created any recipes yet.
					<br /> Get started by{' '}
					<span
						className="font-semibold cursor-pointer text-amber-500"
						onClick={() => navigate('/add-recipe')}>
						adding your first recipe
					</span>{' '}
					and share your creativity!
				</div>
			)}
		</Sections>
	);
}

export default MyRecipesSection;
