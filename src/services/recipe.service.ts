import axiosInstance from './axiosInstance';

// recipe service functions:
// getAllRecipes, getRecipesByCategory, getRecipeById, addRecipe, updateRecipe, deleteRecipe,...
// dưới đây là ví dụ cách dùng, không cần phải viết lại axiosInstance trong file này
// tham khảo cách viết

// viết dưới dạng lấy list theo query params (tham khảo thôi nhé)
// export const getRecipesByCategory = async (category: string) => {
//     const response = await axiosInstance.get(`/recipes?category=${category}`, { withCredentials: true });
//     return response.data;
// };

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