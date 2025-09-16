import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Counter } from "./features/example-1/Counter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainHeader from "./features/header/components/main-header/MainHeader";
import { Categories } from "./features/header";
import { CATEGORY_DATA } from "./features/header/components/categories/constants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* TODO Add more routes here */}
        <Route path="/counter-page" element={<Counter />} />
      </Routes>
      <>
        <MainHeader />
        <Categories items={CATEGORY_DATA} />
      </>
    </BrowserRouter>
  );
}

export default App;
