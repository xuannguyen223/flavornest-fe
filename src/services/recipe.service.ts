import axiosInstance from './axiosInstance';

// recipe service functions:
// getAllRecipes, getRecipesByCategory, getRecipeById, addRecipe, updateRecipe, deleteRecipe,...
// dưới đây là ví dụ cách dùng, không cần phải viết lại axiosInstance trong file này
// tham khảo cách viết

// export const getAllRecipes = async () => {
//     const response = await axiosInstance.get("/recipes", { withCredentials: true });
//     return response.data;
// };

// viết dưới dạng lấy list theo query params (tham khảo thôi nhé)
// export const getRecipesByCategory = async (category: string) => {
//     const response = await axiosInstance.get(`/recipes?category=${category}`, { withCredentials: true });
//     return response.data;
// };
