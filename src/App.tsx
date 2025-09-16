import "./App.css";
import { Counter } from "./features/example-1/Counter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddRecipes from "./features/add-recipes/AddRecipes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* TODO Add more routes here */}
        <Route path="/counter-page" element={<Counter />} />
      </Routes>
      <>
        <AddRecipes />
      </>
    </BrowserRouter>
  );
}

export default App;
