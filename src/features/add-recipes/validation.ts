import type { Recipe } from "@/store/features/recipeSlice";

export type ValidationError = {
    field: string;
    message: string;
};

export function validateRecipe(_recipe: Recipe): ValidationError[] {
    // Minimal validation placeholder; extend with real rules later
    return [];
}

export function formatValidationErrors(errors: ValidationError[]): Record<string, string> {
    const result: Record<string, string> = {};
    for (const err of errors) {
        if (!result[err.field]) {
            result[err.field] = err.message;
        }
    }
    return result;
}



