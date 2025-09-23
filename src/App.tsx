import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ToastContainer } from 'react-toastify';

import MainLayout from './components/common/MainLayout';
import AuthLayout from './components/common/auth/AuthLayout';
import HomePage from './features/home/HomePage';
import RecipeListPage from './features/list-recipes/RecipeListPage';
import RecipeDetailPage from './features/recipe-detail/RecipeDetailPage';
import AddRecipesPage from './features/add-recipes/AddRecipesPage';
import AboutUsPage from './features/about-us/AboutUsPage';
import MyProfilePage from './features/my-profile/MyProfilePage';
import EditProfileSection from './features/my-profile/components/sections/EditProfileSection';
import AccountSettingsSection from './features/my-profile/components/sections/AccountSettingsSection';
import MyRecipesSection from './features/my-profile/components/sections/MyRecipesSection';
import FavoriteRecipesSection from './features/my-profile/components/sections/FavoriteRecipesSection';
import SignupPage from './features/signup/SignupPage';
import NotFoundPage from './features/not-found/NotFoundPage';
import LoginPage from './features/login/LoginPage';

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
						path="/my-profile"
						element={<MyProfilePage />}>
						<Route
							path="edit-profile"
							element={<EditProfileSection />}
						/>
						<Route
							path="account-settings"
							element={<AccountSettingsSection />}
						/>
						<Route
							path="my-recipes"
							element={<MyRecipesSection />}
						/>
						<Route
							path="saved-recipes"
							element={<FavoriteRecipesSection />}
						/>
					</Route>
				</Route>
				<Route element={<AuthLayout />}>
					<Route
						path="/signup"
						element={<SignupPage />}
					/>
					<Route
						path="/login"
						element={<LoginPage />}
					/>
				</Route>
				<Route
					path="*"
					element={<NotFoundPage />}
				/>
			</Routes>
			<ToastContainer
				position="top-right"
				autoClose={1000}
			/>
		</BrowserRouter>
	);
}

export default App;
