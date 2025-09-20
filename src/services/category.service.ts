import type { Category } from "@/types/TypeRecipe";
import axiosInstance from "./axiosInstance";

// getAllCategories
export const getAllCategories = async (): Promise<Category[]> => {
    try {
        const response = await axiosInstance.get(`/api/recipe/category/get`, { withCredentials: true });
        return response.data.data.categoryList;
    } catch (error) {
        console.error("Error fetching category detail:", error);
        throw error;
    }
};