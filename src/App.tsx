import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AddRecipes from "./features/add-recipes/AddRecipes";

function App() {
  return (
    <BrowserRouter>
      <>
        <AddRecipes />
      </>
    </BrowserRouter>
  );
}

export default App;
