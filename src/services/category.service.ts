import axiosInstance from './axiosInstance';
import type { Category } from '@/types/TypeRecipe';

export const getAllCategories = async (): Promise<Category[]> => {
    try {
      const res = await axiosInstance.get('/api/recipe/category/get', { withCredentials: true });
      // res.data: { ok, message, data { categoryList: [...] } }
      console.log(res.data);
      return res.data.data.categoryList as Category[];
    } catch (err) {
      console.error("Không thể lấy danh mục:", err);
      throw err;
    }
};

  