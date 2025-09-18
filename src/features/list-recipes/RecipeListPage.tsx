import FilterGroup from '@/components/common/filter-recipe/FilterGroup';
import { RecipeList } from './components/RecipeList';
import { sampleRecipes } from './components/tempData';
import { RecipeSort } from './components/RecipeSort';
import SearchSection from '@/components/common/search-bar/SearchSection';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockFilter } from './components/filterData';

export default function RecipeListPage() {
	const [params] = useSearchParams();
	const searchValue = params.get('search');
	const categoryName = params.get('category');
	const description = params.get('desc');

	const [searchInput, setSearchInput] = useState(searchValue || '');

	const filter = mockFilter;

	const handleSearch = (value: string) => {
		console.log('Searching for:', value);
	};

	const handleSaveToggle = (id: string) => {
		console.log('Save toggled for recipe:', id);
	};

	const handleRecipeClick = (id: string) => {
		console.log('Recipe clicked:', id);
	};

	return (
		<div>
			<SearchSection
				backgroundColor="bg-gray-300"
				searchPlaceholder={searchValue ? searchValue : 'Search by dish, ingredient, ......'}
				searchValue={searchInput}
				onSearchChange={setSearchInput}
				onSearch={handleSearch}
				breadcrumbTitle="Recipes"
				showBreadcrumbs={true}
				height="h-40"
			/>

			<div className="px-8 py-5">
				{categoryName && (
					<div className="text-center py-8">
						<div className="text-5xl font-cormorant font-semibold text-gray-900 tracking-tight text-balance mb-4">
							{categoryName}
						</div>
						<div className="w-full text-gray-600 text-lg leading-relaxed text-pretty">
							{description}
						</div>
					</div>
				)}

				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold text-neutral-800">FILTER BY</h3>
					<RecipeSort />
				</div>

				<div className="flex flex-row gap-8">
					<FilterGroup filterData={filter} />
					<RecipeList
						recipeList={sampleRecipes}
						layout="default"
						onSaveToggle={handleSaveToggle}
						onRecipeClick={handleRecipeClick}
					/>
				</div>
			</div>
		</div>
	);
}
