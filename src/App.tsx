import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainLayout from './components/common/MainLayout';
import HomePage from './features/home/HomePage';
import AboutUsPage from './features/about-us/AboutUsPage';
import RecipeListPage from './features/list-recipes/RecipeListPage';
import RecipeDetailPage from './features/recipe-detail/RecipeDetailPage';
import AddRecipesPage from './features/add-recipes/AddRecipesPage';
import MyProfilePage from './features/my-profile/MyProfilePage';
import EditProfileSection from './features/my-profile/components/sections/EditProfileSection';
import AccountSettingsSection from './features/my-profile/components/sections/AccountSettingsSection';
import MyRecipesSection from './features/my-profile/components/sections/MyRecipesSection';

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
                    <Route path="/my-profile" element={<MyProfilePage />}>
                        <Route path="edit-profile" element={<EditProfileSection />} />
                        <Route path="account-settings" element={<AccountSettingsSection />} />
                        <Route path="my-recipes" element={<MyRecipesSection />} />
                        <Route path="saved-recipes" element={<div>...</div>} />
                    </Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;