import { AddRecipeForm } from "./AddRecipeForm";
import "./style.css";

function onSubmit(data: any) {
  // handle form submission here
  console.log("Form submitted:", data);
}

const AddRecipes = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <AddRecipeForm onSubmit={onSubmit}/>
    </div>
  );
};

export default AddRecipes;
