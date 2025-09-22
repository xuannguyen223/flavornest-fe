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
import {
	addIngredient,
	removeIngredient,
	addStep,
	removeStep,
	updateCategories,
} from '@/store/features/recipeSlice';
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
			className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 xl:px-16">
			{/* Header */}
			<div className="space-y-2 sm:space-y-2 lg:space-y-4">
				<h1 className="text-center font-cormorant font-semibold text-3xl sm:text-4xl lg:text-5xl xl:text-[48px]">
					Add a Recipe
				</h1>
				<p className="text-center text-sm sm:text-base lg:text-lg xl:text-xl text-(--shadow-gray-color)">
					Feeling like a kitchen Picasso? <br />
					We want to see your masterpiece!
					<br />
					Add your recipe and show off your culinary creativity.
				</p>
			</div>

			<hr className="text-(--divide-color) my-6 sm:my-6 lg:my-12 xl:my-10" />

			{/* Photo Upload */}
			<div
				data-field="photo"
				className="space-y-2">
				<PhotoUploader
					ref={photoUploaderRef}
					value={photo}
					onChange={setPhoto}
					onImageUploaded={handleImageUploaded}
				/>
				{validationErrors.photo && <p className="text-sm text-red-500">{validationErrors.photo}</p>}
			</div>

			{/* Recipe Details */}
			<div className="space-y-6">
				{/* Recipe Title */}
				<ReduxInput
					field="title"
					label="Recipe Title"
					placeholder="Enter your recipe title"
					required
					inputClassName="text-xs sm:text-sm lg:text-base xl:text-lg"
				/>

				{/* Description */}
				<ReduxInput
					field="description"
					label="Description"
					placeholder="Describe your recipe in a way that makes mouths water."
					as="textarea"
					inputClassName="h-28 sm:h-32 lg:h-40 xl:h-48 placeholder:text-(--light-gray-color) text-(--primary-color) text-xs sm:text-sm lg:text-base xl:text-lg border-1 border-solid border-(--border-color) rounded-[10px]"
					rows={4}
					required
				/>
			</div>

			<hr className="text-(--divide-color) my-6 sm:my-6 lg:my-12 xl:my-10" />

			<div className="space-y-6">
				{/* Servings */}
				<ReduxServings
					field="servings"
					label="Servings"
					placeholder="e.g., 4"
					min={1}
					inputClassName="w-48 sm:w-64 lg:w-80 xl:w-[288px] h-8 sm:h-8 lg:h-10 xl:h-14 placeholder:text-(--light-gray-color) text-(--primary-color) text-xs sm:text-sm lg:text-base xl:text-lg border-1 border-solid border-(--border-color) rounded-[10px]"
					required
				/>

				{/* Prep Time */}
				<ReduxTime
					field="prepTime"
					label="Prep Time"
					required
				/>

				{/* Cook Time */}
				<ReduxTime
					field="cookTime"
					label="Cook Time"
					required
				/>
			</div>

			<hr className="text-(--divide-color) my-6 sm:my-6 lg:my-12 xl:my-10" />

			{/* Ingredients */}
			<div
				data-field="ingredients"
				className="space-y-4">
				<h2 className="flex font-medium text-sm sm:text-base lg:text-lg xl:text-xl">
					Ingredients
					<span className="text-(--required-color)">&nbsp;*</span>
				</h2>
				<p className="text-xs sm:text-sm lg:text-base xl:text-lgtext-left text-(--shadow-gray-color)">
					List one ingredient per line, specifying quantities (1, 2), measurements (cups, spoons),
					and any prep details (chopped, sifted) along with the item. Let your creativity flow in
					every detail!
				</p>

				<div className="space-y-3">
					{currentRecipe.ingredients.map(ingredient => (
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
					className="w-fit font-medium text-sm sm:text-base lg:text-lg xl:text-xl text-left cursor-pointer">
					+ Add ingredient
				</Button>

				{validationErrors.ingredients && (
					<p className="text-sm text-red-500">{validationErrors.ingredients}</p>
				)}
			</div>

			<hr className="text-(--divide-color) my-6 sm:my-6 lg:my-12 xl:my-10" />

			{/* Instructions */}
			<div
				data-field="instructions"
				className="space-y-4">
				<h2 className="flex font-medium text-sm sm:text-base lg:text-lg xl:text-xl">
					Instructions
					<span className="text-(--required-color)">&nbsp;*</span>
				</h2>
				<p className="text-xs sm:text-sm lg:text-base xl:text-lgtext-left text-(--shadow-gray-color)">
					Break down your recipe into clear, step-by-step instructions.
				</p>

				<div className="space-y-4">
					{currentRecipe.instructions.map(instruction => (
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
					className="w-fit font-medium text-sm sm:text-base lg:text-lg xl:text-xl text-left cursor-pointer">
					+ Add step
				</Button>

				{validationErrors.instructions && (
					<p className="text-sm text-red-500">{validationErrors.instructions}</p>
				)}
			</div>

			<hr className="text-(--divide-color) my-6 sm:my-6 lg:my-12 xl:my-10" />

			{/* Cook's Tips */}
			<ReduxInput
				field="cookTips"
				label="Cook's Tips"
				placeholder="Share your kitchen secrets! Oven hacks, swaps, or any tips for ultimate recipe success."
				as="textarea"
				inputClassName="h-[230px] placeholder:text-(--light-gray-color) text-(--primary-color) text-xs sm:text-sm lg:text-base xl:text-lg border-1 border-solid border-(--border-color) rounded-[10px]"
				rows={4}
			/>

			<hr className="text-(--divide-color) my-6 sm:my-6 lg:my-12 xl:my-10" />

			{/* Categories */}
			<div data-field="categories">
				<CategorySection
					value={currentRecipe.categories}
					onChange={updates => dispatch(updateCategories(updates))}
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

			<hr className="text-(--divide-color) my-6 sm:my-6 lg:my-12 xl:my-10" />

			{/* Footer */}
			<div className="space-y-2">
				<p
					className="italic text-xs sm:text-sm lg:text-base xl:text-base text-left text-(--shadow-gray-color)">
					If you've come across this recipe in a magazine, cookbook, or on another website, we're
					unable to publish it here. Our platform thrives on originality, and published recipes must
					adhere to our Terms of Service. Let's keep the kitchen creativity flowing with your unique
					recipes.
				</p>
			</div>
		</form>
	);
};
