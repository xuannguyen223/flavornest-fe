import axiosInstance from './axiosInstance';
import type { Recipe } from '@/types/TypeRecipe';
// recipe service functions:
// getAllRecipes, getRecipesByCategory, getRecipeById, addRecipe, updateRecipe, deleteRecipe,...

export const getListRecipes = async (
	searchValue?: string,
	categoryNames?: string[],
	categoryType?: string,
): Promise<Recipe[]> => {
	try {
		const queryParams = new URLSearchParams();

		if (searchValue) {
			queryParams.append('search', searchValue);
		}
		if (categoryNames && categoryNames.length > 0) {
			categoryNames.forEach(categoryName => {
				queryParams.append('category', categoryName);
			});
		}
		if (categoryType) {
			queryParams.append('categoryType', categoryType);
		}

		const url = queryParams.toString()
			? `/api/recipe/get?${queryParams.toString()}`
			: `/api/recipe/get`;

		const response = await axiosInstance.get(url, { withCredentials: true });

		return response.data.data.recipes as Recipe[];
	} catch (error) {
		console.error('Error fetching recipes:', error);
		throw error;
	}
};

// getRecipeById
export const getRecipeById = async (id: string) => {
	try {
		const response = await axiosInstance.get(`/api/recipe/get/${id}`, { withCredentials: true });
		return response.data;
	} catch (error) {
		console.error('Error fetching recipe detail:', error);
		throw error;
	}
};

// updateRecipeRating
export const updateRecipeRating = async (recipeId: string, rating: number) => {
	try {
		const response = await axiosInstance.put(
			`/api/recipe/rating/${recipeId}`,
			{ rating },
			{ withCredentials: true },
		);
		// object: { ok, message, data: { id, value, userId, recipeId, ... } }
		return response.data;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

// favorites
// get Favorite Recipes
export const getFavoriteRecipes = async (userId: string) => {
	try {
		const response = await axiosInstance.get(`/api/recipe/${userId}/favorites`, {
			withCredentials: true,
		});
		return response.data;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

// add Favorite Recipe
export const addFavoriteRecipe = async (userId: string, recipeId: string) => {
	try {
		const response = await axiosInstance.post(
			'/api/recipe/favorites',
			{ recipeId, userId },
			{ withCredentials: true },
		);
		return response.data;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

// remove Favorite Recipe
export const removeFavoriteRecipe = async (userId: string, recipeId: string) => {
	try {
		const response = await axiosInstance.delete(`/api/recipe/favorites/${userId}/${recipeId}`, {
			withCredentials: true,
		});
		return response.data;
	} catch (err) {
		console.error(err);
		throw err;
	}
};
