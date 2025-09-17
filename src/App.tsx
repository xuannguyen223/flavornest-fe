import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecipeDetailPage from "./features/recipe-detail/RecipeDetailPage";
import CategoryPage from "./features/category-page/CategoryPage";
import Footer from "./features/footer/Footer";
import MainLayout from "./components/common/MainLayout";
import AboutUsPage from "./features/about-us/AbouUsPage";
import SearchPage from "./features/search-page/SearchPage";
import RecipeExample from './features/list-recipes/RecipeExample';

function App() {
	return (
	  <BrowserRouter>
	  	<Routes>
			<Route path="/search" element={
				<MainLayout>
					<SearchPage />
				</MainLayout>
			} />
			<Route path="/category/:id" element={
				<MainLayout>
					<CategoryPage />
				</MainLayout>
				} />
			<Route path="/recipes/:id" element={
				<MainLayout>
					<RecipeDetailPage />
				</MainLayout>
				}/>
			<Route path="/about" element={
				<MainLayout>
					<AboutUsPage />
				</MainLayout>
				}/>
		</Routes>
		<Footer />
	  </BrowserRouter>
	);
  }

export default App;