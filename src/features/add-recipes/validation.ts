import * as yup from 'yup';
import type { RecipeFormData } from "@/store/features/recipeSlice";


// Yup schema cho validation
const recipeSchema = yup.object().shape({
    title: yup
        .string()
        .required('Recipe title is required')
        .trim()
        .min(1, 'Recipe title cannot be empty'),
    
    description: yup
        .string()
        .required('Description is required')
        .trim()
        .min(1, 'Description cannot be empty'),
    
    servings: yup
        .mixed()
        .required('Servings is required')
        .test('is-valid-servings', 'Servings must be a positive integer', function(value) {
            if (!value || value === '') return false;
            const numValue = typeof value === 'string' ? parseInt(value) : Number(value);
            return !isNaN(numValue) && numValue > 0 && Number.isInteger(numValue);
        }),
    
    prepTime: yup.object().shape({
        hrs: yup.mixed(),
        mins: yup
            .mixed()
            .test('is-valid-mins', 'Prep time minutes must be between 0 and 60', function(value) {
                if (value === '' || value === null || value === undefined) return true;
                const numValue = Number(value);
                return !isNaN(numValue) && numValue >= 0 && numValue <= 60;
            })
    }).test('is-required', 'Prep time is required', function(value) {
        return value && (value.hrs !== '' || value.mins !== '');
    }),
    
    cookTime: yup.object().shape({
        hrs: yup.mixed(),
        mins: yup
            .mixed()
            .test('is-valid-mins', 'Cook time minutes must be between 0 and 60', function(value) {
                if (value === '' || value === null || value === undefined) return true;
                const numValue = Number(value);
                return !isNaN(numValue) && numValue >= 0 && numValue <= 60;
            })
    }).test('is-required', 'Cook time is required', function(value) {
        return value && (value.hrs !== '' || value.mins !== '');
    }),
    
    ingredients: yup
        .array()
        .min(1, 'At least one ingredient is required')
        .test('has-valid-ingredient', 'At least one ingredient with name is required', function(ingredients) {
            return ingredients && ingredients.some(ingredient => 
                ingredient.name && ingredient.name.trim() !== ''
            );
        }),
    
    instructions: yup
        .array()
        .min(1, 'At least one instruction is required')
        .test('has-valid-instruction', 'At least one instruction with description is required', function(instructions) {
            return instructions && instructions.some(instruction => 
                instruction.description && instruction.description.trim() !== ''
            );
        }),

    categories: yup
        .array()
        .test('has-valid-category', 'Categories must have valid data', function(categories) {
            if (!categories || categories.length === 0) return true; // Optional field
            return categories.some(category => 
                category.categoryId && category.categoryId.trim() !== ''
            );
        })
});

export async function validateRecipe(recipe: RecipeFormData): Promise<Record<string, string>> {
    try {
        await recipeSchema.validate(recipe, { abortEarly: false });
        return {};
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            const errors: Record<string, string> = {};
            error.inner.forEach(err => {
                const field = err.path || 'unknown';
                if (!errors[field]) {
                    errors[field] = err.message;
                }
            });
            return errors;
        }
        return {};
    }
}