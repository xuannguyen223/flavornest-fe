import SearchSection from '@/components/common/search-bar/SearchSection';
import { Preferences } from './components/Preferences';
import { preferencesData } from './components/tempData';
import { useState } from 'react';
import { RecipeList } from '../list-recipes/components/RecipeList';
import { sampleRecipes } from '../list-recipes/components/tempData';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
	const [searchValue, setSearchValue] = useState('');
	const navigate = useNavigate();

	const handleSearch = (value: string) => {
		navigate(`/recipes?search=${encodeURIComponent(value)}`);
	};

	const handleViewAll = (categoryName: string, description: string) => {
		navigate(
			`/recipes?category=${encodeURIComponent(categoryName)}&desc=${encodeURIComponent(
				description,
			)}`,
		);
	};

	const handleSaveToggle = (id: string) => {
		console.log('Save toggled for recipe:', id);
	};

	const handleRecipeClick = (id: string) => {
		console.log('Recipe clicked:', id);
	};

	const handleComplete = (selections: Record<number, string[]>) => {
		console.log('User preferences:', selections);
	};

	return (
		<div className="min-h-screen">
			<SearchSection
				title="Fuel your body & soul - find recipes that taste amazing!"
				backgroundImage=""
				searchPlaceholder="Search by dish, ingredient, ......"
				searchValue={searchValue}
				onSearchChange={setSearchValue}
				onSearch={handleSearch}
				showBreadcrumbs={false}
				height="h-96"
				overlayOpacity={0.3}
			/>
			<RecipeList
				recipeList={sampleRecipes}
				layout="1-row-4"
				categoryName="Effortless Eats"
				description="Satisfy your cravings in a flash! Explore our Quick & Easy Meals for effortless recipes without compromising on mouthwatering taste."
				viewAll={{
					show: true,
					onClick: handleViewAll,
				}}
				onSaveToggle={handleSaveToggle}
				onRecipeClick={handleRecipeClick}
				className="my-8"
			/>
			<RecipeList
				recipeList={sampleRecipes}
				layout="1-row-4"
				categoryName="Effortless Eats"
				description="Satisfy your cravings in a flash! Explore our Quick & Easy Meals for effortless recipes without compromising on mouthwatering taste."
				viewAll={{
					show: true,
					onClick: handleViewAll,
				}}
				onSaveToggle={handleSaveToggle}
				onRecipeClick={handleRecipeClick}
				className="my-8"
			/>
			<Preferences
				steps={preferencesData}
				onComplete={handleComplete}
			/>
			<RecipeList
				recipeList={sampleRecipes}
				layout="1-row-4"
				categoryName="Effortless Eats"
				description="Satisfy your cravings in a flash! Explore our Quick & Easy Meals for effortless recipes without compromising on mouthwatering taste."
				viewAll={{
					show: true,
					onClick: handleViewAll,
				}}
				onSaveToggle={handleSaveToggle}
				onRecipeClick={handleRecipeClick}
				className="my-8"
			/>
		</div>
	);
}
