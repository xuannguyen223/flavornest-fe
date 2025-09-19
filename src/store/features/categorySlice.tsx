import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Recipe, Category } from '@/types/TypeRecipe';
import { getAllCategories } from '@/services/category.service';

export interface CategoryState {
    recipesById: Record<string, Recipe>; 
    allRecipes: Recipe[];
    categories: Category[]; // Lưu toàn bộ danh mục
    categoriesByType: Record<string, Category[]>; // Lưu danh mục theo type (VD: { CUISINE: Category[] })
    categoryTypes: string[]; // Lưu danh sách type duy nhất (VD: CUISINE, MEALTYPE)
    loading: boolean;
    error: string | null;
}
  
const initialState: CategoryState = {
    recipesById: {},
    allRecipes: [],
    categories: [],
    categoriesByType: {},
    categoryTypes: [],
    loading: false,
    error: null,
};

// Format lại chữ
export const formatCategoryType = (type: string) => {
    return type
      .toLowerCase()              // chuyển về chữ thường
      .split('_')                 // tách theo dấu _
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // viết hoa chữ cái đầu
      .join(' ');                 // nối lại bằng space
};

// fetchAllCategories
export const fetchAllCategories = createAsyncThunk(
    "recipes/fetchAllCategories",
    async () => {
        const categories = await getAllCategories();
  
        // Format type
        const formattedCategories = categories.map(cat => ({
            ...cat,
            type: formatCategoryType(cat.type)
        }));
  
        return formattedCategories; // trả về Category[]
    }
);

const categorySlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
        // Xử lý fetchAllCategories
        .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(fetchAllCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload; // Lưu tất cả category
        
        // Lưu danh mục theo type
        state.categoriesByType = action.payload.reduce((acc, category) => {
            const type = category.type;
            if (!acc[type]) {
            acc[type] = [];
            }
            acc[type].push(category);
            return acc;
        }, {} as Record<string, Category[]>);
        
        // Lấy danh sách type duy nhất
        state.categoryTypes = Object.keys(state.categoriesByType);
        })
        .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error';
        });
    },
});

export default categorySlice.reducer;