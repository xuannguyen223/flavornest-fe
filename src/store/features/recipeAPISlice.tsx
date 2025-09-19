import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Recipe } from '@/types/TypeRecipe';
import { getRecipeById, getRecipesByCategory, getAllRecipes, updateRecipeRating } from '@/services/recipe.service';
import type { RootState } from '../store';
// Contains API for Recipe Service

export interface RecipeState {
  recipesById: Record<string, Recipe>;
  recipesByCategory: Record<string, Recipe[]>;
  allRecipes: Recipe[];
  loading: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  recipesById: {},
  recipesByCategory: {},
  allRecipes: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchRecipeById = createAsyncThunk(
  'recipes/fetchById',
  async (id: string) => {
    const res = await getRecipeById(id);
    return res.data.recipe as Recipe;
  }
);

export const fetchRecipesByCategory = createAsyncThunk(
  'recipes/fetchByCategory',
  async (categoryName: string) => {
    const data = await getRecipesByCategory(categoryName);
    return { categoryName, data };
  }
);

export const fetchAllRecipes = createAsyncThunk(
  'recipes/fetchAll',
  async () => {
    const res = await getAllRecipes();
    return res.data.recipes as Recipe[];
  }
);

export const submitRecipeRating = createAsyncThunk<
  any, 
  { recipeId: string; rating: number }, 
  { state: RootState }
>(
  'recipes/submitRating',
  async ({ recipeId, rating }, { dispatch }) => {
    // Gửi rating
    await updateRecipeRating(recipeId, rating);
    // Gọi fetchRecipeById để lấy dữ liệu mới nhất
    await dispatch(fetchRecipeById(recipeId)).unwrap();
    return { recipeId, rating };
  }
);


const recipeAPISlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    builder
      // fetchRecipeById
      .addCase(fetchRecipeById.pending, (state) => { 
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

      // fetchRecipesByCategory
      .addCase(fetchRecipesByCategory.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(fetchRecipesByCategory.fulfilled, (state, action: PayloadAction<{ categoryName: string, data: Recipe[] }>) => {
        state.loading = false;
        state.recipesByCategory[action.payload.categoryName] = action.payload.data;
      })
      .addCase(fetchRecipesByCategory.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.error.message ?? 'Error'; 
      })

      // fetchAllRecipes
      .addCase(fetchAllRecipes.pending, (state) => { 
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

      // submitRecipeRating
      .addCase(submitRecipeRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitRecipeRating.fulfilled, (state, action: PayloadAction<{ recipeId: string; rating: number }>) => {
        state.loading = false;
        const { recipeId, rating } = action.payload;
        if (state.recipesById[recipeId]) {
          state.recipesById[recipeId].hasReviewed = true;
          state.recipesById[recipeId].userRating = rating;
        }
      })
      .addCase(submitRecipeRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error';
      });
  },
});

export default recipeAPISlice.reducer;
