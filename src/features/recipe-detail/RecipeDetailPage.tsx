import RecipeHeader from "./components/RecipeHeader";
import Overview from "./components/Overview";
import CookTips from "./components/CookTips";
import RecipeInfo from "./components/RecipeInfo";
import Ingredients from "./components/Ingredients";
import Instructions from "./components/Instructions";
import ReviewsRating from "./components/ReviewsRating";
import RecipeCategories from "./components/RecipeCategories";
import RecipeRecommend from "./components/RecipeRecommend";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Recipe } from "../../types/TypeRecipe";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchRecipeById, fetchRecipesByCategory } from "@/store/features/recipeAPISlice";

export default function RecipeDetailPage() {
    // recipeSlice
  // const dispatch = useAppDispatch();
  // const recipe = useAppSelector(selectCurrentRecipe);
  // const handleSubmitRating = () => {

  //   dispatch(addRating(userRating));
  // };
    const { recipeId } = useParams<{ recipeId: string }>();
    const dispatch = useAppDispatch();

    const recipe = useAppSelector(state => recipeId ? state.recipeAPI.recipesById[recipeId] : undefined);
    const recipesByCategory = useAppSelector(state => state.recipeAPI.recipesByCategory);
    const loading = useAppSelector(state => state.recipeAPI.loading);

    useEffect(() => {
      if (recipeId) dispatch(fetchRecipeById(recipeId));
    }, [recipeId]);
    
    // Get related recipes of each category for RecipeRecommend
    useEffect(() => {
      if (recipe?.categories?.length) {
        recipe.categories.forEach(c => {
          const name = c.category.name;
          if (!recipesByCategory[name]) dispatch(fetchRecipesByCategory(name));
        });
      }
    }, [recipe]);

    const relatedRecipes: Recipe[] = [];
    const seen = new Set<string>();
    if (recipe?.categories) {
      recipe.categories.forEach(c => {
        const name = c.category.name;
        const list = recipesByCategory[name] ?? [];
        list.forEach(r => {
          // Remove duplicates & Stop fetching at 8 recipes
          if (r.id !== recipeId && !seen.has(r.id) && relatedRecipes.length < 8) {
            seen.add(r.id);
            relatedRecipes.push(r);
          }
        });
      });
    }
    

    if (loading) return <div>Loading...</div>;
    if (!recipe) return <div>Recipe not found</div>;

    // format createdAt
    const createdDate = new Date(recipe.createdAt).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    return (
      <div className="px-6 py-8">
        <RecipeHeader
          title={recipe.title}
          image={recipe.imageUrl}
          // example img
          // image = "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1974&auto=format&fit=crop"
          author={recipe.author.email}
          createdAt={createdDate}
          avgRating={recipe.rating}
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

        <Ingredients
          ingredients={recipe.ingredients}
        />

        <Instructions steps={recipe.instructions} />

        {recipe.categories?.length ? (
          <RecipeCategories categories={recipe.categories.map(c => c.category)} />
        ) : null}

        <ReviewsRating
          rating={recipe.rating}
          ratingCount={recipe.ratingCount}
          // avatarUrl={currentUser?.avatarUrl}
          // onSubmitRating={(newRating) => {
          //   // tính lại trung bình và tăng count
          //   const totalRating = recipe.rating * recipe.ratingCount + newRating;
          //   const newCount = recipe.ratingCount + 1;
          //   setRecipe({
          //     ...recipe,
          //     rating: totalRating / newCount,
          //     ratingCount: newCount,
          //   });
          // }}
        />

        {relatedRecipes.length > 0 && (
          <RecipeRecommend recipes={relatedRecipes} />
        )}
      </div>
    );
}
