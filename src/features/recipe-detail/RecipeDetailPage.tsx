import RecipeHeader from "./components/RecipeHeader";
import Overview from "./components/Overview";
import CookTips from "./components/CookTips";
import RecipeInfo from "./components/RecipeInfo";
import Ingredients from "./components/Ingredients";
import Instructions from "./components/Instructions";
import ReviewsRating from "./components/ReviewsRating";
import RecipeCategories from "./components/RecipeCategories";
import RecipeRecommend from "./components/RecipeRecommend";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Recipe } from "../../types/TypeRecipe";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchRecipeById,
  fetchRecipesByCategory,
  submitRecipeRating,
} from "@/store/features/recipeAPISlice";
import { toast } from "react-toastify";

export default function RecipeDetailPage() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const dispatch = useAppDispatch();

  const recipe = useAppSelector((state) =>
    recipeId ? state.recipeAPI.recipesById[recipeId] : undefined
  );
  const recipesByCategory = useAppSelector(
    (state) => state.recipeAPI.recipesByCategory
  );
  const loading = useAppSelector((state) => state.recipeAPI.loading);
  const error = useAppSelector((state) => state.recipeAPI.error);
  const isAuthenticated = useAppSelector(
    (state) => state.loginSlice.isAuthenticated
  );

  const [hasReviewed, setHasReviewed] = useState(false);

  // Load recipe using dispatch()
  // Load hasReviewed from localStorage
  useEffect(() => {
    if (recipeId) {
      dispatch(fetchRecipeById(recipeId));
      const stored = localStorage.getItem(`hasReviewed_${recipeId}`);
      setHasReviewed(!!stored);
    }
  }, [recipeId, dispatch]);

  // Get related recipes of each category for RecipeRecommend
  useEffect(() => {
    if (recipe?.categories?.length) {
      recipe.categories.forEach((c) => {
        const name = c.category.name;
        if (!recipesByCategory[name]) {
          dispatch(fetchRecipesByCategory(name));
        }
      });
    }
  }, [recipe, recipesByCategory, dispatch]);

  const handleSubmitRating = async (newRating: number) => {
    if (!isAuthenticated) {
      toast.error("Login or SignUp to submit review!");
      return;
    }

    if (!recipeId) return;

    try {
      await dispatch(
        submitRecipeRating({ recipeId, rating: newRating })
      ).unwrap();
      toast.success(
        hasReviewed
          ? "Rating updated successfully!"
          : "Rating submitted successfully!"
      );
      setHasReviewed(true);
      localStorage.setItem(`hasReviewed_${recipeId}`, "true"); // Save hasReviewed
    } catch (err: any) {
      toast.error(err.message || "Failed to submit rating");
    }
  };

  const relatedRecipes: Recipe[] = [];
  const seen = new Set<string>();
  if (recipe?.categories) {
    recipe.categories.forEach((c) => {
      const name = c.category.name;
      const list = recipesByCategory[name] ?? [];
      list.forEach((r) => {
        if (r.id !== recipeId && !seen.has(r.id) && relatedRecipes.length < 8) {
          seen.add(r.id);
          relatedRecipes.push(r);
        }
      });
    });
  }

  if (loading && !recipe) return <div>Loading...</div>;
  if (error || !recipe) return <div>{error || "Recipe not found"}</div>;

  const createdDate = new Date(recipe.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="px-6 py-8">
      <RecipeHeader
        title={recipe.title}
        image={recipe.imageUrl}
        author={recipe.author.email}
        createdAt={createdDate}
        avgRating={recipe.avgRating}
        ratingCount={recipe.ratingCount}
      />
      <Overview text={recipe.description} />
      {recipe.cookTips && recipe.cookTips.length > 0 ? (
        <CookTips tips={recipe.cookTips} />
      ) : null}
      <RecipeInfo
        prepTime={recipe.prepTime}
        cookTime={recipe.cookTime}
        totalTime={recipe.prepTime + recipe.cookTime}
        servings={recipe.servings}
      />
      <Ingredients ingredients={recipe.ingredients} />
      <Instructions steps={recipe.instructions} />
      {recipe.categories?.length ? (
        <RecipeCategories
          categories={recipe.categories.map((c) => c.category)}
        />
      ) : null}
      <ReviewsRating
        rating={recipe.avgRating}
        ratingCount={recipe.ratingCount}
        onSubmitRating={handleSubmitRating}
        hasReviewed={hasReviewed}
        recipeId={recipeId || ""} // Truyền recipeId
      />
      {relatedRecipes.length > 0 && (
        <RecipeRecommend recipes={relatedRecipes} />
      )}
    </div>
  );
}
