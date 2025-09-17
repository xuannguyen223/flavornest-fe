import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Counter } from "./features/example-1/Counter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./features/footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* TODO Add more routes here */}
        <Route path="/counter-page" element={<Counter />} />
      </Routes>
      <>
        <div>
          <div className="flex justify-center items-center space-x-4">
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
        </div>
        <h1 className="text-4xl">Vite + React</h1>
        <div className="card text-cyan-500">
          <p>Project init successfully.</p>
          <p>
            Read <code className="text-red-500">DEVELOPMENT-GUIDE.md</code> file
            to learn more about this template.
          </p>
        </div>
        <Counter />
		<Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
