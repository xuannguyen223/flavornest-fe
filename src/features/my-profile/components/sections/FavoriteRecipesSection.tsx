"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "@/components/common/search-bar/SearchBar";
import { RecipeList } from "@/features/list-recipes/components/RecipeList";
import { RecipeSort } from "@/features/list-recipes/components/RecipeSort";
import Sections from "./Sections";
import type { RootState, AppDispatch } from "@/store/store";
import { fetchFavoriteRecipes } from "@/store/features/recipeAPISlice";
import { useAppSelector } from "@/hooks/redux";

const favoriteSortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "most-positive", label: "Most positive" },
  { value: "most-negative", label: "Most negative" },
];

function FavoriteRecipesSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { favoriteRecipesList, loading } = useSelector(
    (state: RootState) => state.recipeAPI
  );
  const userProfile = useAppSelector((state) => state.userSlice.profile);
  const userId = userProfile.userId;
  const isAuthenticated = useAppSelector(
    (state) => state.loginSlice.isAuthenticated
  );
  useEffect(() => {
    if (isAuthenticated && userId) {
      dispatch(fetchFavoriteRecipes({ userId }));
    }
  }, [dispatch, userId, isAuthenticated]);

  const favoriteRecipesForDisplay = favoriteRecipesList.map((recipe) => ({
    id: recipe.id,
    title: recipe.title,
    creator: recipe.author.profile.name, // Using authorId as creator for now
    totalTime: `${recipe.prepTime + recipe.cookTime} min`,
    rating: recipe.avgRating, // Default rating since it's not in the API response
    reviewCount: recipe.ratingCount, // Default review count since it's not in the API response
    imageUrl: recipe.imageUrl,
  }));

  if (!isAuthenticated) {
    return (
      <Sections title="Favorite Recipes">
        <div className="text-center py-8 text-gray-500">
          Please log in to view your favorite recipes.
        </div>
      </Sections>
    );
  }

  if (loading) {
    return (
      <Sections title="Favorite Recipes">
        <div className="text-center py-8 text-gray-500">
          Loading your favorite recipes...
        </div>
      </Sections>
    );
  }

  return (
    <Sections title="Favorite Recipes">
      <div className="w-full flex flex-row justify-between mb-4">
        <SearchBar className="w-[40%] text-gray-400" />
        <RecipeSort sortOptions={favoriteSortOptions} className="p-0" />
      </div>
      {favoriteRecipesList.length > 0 ? (
        <RecipeList
          layout="list-rows-3"
          recipeList={favoriteRecipesForDisplay}
        />
      ) : (
        <div className="text-center text-gray-500 py-40">
          You haven't added any favorite recipes yet.
        </div>
      )}
    </Sections>
  );
}

export default FavoriteRecipesSection;