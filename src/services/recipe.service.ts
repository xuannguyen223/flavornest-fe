import axiosInstance from './axiosInstance';
import type { Recipe } from '@/types/TypeRecipe';
// recipe service functions:
// getAllRecipes, getRecipesByCategory, getRecipeById, addRecipe, updateRecipe, deleteRecipe,...

// getAllRecipes
export const getAllRecipes = async () => {
    try {
        const response = await axiosInstance.get(`/api/recipe/get`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching recipe detail:", error);
        throw error;
    }
};

// getRecipeById
export const getRecipeById = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/api/recipe/get/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching recipe detail:", error);
        throw error;
    }
};

// getRecipesByCategory
export const getRecipesByCategory = async (categoryName: string): Promise<Recipe[]> => {
    try {
      const response = await axiosInstance.get(
        `/api/recipe/get?filter=${encodeURIComponent(categoryName)}`,
        { withCredentials: true }
      );
      // fallback [] if API returns undefined
      return response.data?.data?.recipes ?? [];
    } catch (error) {
      console.error(`Error fetching recipes by category: ${categoryName}`, error);
      throw error;
    }
};