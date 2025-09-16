import RecipeHeader from "./components/RecipeHeader";
import { mockRecipeDetail } from "./mock";
import Overview from "./components/Overview";
import CookTips from "./components/CookTips";
import RecipeInfo from "./components/RecipeInfo";
import IngredientsToggle from "./components/IngredientsToggle";
import Substitutions from "./components/Substitutions";
import RecipeVideo from "./components/RecipeVideo";
import Instructions from "./components/Instructions";
import NutritionInfoSection from "./components/NutritionInfo";
import ReviewsRating from "./components/ReviewsRating";
import RecipeTags from "./components/RecipeTags";
import RecipeRecommend from "./components/RecipeRecommend";

export default function RecipeDetailPage() {
  const recipe = mockRecipeDetail;

  return (
    <div className="px-6 py-8">
      <RecipeHeader
        title={recipe.title}
        image={recipe.image}
        author={recipe.author}
        publishedAt={recipe.publishedAt}
        rating={recipe.rating}
        ratingCount={recipe.ratingCount}
      />

      <Overview text={recipe.overview} />
      {recipe.cookTips && recipe.cookTips.length > 0 ? (
        <CookTips tips={recipe.cookTips} />
      ) : null}


      <RecipeInfo
        prepTime={recipe.prepTime}
        cookTime={recipe.cookTime}
        totalTime={recipe.totalTime}
        servings={recipe.servings}
      />

      <IngredientsToggle
        metricItems={recipe.ingredientsMetric}
        usItems={recipe.ingredientsUS}
        metricSections={recipe.ingredientsMetricSections}
        usSections={recipe.ingredientsUSSections}
      />

      {recipe.substitutions && recipe.substitutions.length > 0 ? (
        <Substitutions items={recipe.substitutions} />
      ) : null}

      {recipe.videoUrl && (
        <RecipeVideo 
          title={recipe.title} 
          thumbnailSrc={recipe.image} 
          videoUrl={recipe.videoUrl} 
        />
      )}

      <Instructions steps={recipe.instructions} />

      {recipe.nutrition ? (
        <NutritionInfoSection
          data={recipe.nutrition}
          servingsPerRecipe={recipe.servings}
        />
      ) : null}


      {recipe.tags?.length ? <RecipeTags tags={recipe.tags} /> : null}
      
      <ReviewsRating average={recipe.rating} count={recipe.ratingCount} avatarUrl={recipe.currentUserAvatar} />

      <RecipeRecommend />
    </div>
  );
}
