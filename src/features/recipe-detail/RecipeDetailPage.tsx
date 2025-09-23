import RecipeHeader from './components/RecipeHeader';
import Overview from './components/Overview';
import CookTips from './components/CookTips';
import RecipeInfo from './components/RecipeInfo';
import Ingredients from './components/Ingredients';
import Instructions from './components/Instructions';
import ReviewsRating from './components/ReviewsRating';
import RecipeCategories from './components/RecipeCategories';
import RecipeRecommend from './components/RecipeRecommend';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Recipe } from '../../types/TypeRecipe';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
	fetchFavoriteRecipes,
	fetchRecipeById,
	fetchRecipesByCategoryNames,
	submitRecipeRating,
} from '@/store/features/recipeAPISlice';
import { toast } from 'react-toastify';
import { formatTime } from '@/lib/utils';
import LoadingPage from '../loading/LoadingPage';
import NotFoundPage from '../not-found/NotFoundPage';

export default function RecipeDetailPage() {
	const { recipeId } = useParams<{ recipeId: string }>();
	const dispatch = useAppDispatch();

	// const recipe = useAppSelector(state => state.recipeAPI.recipesById[recipeId!]);
	const recipeData = useAppSelector(state =>
		recipeId ? state.recipeAPI.recipesById[recipeId] : undefined,
	);
	const recipesByCategory = useAppSelector(state => state.recipeAPI.recipesByCategory);
	const error = useAppSelector(state => state.recipeAPI.error);
	const isAuthenticated = useAppSelector(state => state.loginSlice.isAuthenticated);

	const user = useAppSelector(state => state.userSlice.profile);
	const avatarUrl = isAuthenticated && user?.avatarUrl ? user.avatarUrl : '';
	const userId = useAppSelector(state => state.userSlice.profile.userId);

	const [hasReviewed, setHasReviewed] = useState(false);
	const [userRating, setUserRating] = useState(0); // Lưu userRating từ localStorage

	// Tải danh sách favorite khi trang mount
	useEffect(() => {
		if (isAuthenticated && userId && recipeId) {
			dispatch(fetchFavoriteRecipes({ userId }))
				.unwrap()
				.catch(error => {
					console.error('Failed to fetch favorites:', error);
				});
		}
	}, [dispatch, isAuthenticated, userId, recipeId]);

	// Track first loading
	const [initialLoading, setInitialLoading] = useState(true);

	useEffect(() => {
		if (recipeId) {
			window.scrollTo({ top: 0, behavior: 'smooth' });

			setInitialLoading(true); // reset trước khi fetch
			dispatch(fetchRecipeById(recipeId))
				.unwrap()
				.catch(() => {})
				.finally(() => setInitialLoading(false));
		}
	}, [recipeId, dispatch]);

	useEffect(() => {
		if (!recipeId) return;

		const storedRating = localStorage.getItem(`userRating_${userId}_${recipeId}`);
		const storedHasReviewed = localStorage.getItem(`hasReviewed_${userId}_${recipeId}`);

		if (storedRating) {
			setUserRating(parseInt(storedRating, 10));
			setHasReviewed(!!storedHasReviewed);
		} else {
			setUserRating(0);
			setHasReviewed(false);
		}
	}, [recipeId, user, isAuthenticated]);

	// Get related recipes of each category for RecipeRecommend
	useEffect(() => {
		if (recipeData?.categories?.length) {
			recipeData.categories.forEach(c => {
				const name = c.category.name;
				if (!recipesByCategory[name]) {
					dispatch(fetchRecipesByCategoryNames({ categoryNames: [name] }));
				}
			});
		}
	}, [recipeData, recipesByCategory, dispatch]);

	const handleSubmitRating = async (newRating: number) => {
		if (!recipeId || !isAuthenticated) return;

		try {
			await dispatch(submitRecipeRating({ recipeId, rating: newRating })).unwrap();
			toast.success(
				hasReviewed ? 'Rating updated successfully!' : 'Rating submitted successfully!',
			);
			setHasReviewed(true);
			setUserRating(newRating);
			localStorage.setItem(`hasReviewed_${userId}_${recipeId}`, 'true');
			localStorage.setItem(`userRating_${userId}_${recipeId}`, newRating.toString());
		} catch (err: any) {
			toast.error(err.message || 'Failed to submit rating');
		}
	};

	// RecipeRecommend: non-duplicate
	const relatedRecipes: Recipe[] = [];
	const seen = new Set<string>();
	if (recipeData?.categories) {
		recipeData.categories.forEach(c => {
			const name = c.category.name;
			const list = recipesByCategory[name] ?? [];
			list.forEach(r => {
				if (r.id !== recipeId && !seen.has(r.id) && relatedRecipes.length < 8) {
					seen.add(r.id);
					relatedRecipes.push(r);
				}
			});
		});
	}

	if (initialLoading) {
		return <LoadingPage />;
	}

	if (error || !recipeData) {
		return <NotFoundPage />;
	}

	const recipe = recipeData as Recipe;
	const createdDate = new Date(recipe.createdAt).toLocaleDateString('en-GB', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	});

	const totalMinutes = recipe.cookTime + recipe.prepTime;
	const totalTime = formatTime(totalMinutes);

	return (
		<div className="px-20 mt-10 pb-15">
			<RecipeHeader
				id={recipe.id}
				title={recipe.title}
				image={recipe.imageUrl}
				author={recipe.author.profile.name}
				authorId={recipe.authorId}
				createdAt={createdDate}
				avgRating={recipe.avgRating}
				ratingCount={recipe.ratingCount}
			/>
			<Overview text={recipe.description} />
			{recipe.cookTips && recipe.cookTips.length > 0 ? <CookTips tips={recipe.cookTips} /> : null}
			<RecipeInfo
				prepTime={recipe.prepTime}
				cookTime={recipe.cookTime}
				totalTime={totalTime}
				servings={recipe.servings}
			/>
			<Ingredients ingredients={recipe.ingredients} />
			<Instructions steps={recipe.instructions} />
			{recipe.categories?.length ? (
				<RecipeCategories categories={recipe.categories.map(c => c.category)} />
			) : null}
			<ReviewsRating
				rating={recipe.avgRating}
				ratingCount={recipe.ratingCount}
				avatarUrl={avatarUrl}
				onSubmitRating={handleSubmitRating}
				hasReviewed={hasReviewed}
				recipeId={recipeId || ''}
				userRating={userRating}
			/>
			{relatedRecipes.length > 0 && <RecipeRecommend recipes={relatedRecipes} />}
		</div>
	);
}
