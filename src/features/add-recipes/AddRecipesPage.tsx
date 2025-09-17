import { AddRecipeForm } from './AddRecipeForm';
import './style.css';

function onSubmit(data: unknown) {
	// handle form submission here
	console.log('Form submitted:', data);
}

const AddRecipesPage = () => {
	return (
		<div className="max-w-[80%] mx-auto px-4 py-8 sm:px-6 lg:px-8">
			<AddRecipeForm onSubmit={onSubmit} />
		</div>
	);
};

export default AddRecipesPage;
