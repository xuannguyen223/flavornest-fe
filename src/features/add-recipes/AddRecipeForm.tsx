import { useRecipeForm } from '../../hooks/useRecipeForm';
import { PhotoUploader } from './PhotoUploader';
import { ReduxInput } from './components/redux/ReduxInput';
import { ReduxServings } from './components/redux/ReduxServings';
import { ReduxTime } from './components/redux/ReduxTime';
import { ReduxIngredient } from './components/redux/ReduxIngredient';
import { ReduxInstruction } from './components/redux/ReduxInstruction';
import { CategorySection } from './components/categories/CategorySection';
import { FormActions } from './FormActions';
import { Button } from '@/components/ui/button';
import { addIngredient, removeIngredient, addStep, removeStep, updateCategories } from '@/store/features/recipeSlice';
import type { RecipeFormData } from '@/store/features/recipeSlice';

interface AddRecipeFormProps {
  defaultValues?: Partial<RecipeFormData>;
  onSubmit?: (result: any) => void;
}

export const AddRecipeForm = ({ defaultValues, onSubmit }: AddRecipeFormProps) => {
  const {
    currentRecipe,
    validationErrors,
    error,
    isSubmitting,
    photo,
    setPhoto,
    photoUploaderRef,
    handleFormSubmit,
    handleImageUploaded,
    handleCancel,
    dispatch,
  } = useRecipeForm(defaultValues, onSubmit);

  return (
    <form
      onSubmit={handleFormSubmit}
      className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 xl:px-16"
    >
      {/* Header */}
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        <h1 className="text-center font-cormorant font-semibold text-3xl sm:text-4xl lg:text-5xl xl:text-[48px]">
          Add a Recipe
        </h1>
        <p className="text-base sm:text-lg lg:text-xl xl:text-[22px] text-left text-(--shadow-gray-color)">
          Feeling like a kitchen Picasso? We want to see your masterpiece! Add
          your recipe and show off your culinary creativity.
        </p>
      </div>

      <hr className="text-(--divide-color) my-8 sm:my-12 lg:my-16 xl:my-[60px]" />

      {/* Photo Upload */}
      <PhotoUploader
        ref={photoUploaderRef}
        value={photo}
        onChange={setPhoto}
        onImageUploaded={handleImageUploaded}
      />

      {/* Recipe Details */}
      <div className="space-y-6">
        {/* Recipe Title */}
        <ReduxInput
          field="title"
          label="Recipe Title"
          placeholder="Enter your recipe title"
          required
        />

        {/* Description */}
        <ReduxInput
          field="description"
          label="Description"
          placeholder="Describe your recipe in a way that makes mouths water."
          as="textarea"
          inputClassName="h-32 sm:h-40 lg:h-48 xl:h-[230px] placeholder:text-(--light-gray-color) text-(--primary-color) text-base sm:text-lg lg:text-xl xl:text-[20px] border-1 border-solid border-(--border-color) rounded-[10px]"
          rows={4}
          required
        />
      </div>

      <hr className="text-(--divide-color) my-8 sm:my-12 lg:my-16 xl:my-[60px]" />

      <div className="space-y-6">
        {/* Servings */}
        <ReduxServings
          field="servings"
          label="Servings"
          placeholder="e.g., 4"
          min={1}
          inputClassName="w-48 sm:w-64 lg:w-80 xl:w-[288px] h-12 sm:h-14 lg:h-16 xl:h-[68px] placeholder:text-(--light-gray-color) text-(--primary-color) text-base sm:text-lg lg:text-xl xl:text-[20px] border-1 border-solid border-(--border-color) rounded-[10px]"
          required
        />

        {/* Prep Time */}
        <ReduxTime field="prepTime" label="Prep Time" required />

        {/* Cook Time */}
        <ReduxTime field="cookTime" label="Cook Time" required />
      </div>

      <hr className="text-(--divide-color) my-8 sm:my-12 lg:my-16 xl:my-[60px]" />

      {/* Ingredients */}
      <div data-field="ingredients" className="space-y-4">
        <h2 className="flex font-medium text-lg sm:text-xl lg:text-2xl xl:text-[24px]">
          Ingredients
          <span className="text-(--required-color)">&nbsp;*</span>
        </h2>
        <p className="text-base sm:text-lg lg:text-xl xl:text-[22px] text-left text-(--shadow-gray-color)">
          List one ingredient per line, specifying quantities (1, 2),
          measurements (cups, spoons), and any prep details (chopped, sifted)
          along with the item. Let your creativity flow in every detail!
        </p>

        <div className="space-y-3">
          {currentRecipe.ingredients.map((ingredient) => (
            <ReduxIngredient
              key={ingredient.id}
              ingredient={ingredient}
              onRemove={() => dispatch(removeIngredient(ingredient.id.toString()))}
            />
          ))}
        </div>

        <Button
          type="button"
          variant="default"
          onClick={() => dispatch(addIngredient())}
          className="block w-full font-medium text-lg sm:text-xl lg:text-2xl xl:text-[24px] text-left"
        >
          + Add ingredient
        </Button>

        {validationErrors.ingredients && (
          <p className="text-sm text-red-500">{validationErrors.ingredients}</p>
        )}
      </div>

      <hr className="text-(--divide-color) my-8 sm:my-12 lg:my-16 xl:my-[60px]" />

      {/* Instructions */}
      <div data-field="instructions" className="space-y-4">
        <h2 className="flex font-medium text-lg sm:text-xl lg:text-2xl xl:text-[24px]">
          Instructions
          <span className="text-(--required-color)">&nbsp;*</span>
        </h2>
        <p className="text-base sm:text-lg lg:text-xl xl:text-[22px] text-left text-(--shadow-gray-color)">
          Break down your recipe into clear, step-by-step instructions.
        </p>

        <div className="space-y-4">
          {currentRecipe.instructions.map((instruction) => (
            <ReduxInstruction
              key={instruction.id}
              step={instruction}
              stepNumber={instruction.step}
              onRemove={() => dispatch(removeStep(instruction.id.toString()))}
            />
          ))}
        </div>

        <Button
          type="button"
          variant="default"
          onClick={() => dispatch(addStep())}
          className="block w-full font-medium text-lg sm:text-xl lg:text-2xl xl:text-[24px] text-left"
        >
          + Add step
        </Button>

        {validationErrors.instructions && (
          <p className="text-sm text-red-500">
            {validationErrors.instructions}
          </p>
        )}
      </div>

      <hr className="text-(--divide-color) my-8 sm:my-12 lg:my-16 xl:my-[60px]" />

      {/* Cook's Tips */}
      <ReduxInput
        field="cookTips"
        label="Cook's Tips"
        placeholder="Share your kitchen secrets! Oven hacks, swaps, or any tips for ultimate recipe success."
        as="textarea"
        inputClassName="h-[230px] placeholder:text-(--light-gray-color) text-(--primary-color) text-base sm:text-lg lg:text-xl xl:text-[20px] border-1 border-solid border-(--border-color) rounded-[10px]"
        rows={4}
      />

      <hr className="text-(--divide-color) my-8 sm:my-12 lg:my-16 xl:my-[60px]" />

      {/* Categories */}
      <div data-field="categories">
        <CategorySection
          value={currentRecipe.categories}
          onChange={(updates) => dispatch(updateCategories(updates))}
          errors={undefined}
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Form Actions */}
      <FormActions 
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />

      <hr className="text-(--divide-color) my-6 sm:my-8 lg:my-10 xl:my-[40px]" />

      {/* Footer */}
      <div className="space-y-2">
        <p className="font-italic text-sm sm:text-base lg:text-lg xl:text-[17px] text-left text-(--shadow-gray-color)">
          If you've come across this recipe in a magazine, cookbook, or on
          another website, we're unable to publish it here. Our platform thrives
          on originality, and published recipes must adhere to our Terms of
          Service. Let's keep the kitchen creativity flowing with your unique
          recipes.
        </p>
      </div>
    </form>
  );
};