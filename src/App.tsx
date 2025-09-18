import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainLayout from './components/common/MainLayout';
import HomePage from './features/home/HomePage';
import AboutUsPage from './features/about-us/AboutUsPage';
import RecipeListPage from './features/list-recipes/RecipeListPage';
import RecipeDetailPage from './features/recipe-detail/RecipeDetailPage';
import AddRecipesPage from './features/add-recipes/AddRecipesPage';
import MyProfilePage from './features/my-profile/MyProfilePage';

function App() {
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
                    <Route 
                        path="/my-profile/*" 
                        element={<MyProfilePage />} 
                    />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
