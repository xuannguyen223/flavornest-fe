import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Ingredient, Instruction, RecipeCategory } from '@/types/TypeRecipe';

export interface TimeValue {
  hrs: number | '';
  mins: number | '';
}

export interface RecipeFormData {
  id?: string;
  title: string;
  description: string;
  servings: number | '';
  prepTime: TimeValue;
  cookTime: TimeValue;
  ingredients: Ingredient[];
  instructions: Instruction[];
  cookTips: string;
  categories: RecipeCategory[];
  photo: File | null;
  photoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  avgRating: number;
  ratingCount: number;
}

export interface RecipeFormState {
  currentRecipe: RecipeFormData;
  error: string | null;
  validationErrors: Record<string, string>;
  isDirty: boolean;
}

// Initial state
const createEmptyIngredient = (): Ingredient => ({
  id: Math.floor(Math.random() * 1000000),
  quantity: '' as any,
  unit: '',
  name: '',
});

const createEmptyInstruction = (): Instruction => ({
  id: Math.floor(Math.random() * 1000000),
  step: 0,
  description: '',
  imageUrl: null,
});

const initialRecipe: RecipeFormData = {
  title: '',
  description: '',
  servings: '' as number | '',
  prepTime: { hrs: '' as number | '', mins: '' as number | '' },
  cookTime: { hrs: '' as number | '', mins: '' as number | '' },
  ingredients: [
    createEmptyIngredient(),
    createEmptyIngredient(),
    createEmptyIngredient(),
    createEmptyIngredient(),
  ],
  instructions: [
    { ...createEmptyInstruction(), step: 1 },
    { ...createEmptyInstruction(), step: 2 },
  ],
  cookTips: '',
  categories: [],
  photo: null,
  avgRating: 0,
  ratingCount: 0,
};

const initialState: RecipeFormState = {
  currentRecipe: initialRecipe,
  error: null,
  validationErrors: {},
  isDirty: false,
};

// Recipe slice
export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ field: keyof RecipeFormData; value: RecipeFormData[keyof RecipeFormData] }>) => {
      const { field, value } = action.payload;
      (state.currentRecipe as any)[field] = value;
      state.isDirty = true;
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
      const ingredientId = parseInt(action.payload);
      if (state.currentRecipe.ingredients.length > 1) {
        state.currentRecipe.ingredients = state.currentRecipe.ingredients.filter(
          ingredient => ingredient.id !== ingredientId
        );
        state.isDirty = true;
      }
    },

    updateIngredient: (state, action: PayloadAction<{ id: string; updates: Partial<Ingredient> }>) => {
      const { id, updates } = action.payload;
      const ingredientId = parseInt(id);
      const index = state.currentRecipe.ingredients.findIndex(ingredient => ingredient.id === ingredientId);
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
      const newStep = createEmptyInstruction();
      newStep.step = state.currentRecipe.instructions.length + 1;
      state.currentRecipe.instructions.push(newStep);
      state.isDirty = true;
    },

    removeStep: (state, action: PayloadAction<string>) => {
      const stepId = parseInt(action.payload);
      if (state.currentRecipe.instructions.length > 1) {
        state.currentRecipe.instructions = state.currentRecipe.instructions.filter(
          step => step.id !== stepId
        );
        
        state.currentRecipe.instructions.forEach((step, index) => {
          step.step = index + 1;
        });
        state.isDirty = true;
      }
    },

    updateStep: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const { id, text } = action.payload;
      const stepId = parseInt(id);
      const index = state.currentRecipe.instructions.findIndex(step => step.id === stepId);
      if (index !== -1) {
        state.currentRecipe.instructions[index].description = text;
        state.isDirty = true;
      }
    },


    // Categories management
    updateCategories: (state, action: PayloadAction<RecipeCategory[]>) => {
      state.currentRecipe.categories = action.payload;
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
  },
});

export const {
  updateField,
  addIngredient,
  removeIngredient,
  updateIngredient,
  addStep,
  removeStep,
  updateStep,
  updateCategories,
  setValidationErrors,
  clearValidationErrors,
  resetForm,
} = recipeSlice.actions;

export const selectCurrentRecipe = (state: { recipe: RecipeFormState }) => state.recipe.currentRecipe;
export const selectError = (state: { recipe: RecipeFormState }) => state.recipe.error;
export const selectValidationErrors = (state: { recipe: RecipeFormState }) => state.recipe.validationErrors;

export default recipeSlice.reducer;