import { RecipeList } from "@/features/list-recipes/components/RecipeList";
import { sampleRecipes } from "@/features/list-recipes/components/tempData";
import Sections from "@/features/my-profile/components/sections/Sections";

function MyRecipesSection() {
  return (
    <Sections title="My Recipes">
      <RecipeList recipeList={sampleRecipes.slice(0, 1)} />
    </Sections>
  );
}

export default MyRecipesSection;