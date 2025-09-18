export interface Author {
    id: string;
    email: string;
}

export interface Instruction {
    id: number;
    step: number;
    description: string;
    imageUrl: string | null;
}

export interface Ingredient {
    id: number;
    name: string;
    quantity: number;
    unit: string;
}

export interface Category {
    id: string;
    name: string;
    type: string;
    description: string;
}
  
export interface RecipeCategory {
    recipeId: string;
    categoryId: string;
    category: Category;
}

export interface Recipe {
    id: string;
    title: string;
    description: string;
    cookTips: string;
    prepTime: number;
    cookTime: number;
    servings: number;
    rating: number;
    ratingCount: number;
    imageUrl?: string;
    createdAt: string;
    authorId: string;
    author: Author;    
    instructions: Instruction[];
    ingredients: Ingredient[];
    categories: RecipeCategory[];
}