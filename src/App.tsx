import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import MainLayout from './components/common/MainLayout';
import HomePage from './features/home/HomePage';
import AboutUsPage from './features/about-us/AboutUsPage';
import RecipeListPage from './features/list-recipes/RecipeListPage';
import RecipeDetailPage from './features/recipe-detail/RecipeDetailPage';
import AddRecipesPage from './features/add-recipes/AddRecipesPage';

import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { loginThunk } from './store/features/authSlice';

function App() {
	// auto Login use for testing use submit review
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(
		  loginThunk({
			email: "johncole2@example.com",
			password: "@StrongPass9999",
		  })
		)
		  .unwrap()
		  .then(() => console.log("✅ Auto login success"))
		  .catch((err) => console.error("❌ Auto login failed", err));
	}, [dispatch]);
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MainLayout />}>
					<Route
						path="/"
						element={<HomePage />}
					/>
					<Route
						path="/recipes"
						element={<RecipeListPage />}
					/>
					<Route
						path="/recipes/:recipeId"
						element={<RecipeDetailPage />}
					/>
					<Route
						path="/recipes/:category"
						element={<RecipeDetailPage />}
					/>
					<Route
						path="/add-recipe"
						element={<AddRecipesPage />}
					/>
					<Route
						path="/about"
						element={<AboutUsPage />}
					/>
				</Route>
			</Routes>
			<ToastContainer position="top-right" autoClose={2000} />
		</BrowserRouter>
	);
}

export default App;
