import { RecipeList } from './components/RecipeList';
import { sampleRecipes } from './components/tempData';

function RecipeExample() {
	const handleViewAll = () => {
		console.log('View all recipes clicked');
	};

	const handleSaveToggle = (id: string) => {
		console.log('Save toggled for recipe:', id);
	};

	const handleRecipeClick = (id: string) => {
		console.log('Recipe clicked:', id);
	};

	return (
		// <div className="w-[70%] mx-auto">

		// </div>
		<RecipeList
			recipeList={sampleRecipes}
			layout="1-row-4"
			sectionName="Effortless Eats"
			description="Satisfy your cravings in a flash! Explore our Quick & Easy Meals for effortless recipes without compromising on mouthwatering taste."
			viewAll={{
				show: true,
				onClick: handleViewAll,
			}}
			onSaveToggle={handleSaveToggle}
			onRecipeClick={handleRecipeClick}
		/>
	);
}

export default RecipeExample;
