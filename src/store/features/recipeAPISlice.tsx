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
	getUserRecipes,
} from '@/services/recipe.service';
import type { RootState } from '../store';
// Contains API for Recipe Service

export interface RecipeState {
	recipesById: Record<string, Recipe>;
	recipesByCategory: Record<string, Recipe[]>;
	recipesByCategoryType: Record<string, Recipe[]>;
	allRecipes: Recipe[];
	userRecipes: Recipe[];
	searchRecipes: Recipe[];
	favoriteRecipesList: Recipe[];
	loading: boolean;
	error: string | null;
	fetchedCategories: Record<string, boolean>;
	fetchedCategoryTypes: Record<string, boolean>;
	fetchedSearch: Record<string, boolean>;
	allRecipesFetched: boolean;
}

const initialState: RecipeState = {
	recipesById: {},
	recipesByCategory: {},
	recipesByCategoryType: {},
	allRecipes: [],
	userRecipes: [],
	searchRecipes: [],
	favoriteRecipesList: [],
	loading: true,
	error: null,
	fetchedCategories: {},
	fetchedCategoryTypes: {},
	fetchedSearch: {},
	allRecipesFetched: false,
};

// Thunks
export const fetchRecipeById = createAsyncThunk('recipes/fetchById', async (id: string) => {
	const res = await getRecipeById(id);
	return res.data.recipe as Recipe;
});

export const fetchAllRecipes = createAsyncThunk('recipes/fetchAll', async () => {
	const res = await getListRecipes();
	return res as Recipe[];
});

export const fetchUserRecipes = createAsyncThunk<
	Recipe[],
	{ userId: string },
	{ state: RootState }
>('recipes/fetchByUserId', async ({ userId }) => {
	const response = await getUserRecipes(userId);
	const userRecipesData = response || [];

	if (!userRecipesData.length) return [];

	const recipePromises = userRecipesData.map((recipe: any) => {
		const recipeId = recipe.id;
		if (!recipeId) throw new Error(`Missing recipeId in user recipe: ${JSON.stringify(recipe)}`);
		return getRecipeById(recipeId);
	});

	const recipeResponses = await Promise.all(recipePromises);
	const detailedRecipes = recipeResponses.map(res => {
		if (res.data?.recipe) return res.data.recipe;
		if (res.recipe) return res.recipe;
		return res;
	});

	return detailedRecipes as Recipe[];
});

export const fetchRecipesBySearch = createAsyncThunk(
	'recipes/fetchBySearch',
	async ({ searchValue, categoryNames }: { searchValue: string; categoryNames?: string[] }) => {
		const res = await getListRecipes(searchValue, categoryNames);
		return res as Recipe[];
	},
);

export const fetchRecipesByCategoryNames = createAsyncThunk(
	'recipes/fetchByCategoryNames',
	async ({ searchValue, categoryNames }: { searchValue?: undefined; categoryNames?: string[] }) => {
		const data = await getListRecipes(searchValue, categoryNames);
		return { categoryNames: categoryNames || [], data };
	},
);

export const fetchRecipesByCategoryType = createAsyncThunk(
	'recipes/fetchByCategoryType',
	async ({
		searchValue,
		categoryNames,
		categoryType,
	}: {
		searchValue?: undefined;
		categoryNames?: undefined;
		categoryType?: string;
	}) => {
		const data = await getListRecipes(searchValue, categoryNames, categoryType);
		return { categoryType: categoryType || '', data };
	},
);

export const submitRecipeRating = createAsyncThunk<
	{ recipeId: string; rating: number },
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
	Recipe[],
	{ userId: string },
	{ state: RootState }
>('recipes/fetchFavoriteRecipes', async ({ userId }) => {
	const response = await getFavoriteRecipes(userId);
	// Xử lý cấu trúc response
	const favoritesData = response.data?.favorites || response.favorites || [];

	// Nếu không có favorites, trả về mảng rỗng
	if (!favoritesData.length) {
		return [];
	}

	// Lấy danh sách recipeId và gọi getRecipeById cho mỗi id
	const recipePromises = favoritesData.map((favorite: any) => {
		const recipeId = favorite.recipeId || favorite.recipe?.id;
		if (!recipeId) {
			throw new Error(`Missing recipeId in favorite: ${JSON.stringify(favorite)}`);
		}
		return getRecipeById(recipeId);
	});

	const recipeResponses = await Promise.all(recipePromises);

	// Ánh xạ response thành mảng Recipe[]
	const recipes = recipeResponses.map(response => {
		// Kiểm tra cấu trúc response: { data: { recipe: {...} } } hoặc { recipe: {...} }
		if (response.data?.recipe) {
			return response.data.recipe;
		} else if (response.recipe) {
			return response.recipe;
		} else {
			return response; // Fallback nếu response đã là Recipe
		}
	});
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

			.addCase(fetchUserRecipes.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUserRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
				state.loading = false;
				state.userRecipes = action.payload;
			})
			.addCase(fetchUserRecipes.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Failed to fetch user recipes';
			})

			.addCase(fetchRecipesByCategoryType.pending, state => {
				state.loading = true;
				state.error = null;
			})

			.addCase(
				fetchRecipesByCategoryType.fulfilled,
				(state, action: PayloadAction<{ categoryType: string; data: Recipe[] }>) => {
					state.loading = false;
					state.error = null;
					state.recipesByCategoryType[action.payload.categoryType] = action.payload.data;
					state.fetchedCategoryTypes[action.payload.categoryType] = true;
				},
			)
			.addCase(fetchRecipesByCategoryType.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Error fetching recipes by category type';
			})

			// theo categoryNames
			.addCase(fetchRecipesByCategoryNames.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchRecipesByCategoryNames.fulfilled,
				(state, action: PayloadAction<{ categoryNames: string[]; data: Recipe[] }>) => {
					state.loading = false;
					state.searchRecipes = action.payload.data;
					// Also store individual categories for single category access
					if (action.payload.categoryNames.length === 1) {
						state.recipesByCategory[action.payload.categoryNames[0]] = action.payload.data;
						state.fetchedCategories[action.payload.categoryNames[0]] = true;
					}
					action.payload.categoryNames.forEach(categoryName => {
						state.fetchedCategories[categoryName] = true;
					});
				},
			)
			.addCase(fetchRecipesByCategoryNames.rejected, (state, action) => {
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
				state.allRecipesFetched = true;
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
