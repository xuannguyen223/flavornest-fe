"use client";

import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "@/components/common/search-bar/SearchBar";
import { RecipeList } from "@/features/list-recipes/components/RecipeList";
import { RecipeSort } from "@/features/list-recipes/components/RecipeSort";
import Sections from "./Sections";
import type { RootState, AppDispatch } from "@/store/store";
import { fetchFavoriteRecipes } from "@/store/features/recipeAPISlice";
import { useAppSelector } from "@/hooks/redux";
import { useSort } from "@/hooks";
import { formatTime } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import LoadingPage from "@/features/loading/LoadingPage";

function FavoriteRecipesSection() {
  const navigate = useNavigate();

	const dispatch = useDispatch<AppDispatch>();
	const { favoriteRecipesList, loading } = useSelector((state: RootState) => state.recipeAPI);

	const userProfile = useAppSelector(state => state.userSlice.profile);
	const userId = userProfile.userId;
	const isAuthenticated = useAppSelector(state => state.loginSlice.isAuthenticated);

  const { sortBy } = useSort();
  const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		if (isAuthenticated && userId) {
			if (!favoriteRecipesList?.length) {
				dispatch(fetchFavoriteRecipes({ userId }));
			} else {
				dispatch(fetchFavoriteRecipes({ userId }));
			}
		}
	}, [dispatch, isAuthenticated]);

	const favoriteRecipesForDisplay = favoriteRecipesList.map(recipe => ({
		id: recipe.id,
		title: recipe.title,
		authorId: recipe.authorId,
		creator: recipe.author.profile.name,
		totalTime: formatTime(recipe.cookTime + recipe.prepTime),
		rating: recipe.avgRating,
		reviewCount: recipe.ratingCount,
		imageUrl: recipe.imageUrl,
		createdAt: recipe.createdAt,
	}));

  const sortedRecipes = useMemo(() => {
    if (!favoriteRecipesForDisplay || favoriteRecipesForDisplay.length === 0)
      return favoriteRecipesForDisplay;

    let filteredRecipes = favoriteRecipesForDisplay;
    if (searchQuery.trim()) {
      filteredRecipes = favoriteRecipesForDisplay.filter((recipe) => {
        const query = searchQuery.toLowerCase();
        return recipe.title?.toLowerCase().includes(query);
      });
    }

    const sorted = [...filteredRecipes].sort((a, b) => {
      switch (sortBy) {
        case "newest": {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        }
        case "oldest": {
          const oldDateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const oldDateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return oldDateA - oldDateB;
        }
        case "atoz":
          return (a.title || "").localeCompare(b.title || "");
        case "ztoa":
          return (b.title || "").localeCompare(a.title || "");
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    return sorted;
  }, [favoriteRecipesForDisplay, searchQuery, sortBy]);

	if (!isAuthenticated) {
		return (
			<Sections title="Saved Recipes">
				<div className="text-center py-8 text-gray-500">
					Please log in to view your saved recipes.
				</div>
			</Sections>
		);
	}

	if (loading) {
		return (
			<Sections title="Saved Recipes">
				<div className="text-center py-8 text-gray-500">Loading your saved recipes...</div>
			</Sections>
		);
	}

	return (
		<Sections title="Saved Recipes">
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
					recipeList={sortedRecipes}
				/>
			) : (
				<div className="text-center text-gray-500 py-20">
					You haven't saved any recipes yet.
					<br /> Start exploring{' '}
					<span
						className="font-semibold cursor-pointer text-amber-500"
						onClick={() => navigate('/recipes')}>
						recipes
					</span>{' '}
					and save the ones that inspire you — your personal cookbook begins here!
				</div>
			)}
		</Sections>
	);
}

export default FavoriteRecipesSection;
