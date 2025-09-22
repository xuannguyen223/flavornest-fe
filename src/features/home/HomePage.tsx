import SearchSection from '@/components/common/search-bar/SearchSection';
import { Preferences } from './components/Preferences';
import { preferencesData } from './components/tempData';
import { useState, useMemo, useEffect } from 'react';
import { RecipeList } from '../list-recipes/components/RecipeList';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from './components/BlogPost';
import { ShowCase } from './components/ShowCase';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { Recipe } from '@/types/TypeRecipe';
import type { RecipeItemProps } from '@/features/list-recipes/components/RecipeItem';
import { fetchAllRecipes, fetchFavoriteRecipes } from '@/store/features/recipeAPISlice';
import { formatTime } from '@/lib/utils';

export default function HomePage() {
	const [searchValue, setSearchValue] = useState('');
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const { allRecipes, loading } = useAppSelector(state => state.recipeAPI);

	useEffect(() => {
		dispatch(fetchAllRecipes());
	}, [dispatch]);

	const isAuthenticated = useAppSelector(state => state.loginSlice.isAuthenticated);
	const userProfile = useAppSelector(state => state.userSlice.profile);
	const userId = userProfile.userId;

	useEffect(() => {
		dispatch(fetchAllRecipes());
		if (isAuthenticated && userId) {
			dispatch(fetchFavoriteRecipes({ userId })) // Tải danh sách favorite nếu đã đăng nhập
				.unwrap()
				.catch(error => {
					console.error('Failed to fetch favorites:', error);
				});
		}
	}, [dispatch, isAuthenticated, userId]);

	// Lấy list sub-category trong allRecipes
	const categories = useMemo(
		() =>
			Array.from(
				new Set(allRecipes.flatMap((r: Recipe) => r.categories.map(c => c.category.name))),
			),
		[allRecipes],
	);
	// --- Chia nhóm group1 (>4 món) & group2 (>=4 món) ---
	// đang set là 1 để có hiện lên với DB local
	const { group1, group2 } = useMemo(() => {
		let g1: { name: string; recipes: Recipe[]; description: string } | null = null;
		let g2: { name: string; recipes: Recipe[]; description: string } | null = null;

		for (const catName of categories) {
			const recipesForCat = allRecipes.filter(r =>
				r.categories.some(c => c.category.name === catName),
			);
			if (!recipesForCat.length) continue;

			if (recipesForCat.length >= 1 && !g1) {
				// Gán sub-cat đầu tiên có >= 4 recipes cho g1
				g1 = {
					name: catName,
					recipes: recipesForCat,
					description:
						recipesForCat[0]?.categories.find(c => c.category.name === catName)?.category
							.description || 'No description available',
				};
			} else if (recipesForCat.length >= 1 && !g2 && catName !== g1?.name) {
				// g1 khác g2
				g2 = {
					name: catName,
					recipes: recipesForCat,
					description:
						recipesForCat[0]?.categories.find(c => c.category.name === catName)?.category
							.description || 'No description available',
				};
			}

			// Thoát sớm nếu đã tìm thấy cả g1 và g2
			if (g1 && g2) break;
		}

		return { group1: g1, group2: g2 };
	}, [allRecipes, categories]);

	// --- Hàm map Recipe -> RecipeItemProps ---
	const mapToRecipeItemProps = (recipes: Recipe[]): RecipeItemProps[] =>
		recipes.map(r => ({
			id: r.id,
			title: r.title,
			creator: r.author.profile.name,
			totalTime: formatTime(r.prepTime + r.cookTime),
			rating: r.avgRating || 0,
			reviewCount: r.ratingCount || 0,
			imageUrl: r.imageUrl ?? '/placeholder.svg',
		}));

	const handleSearch = (value: string) => {
		if (value.trim()) {
			navigate(`/recipes?search=${encodeURIComponent(value.trim())}`);
		}
	};
	const handleViewAll = (categoryName: string, description: string) => {
		navigate(
			`/recipes?category=${encodeURIComponent(categoryName)}&desc=${encodeURIComponent(
				description,
			)}`,
		);
	};
	const handleComplete = (selections: Record<number, string[]>) => {
		console.log('User preferences:', selections);
	};

	return (
		<div className="min-h-screen">
			{loading ? (
				<div>Loading...</div>
			) : !allRecipes.length ? (
				<div>No recipes found</div>
			) : (
				<>
				<SearchSection
					title="Fuel your body & soul - find recipes that taste amazing!"
					backgroundImage="/home.png"
					searchValue={searchValue}
					onSearchChange={setSearchValue}
					onSearch={handleSearch}
					showBreadcrumbs={false}
					height="h-120"
					overlayOpacity={0.3}
				/>

				{group1 && (
					<RecipeList
						key={group1.name}
						recipeList={mapToRecipeItemProps(group1.recipes)}
						layout="1-row-4"
						categoryName={group1.name}
						description={group1.description}
						viewAll={{ show: true, onClick: handleViewAll }}
						className="my-8 mt-10" /> )}
				
				<BlogPost
					categoryName="Healthy Eating Inspiration"
					onViewAllClick={() => {}}
					onRecipeClick={() => {}}
				/>

				{group2 && (
					<RecipeList
					key={group2.name}
					recipeList={mapToRecipeItemProps(group2.recipes)}
					layout="1-row-4"
					categoryName={group2.name}
					description={group2.description}
					viewAll={{ show: true, onClick: handleViewAll }}
					className="my-8 mt-10" /> )}
				
				<Preferences
					steps={preferencesData}
					onComplete={handleComplete}
				/>
				<ShowCase
					onViewAll={() => {}}
					onCardClick={() => {}}
				/>
				</>
			)}
		</div>
	);
}
