import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Recipe } from '@/types/TypeRecipe';
import {
	getListRecipes,
	getRecipeById,
	updateRecipeRating,
	addFavoriteRecipe,
	removeFavoriteRecipe,
	getFavoriteRecipes,
} from '@/services/recipe.service';
import type { RootState } from '../store';
// Contains API for Recipe Service

export interface RecipeState {
	recipesById: Record<string, Recipe>;
	recipesByCategory: Record<string, Recipe[]>;
	allRecipes: Recipe[];
	searchRecipes: Recipe[];
	favoriteRecipesList: Recipe[];
	loading: boolean;
	error: string | null;
}

const initialState: RecipeState = {
	recipesById: {},
	recipesByCategory: {},
	allRecipes: [],
	searchRecipes: [],
	favoriteRecipesList: [],
	loading: false,
	error: null,
};

// Thunks
export const fetchRecipeById = createAsyncThunk('recipes/fetchById', async (id: string) => {
	const res = await getRecipeById(id);
	return res.data.recipe as Recipe;
});

export const fetchRecipesByCategoryName = createAsyncThunk(
	'recipes/fetchByCategory',
	async (categoryName: string) => {
		const data = await getListRecipes(categoryName);
		return { categoryName, data };
	},
);

export const fetchAllRecipes = createAsyncThunk('recipes/fetchAll', async () => {
	const res = await getListRecipes();
	return res as Recipe[];
});

export const fetchRecipesBySearch = createAsyncThunk(
	'recipes/fetchBySearch',
	async ({ searchValue, categoryName }: { searchValue: string; categoryName?: string }) => {
		const res = await getListRecipes(searchValue, categoryName);
		return res as Recipe[];
	},
);

export const submitRecipeRating = createAsyncThunk<
	any,
	{ recipeId: string; rating: number },
	{ state: RootState }
>('recipes/submitRating', async ({ recipeId, rating }, { dispatch }) => {
	// Gửi rating
	await updateRecipeRating(recipeId, rating);
	// Gọi fetchRecipeById để lấy dữ liệu mới nhất
	await dispatch(fetchRecipeById(recipeId)).unwrap();
	return { recipeId, rating };
});

export const fetchFavoriteRecipes = createAsyncThunk<
	Recipe[], // Return type is Recipe[]
	{ userId: string },
	{ state: RootState }
>('recipes/fetchFavoriteRecipes', async ({ userId }) => {
	const response = await getFavoriteRecipes(userId);
	// Handle the nested API response structure: { data: { favorites: [...] } }
	const favoritesData = response.data?.favorites || response.favorites || [];
	const recipes = favoritesData.map((favorite: any) => favorite.recipe);
	return recipes;
});

export const addToFavorites = createAsyncThunk<
	{ recipeId: string },
	{ userId: string; recipeId: string },
	{ state: RootState }
>('recipes/addToFavorites', async ({ userId, recipeId }) => {
	await addFavoriteRecipe(userId, recipeId);
	return { recipeId };
});

export const removeFromFavorites = createAsyncThunk<
	{ recipeId: string },
	{ userId: string; recipeId: string },
	{ state: RootState }
>('recipes/removeFromFavorites', async ({ userId, recipeId }) => {
	await removeFavoriteRecipe(userId, recipeId);
	return { recipeId };
});

const recipeAPISlice = createSlice({
	name: 'recipes',
	initialState,
	reducers: {
		toggleFavoriteLocal: (state, action: PayloadAction<string>) => {
			const recipeId = action.payload;
			const existingIndex = state.favoriteRecipesList.findIndex(recipe => recipe.id === recipeId);
			if (existingIndex === -1) {
				// Add to favorites - find recipe from other sources
				const recipe = state.recipesById[recipeId] || state.allRecipes.find(r => r.id === recipeId);
				if (recipe) {
					state.favoriteRecipesList.push(recipe);
				}
			} else {
				// Remove from favorites
				state.favoriteRecipesList.splice(existingIndex, 1);
			}
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchRecipeById.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchRecipeById.fulfilled, (state, action: PayloadAction<Recipe>) => {
				state.loading = false;
				state.recipesById[action.payload.id] = {
					...action.payload,
					hasReviewed: state.recipesById[action.payload.id]?.hasReviewed || false,
					userRating: state.recipesById[action.payload.id]?.userRating || 0,
				};
			})
			.addCase(fetchRecipeById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Error';
			})

			.addCase(fetchRecipesByCategoryName.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchRecipesByCategoryName.fulfilled,
				(state, action: PayloadAction<{ categoryName: string; data: Recipe[] }>) => {
					state.loading = false;
					state.recipesByCategory[action.payload.categoryName] = action.payload.data;
				},
			)
			.addCase(fetchRecipesByCategoryName.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Error';
			})

			.addCase(fetchAllRecipes.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchAllRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
				state.loading = false;
				state.allRecipes = action.payload;
			})
			.addCase(fetchAllRecipes.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Error';
			})

			.addCase(fetchRecipesBySearch.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchRecipesBySearch.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
				state.loading = false;
				state.searchRecipes = action.payload;
			})
			.addCase(fetchRecipesBySearch.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Failed to search recipes';
			})

			.addCase(submitRecipeRating.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				submitRecipeRating.fulfilled,
				(state, action: PayloadAction<{ recipeId: string; rating: number }>) => {
					state.loading = false;
					const { recipeId, rating } = action.payload;
					if (state.recipesById[recipeId]) {
						state.recipesById[recipeId].hasReviewed = true;
						state.recipesById[recipeId].userRating = rating;
					}
				},
			)
			.addCase(submitRecipeRating.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Error';
			})

			.addCase(addToFavorites.fulfilled, (state, action) => {
				const { recipeId } = action.payload;
				const exists = state.favoriteRecipesList.some(recipe => recipe.id === recipeId);
				if (!exists) {
					const recipe =
						state.recipesById[recipeId] || state.allRecipes.find(r => r.id === recipeId);
					if (recipe) {
						state.favoriteRecipesList.push(recipe);
					}
				}
			})
			.addCase(addToFavorites.rejected, (state, action) => {
				state.error = action.error.message ?? 'Failed to add favorite';
			})

			.addCase(removeFromFavorites.fulfilled, (state, action) => {
				const { recipeId } = action.payload;
				state.favoriteRecipesList = state.favoriteRecipesList.filter(
					recipe => recipe.id !== recipeId,
				);
			})
			.addCase(removeFromFavorites.rejected, (state, action) => {
				state.error = action.error.message ?? 'Failed to remove favorite';
			})

			.addCase(fetchFavoriteRecipes.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchFavoriteRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
				state.loading = false;
				state.favoriteRecipesList = action.payload;
			})
			.addCase(fetchFavoriteRecipes.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Failed to fetch favorite recipes';
			});
	},
});

export const { toggleFavoriteLocal } = recipeAPISlice.actions;

export const selectSearchResults = (state: RootState) => state.recipeAPI.searchRecipes;

export const selectFavoriteRecipes = (state: RootState) =>
	state.recipeAPI.favoriteRecipesList.map(recipe => recipe.id);

export const selectFavoriteRecipesList = (state: RootState) => state.recipeAPI.favoriteRecipesList;
export const selectFavoriteRecipeIds = (state: RootState) =>
	state.recipeAPI.favoriteRecipesList.map(recipe => recipe.id);
export const selectIsRecipeFavorite = (recipeId: string) => (state: RootState) =>
	state.recipeAPI.favoriteRecipesList.some(recipe => recipe.id === recipeId);

export default recipeAPISlice.reducer;
