import { RecipeList } from "@/features/list-recipes/components/RecipeList";
import { sampleRecipes } from "@/features/list-recipes/components/tempData";
export default function RecipeRecommend() {
    const handleSaveToggle = (id: string) => {
		console.log('Save toggled for recipe:', id);
	};

	const handleRecipeClick = (id: string) => {
		console.log('Recipe clicked:', id);
	};

    return (
        <section className="text-left mt-8 w-full max-w-[1420px] mx-auto">
        {/* Header */}
        <h2 className="text-4xl font-semibold 
            leading-tight text-neutral-700">
            Recipes You'll Love
        </h2>
        <RecipeList 
            recipeList={sampleRecipes}
            layout="2-rows-4"
            viewAll={{
                show: false,
            }}
            onSaveToggle={handleSaveToggle}
            onRecipeClick={handleRecipeClick}
            className="my-8"
        />
        </section>
    );
}