import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Types
export interface Ingredient {
  id: string;
  qty: string;
  unit: string;
  name: string;
  note?: string;
}

export interface InstructionStep {
  id: string;
  text: string;
  order: number;
}

export interface TimeValue {
  hrs: number | '';
  mins: number | '';
}

export interface Tags {
  cuisine?: string;
  mealType?: string;
  dietary?: string[];
  method?: string;
  main?: string;
}

export interface Recipe {
  id?: string;
  title: string;
  description: string;
  servings: number | '';
  prep: TimeValue;
  cook: TimeValue;
  ingredients: Ingredient[];
  steps: InstructionStep[];
  tips: string;
  tags: Tags;
  photo: File | null;
  photoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RecipeFormState {
  currentRecipe: Recipe;
  recipes: Recipe[];
  isLoading: boolean;
  error: string | null;
  validationErrors: Record<string, string>;
  isDirty: boolean;
  isSubmitting: boolean;
}

// Initial state
const createEmptyIngredient = (): Ingredient => ({
  id: Math.random().toString(36).substr(2, 9),
  qty: '',
  unit: '',
  name: '',
  note: '',
});

const createEmptyStep = (): InstructionStep => ({
  id: Math.random().toString(36).substr(2, 9),
  text: '',
  order: 0,
});

const initialRecipe: Recipe = {
  title: '',
  description: '',
  servings: '' as number | '',
  prep: { hrs: '' as number | '', mins: '' as number | '' },
  cook: { hrs: '' as number | '', mins: '' as number | '' },
  ingredients: [
    createEmptyIngredient(),
    createEmptyIngredient(),
    createEmptyIngredient(),
    createEmptyIngredient(),
  ],
  steps: [
    { ...createEmptyStep(), order: 1 },
    { ...createEmptyStep(), order: 2 },
  ],
  tips: '',
  tags: {},
  photo: null,
};

const initialState: RecipeFormState = {
  currentRecipe: initialRecipe,
  recipes: [],
  isLoading: false,
  error: null,
  validationErrors: {},
  isDirty: false,
  isSubmitting: false,
};

// Async thunks
export const saveRecipe = createAsyncThunk(
  'recipe/saveRecipe',
  async (recipe: Recipe, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const savedRecipe = {
        ...recipe,
        id: recipe.id || Math.random().toString(36).substr(2, 9),
        createdAt: recipe.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      return savedRecipe;
    } catch (error) {
      return rejectWithValue('Failed to save recipe');
    }
  }
);

export const loadRecipes = createAsyncThunk(
  'recipe/loadRecipes',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return [];
    } catch (error) {
      return rejectWithValue('Failed to load recipes');
    }
  }
);

