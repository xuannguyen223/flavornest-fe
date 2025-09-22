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
import { Link } from 'react-router-dom';

import {
	fetchRecipeById,
	fetchRecipesByCategoryNames,
	submitRecipeRating,
} from '@/store/features/recipeAPISlice';
import { toast } from 'react-toastify';
import { formatTime } from "@/lib/utils";

export default function RecipeDetailPage() {
	const { recipeId } = useParams<{ recipeId: string }>();
	const dispatch = useAppDispatch();

	const recipe = useAppSelector(state =>
		recipeId ? state.recipeAPI.recipesById[recipeId] : undefined,
	);
	const recipesByCategory = useAppSelector(state => state.recipeAPI.recipesByCategory);
	const loading = useAppSelector(state => state.recipeAPI.loading);
	const error = useAppSelector(state => state.recipeAPI.error);
	const isAuthenticated = useAppSelector(state => state.loginSlice.isAuthenticated);

	const user = useAppSelector((state) => state.userSlice.profile);
	const avatarUrl = isAuthenticated && user?.avatarUrl ? user.avatarUrl : "";

	const [hasReviewed, setHasReviewed] = useState(false);
	const [userRating, setUserRating] = useState(0); // Lưu userRating từ localStorage

	// Load recipe using dispatch()
	// Load hasReviewed from localStorage
	useEffect(() => {
		if (recipeId) {
		dispatch(fetchRecipeById(recipeId));
		}
  	}, [recipeId, dispatch]);

	useEffect(() => {
		if (!recipeId) return;
	
		const storedRating = localStorage.getItem(`userRating_${user.userId}_${recipeId}`);
		const storedHasReviewed = localStorage.getItem(`hasReviewed_${user.userId}_${recipeId}`);
	
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
		if (recipe?.categories?.length) {
			recipe.categories.forEach(c => {
				const name = c.category.name;
				if (!recipesByCategory[name]) {
					dispatch(fetchRecipesByCategoryNames({ categoryNames: [name] }));
				}
			});
		}
	}, [recipe, recipesByCategory, dispatch]);

	const handleSubmitRating = async (newRating: number) => {
		if (!recipeId || !isAuthenticated) return;

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
			setUserRating(newRating);
			localStorage.setItem(`hasReviewed_${user.userId}_${recipeId}`, "true");
			localStorage.setItem(`userRating_${user.userId}_${recipeId}`, newRating.toString());
		} catch (err: any) {
			toast.error(err.message || "Failed to submit rating");
		}
	};

  	// RecipeRecommend: non-duplicate
	const relatedRecipes: Recipe[] = [];
	const seen = new Set<string>();
	if (recipe?.categories) {
		recipe.categories.forEach(c => {
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

	if (loading && !recipe) {
		return (
		  <div className="flex-1 flex flex-col items-center justify-center py-16">
			<p className="text-xl text-gray-700">Loading recipe details...</p>
		  </div>
		);
	}
	

	if (error || !recipe) {
		return (
			<div className="flex-1 flex flex-col items-center justify-center py-16">
			<div className="text-center">
				<h3 className="text-2xl font-semibold text-gray-900 mb-2">
					{error ? 'Error loading recipe' : 'Recipe not found'}
				</h3>
				<p className="text-gray-600 text-lg">
					{error || 'We could not find the recipe you are looking for.'}
				</p>
				<p className="text-gray-500 text-sm mt-2">
					Try searching with different keywords or browsing other recipes.
				</p>
				<Link
					to="/"
					className="mt-4 inline-block px-6 py-2 bg-neutral-700 text-white rounded hover:bg-neutral-300 transition"
				>
				Go to Homepage
				</Link>
			</div>
			</div>
		);
	}


	const createdDate = new Date(recipe.createdAt).toLocaleDateString('en-GB', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	});

	const totalMinutes = recipe.cookTime + recipe.prepTime;
  	const totalTime = formatTime(totalMinutes);

	return (
		<div className="px-12 mt-8">
			<RecipeHeader
				id = {recipe.id}
				title={recipe.title}
				image={recipe.imageUrl}
				author={recipe.author.profile.name}
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
				avatarUrl= {avatarUrl}
				onSubmitRating={handleSubmitRating}
				hasReviewed={hasReviewed}
				recipeId={recipeId || ""} 
				userRating={userRating} 
      		/>
			{relatedRecipes.length > 0 && <RecipeRecommend recipes={relatedRecipes} />}
		</div>
	);
}
