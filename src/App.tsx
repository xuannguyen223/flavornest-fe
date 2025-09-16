import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainHeader from "./features/header/components/main-header/MainHeader";
import { Categories } from "./features/header";
import { CATEGORY_DATA } from "./features/header/components/categories/constants";

function App() {
  return (
    <BrowserRouter>
      <>
        <MainHeader />
        <Categories items={CATEGORY_DATA} />
      </>
    </BrowserRouter>
  );
}

export default App;
