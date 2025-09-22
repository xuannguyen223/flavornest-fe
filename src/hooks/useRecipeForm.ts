import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setValidationErrors,
  clearValidationErrors,
  resetForm,
  selectCurrentRecipe,
  selectValidationErrors,
  selectError,
  type RecipeFormData,
} from '@/store/features/recipeSlice';
import { validateRecipe } from '../features/add-recipes/validation';
import { createRecipe } from '@/services/recipe.service';

export const useRecipeForm = (defaultValues?: Partial<RecipeFormData>, onSubmit?: (result: any) => void) => {
  const dispatch = useAppDispatch();
  const currentRecipe = useAppSelector(selectCurrentRecipe);
  const validationErrors = useAppSelector(selectValidationErrors);
  const error = useAppSelector(selectError);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const photoUploaderRef = useRef<any>(null);

  useEffect(() => {
    if (defaultValues?.photo) {
      setPhoto(defaultValues.photo);
    }
  }, [defaultValues?.photo]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearValidationErrors());
    setIsSubmitting(true);

    const recipeWithPhoto = { ...currentRecipe, photo };
    const validationErrors = await validateRecipe(recipeWithPhoto);

    if (Object.keys(validationErrors).length > 0) {
      dispatch(setValidationErrors(validationErrors));
      setIsSubmitting(false);
      
      scrollToFirstError(validationErrors);
      return;
    }

    try {
      // Upload image to CDN
      let uploadedImageUrl = photoUrl;
      if (photo && photoUploaderRef.current) {
        try {
          uploadedImageUrl = await photoUploaderRef.current.uploadImage();
        } catch (uploadError) {
          console.error("Failed to upload image:", uploadError);
          setIsSubmitting(false);
          return;
        }
      }

      const totalPrepTime =
        (currentRecipe.prepTime.hrs || 0) * 60 +
        (currentRecipe.prepTime.mins || 0);
      const totalCookTime =
        (currentRecipe.cookTime.hrs || 0) * 60 +
        (currentRecipe.cookTime.mins || 0);

      const recipeData: any = {
        title: currentRecipe.title.trim(),
        description: currentRecipe.description.trim(),
      };

      if (currentRecipe.cookTips && currentRecipe.cookTips.trim()) {
        recipeData.cookTips = currentRecipe.cookTips.trim();
      }

      recipeData.prepTime = totalPrepTime;
      recipeData.cookTime = totalCookTime;
      recipeData.servings = Number(currentRecipe.servings);

      if (uploadedImageUrl) {
        recipeData.imageUrl = uploadedImageUrl;
      }

      const validIngredients = currentRecipe.ingredients
        .filter((ing) => ing.name && ing.name.trim() !== "")
        .map((ing) => ({
          name: ing.name.trim(),
          quantity:
            (ing.quantity as any) === "Qty" ? 0 : Number(ing.quantity) || 0,
          unit: ing.unit.trim() || "piece",
        }));

      recipeData.ingredients = validIngredients;

      const validInstructions = currentRecipe.instructions
        .filter(
          (instruction) =>
            instruction.description && instruction.description.trim() !== ""
        )
        .map((instruction, index) => ({
          step: index + 1,
          description: instruction.description.trim(),
        }));

      recipeData.instructions = validInstructions;

      const validCategories = currentRecipe.categories
        .filter(
          (category) => category.categoryId && category.categoryId.trim() !== ""
        )
        .map((category) => ({
          categoryId: category.categoryId.trim(),
        }));

      if (validCategories.length > 0) {
        recipeData.categories = validCategories;
      }

      // Call API to create recipe
      const result = await createRecipe(recipeData);

      if (onSubmit) {
        onSubmit(result);
      }

      console.log("Recipe saved successfully:", result);

      // Reset form 
      dispatch(resetForm());
      setPhoto(null);
      setPhotoUrl(null);
      
      // Reset photo uploader to initial state
      if (photoUploaderRef.current) {
        photoUploaderRef.current.reset();
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error saving recipe:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUploaded = (imageUrl: string) => {
    setPhotoUrl(imageUrl);
  };

  const handleCancel = () => {
    dispatch(resetForm());
    setPhoto(null);
    setPhotoUrl(null);
    
    // Reset photo uploader to initial state
    if (photoUploaderRef.current) {
      photoUploaderRef.current.reset();
    }
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToFirstError = (validationErrors: Record<string, string>) => {
    const fieldOrder = [
      'title',
      'description', 
      'servings',
      'prepTime',
      'cookTime',
      'ingredients',
      'instructions',
      'cookTips',
      'categories'
    ];

    for (const field of fieldOrder) {
      if (validationErrors[field]) {
        const inputElement = document.querySelector(`[data-field="${field}"]`) as HTMLElement;
        if (inputElement) {
          inputElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
          setTimeout(() => {
            const focusableElement = inputElement.querySelector('input, textarea, select') as HTMLElement;
            if (focusableElement) {
              focusableElement.focus();
            } else {
              inputElement.focus();
            }
          }, 500);
          return;
        }
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    currentRecipe,
    validationErrors,
    error,
    isSubmitting,
    photo,
    setPhoto,
    photoUrl,
    photoUploaderRef,
    handleFormSubmit,
    handleImageUploaded,
    handleCancel,
    dispatch,
  };
};