// Recipe slice
export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    // Form field updates
    updateField: (state, action: PayloadAction<{ field: keyof Recipe; value: any }>) => {
      const { field, value } = action.payload;
      state.currentRecipe[field] = value;
      state.isDirty = true;
      // Clear validation error for this field
      if (state.validationErrors[field]) {
        delete state.validationErrors[field];
      }
    },

    // Ingredient management
    addIngredient: (state) => {
      const newIngredient = createEmptyIngredient();
      state.currentRecipe.ingredients.push(newIngredient);
      state.isDirty = true;
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      const ingredientId = action.payload;
      if (state.currentRecipe.ingredients.length > 1) {
        state.currentRecipe.ingredients = state.currentRecipe.ingredients.filter(
          ing => ing.id !== ingredientId
        );
        state.isDirty = true;
      }
    },

    updateIngredient: (state, action: PayloadAction<{ id: string; updates: Partial<Ingredient> }>) => {
      const { id, updates } = action.payload;
      const index = state.currentRecipe.ingredients.findIndex(ing => ing.id === id);
      if (index !== -1) {
        state.currentRecipe.ingredients[index] = {
          ...state.currentRecipe.ingredients[index],
          ...updates,
        };
        state.isDirty = true;
      }
    },

    // Instruction management
    addStep: (state) => {
      const newStep = createEmptyStep();
      newStep.order = state.currentRecipe.steps.length + 1;
      state.currentRecipe.steps.push(newStep);
      state.isDirty = true;
    },

    removeStep: (state, action: PayloadAction<string>) => {
      const stepId = action.payload;
      if (state.currentRecipe.steps.length > 1) {
        state.currentRecipe.steps = state.currentRecipe.steps.filter(
          step => step.id !== stepId
        );
        // Reorder remaining steps
        state.currentRecipe.steps.forEach((step, index) => {
          step.order = index + 1;
        });
        state.isDirty = true;
      }
    },

    updateStep: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const { id, text } = action.payload;
      const index = state.currentRecipe.steps.findIndex(step => step.id === id);
      if (index !== -1) {
        state.currentRecipe.steps[index].text = text;
        state.isDirty = true;
      }
    },

    reorderSteps: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload;
      const steps = [...state.currentRecipe.steps];
      const [movedStep] = steps.splice(fromIndex, 1);
      steps.splice(toIndex, 0, movedStep);
      
      // Update order numbers
      steps.forEach((step, index) => {
        step.order = index + 1;
      });
      
      state.currentRecipe.steps = steps;
      state.isDirty = true;
    },

    // Tags management
    updateTags: (state, action: PayloadAction<Partial<Tags>>) => {
      state.currentRecipe.tags = {
        ...state.currentRecipe.tags,
        ...action.payload,
      };
      state.isDirty = true;
    },

    // Validation
    setValidationErrors: (state, action: PayloadAction<Record<string, string>>) => {
      state.validationErrors = action.payload;
    },

    clearValidationErrors: (state) => {
      state.validationErrors = {};
    },

    // Form state management
    resetForm: (state) => {
      state.currentRecipe = initialRecipe;
      state.validationErrors = {};
      state.isDirty = false;
      state.error = null;
    },

    loadRecipe: (state, action: PayloadAction<Recipe>) => {
      state.currentRecipe = action.payload;
      state.validationErrors = {};
      state.isDirty = false;
      state.error = null;
    },

    setDirty: (state, action: PayloadAction<boolean>) => {
      state.isDirty = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Save recipe
      .addCase(saveRecipe.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(saveRecipe.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.currentRecipe = action.payload;
        state.isDirty = false;
        state.error = null;
        
        // Add to recipes list if it's new
        const existingIndex = state.recipes.findIndex(r => r.id === action.payload.id);
        if (existingIndex === -1) {
          state.recipes.push(action.payload);
        } else {
          state.recipes[existingIndex] = action.payload;
        }
      })
      .addCase(saveRecipe.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload as string;
      })
      
      // Load recipes
      .addCase(loadRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recipes = action.payload;
        state.error = null;
      })
      .addCase(loadRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const {
  updateField,
  addIngredient,
  removeIngredient,
  updateIngredient,
  addStep,
  removeStep,
  updateStep,
  reorderSteps,
  updateTags,
  setValidationErrors,
  clearValidationErrors,
  resetForm,
  loadRecipe,
  setDirty,
} = recipeSlice.actions;

// Selectors
export const selectCurrentRecipe = (state: { recipe: RecipeFormState }) => state.recipe.currentRecipe;
export const selectRecipes = (state: { recipe: RecipeFormState }) => state.recipe.recipes;
export const selectIsLoading = (state: { recipe: RecipeFormState }) => state.recipe.isLoading;
export const selectError = (state: { recipe: RecipeFormState }) => state.recipe.error;
export const selectValidationErrors = (state: { recipe: RecipeFormState }) => state.recipe.validationErrors;
export const selectIsDirty = (state: { recipe: RecipeFormState }) => state.recipe.isDirty;
export const selectIsSubmitting = (state: { recipe: RecipeFormState }) => state.recipe.isSubmitting;

export default recipeSlice.reducer;
