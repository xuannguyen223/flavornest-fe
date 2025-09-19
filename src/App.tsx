import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";

import MainLayout from "./components/common/MainLayout";
import HomePage from "./features/home/HomePage";
import AboutUsPage from "./features/about-us/AboutUsPage";
import RecipeListPage from "./features/list-recipes/RecipeListPage";
import RecipeDetailPage from "./features/recipe-detail/RecipeDetailPage";
import AddRecipesPage from "./features/add-recipes/AddRecipesPage";
import MyProfilePage from "./features/my-profile/MyProfilePage";
import EditProfileSection from "./features/my-profile/components/sections/EditProfileSection";
import AccountSettingsSection from "./features/my-profile/components/sections/AccountSettingsSection";
import MyRecipesSection from "./features/my-profile/components/sections/MyRecipesSection";
import AuthLayout from "./components/common/auth/AuthLayout";
import SignupPage from "./features/signup/SignupPage";
import LoginPage from "./features/login/LoginPage";

import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { loginThunk } from "./store/features/authSlice";
import FavoriteRecipesSection from "./features/my-profile/components/sections/FavoriteRecipesSection";

function App() {
  // auto Login use for testing use submit review
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      loginThunk({
        email: "johncole10@example.com",
        password: "@StrongPass8888",
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
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<RecipeListPage />} />
          <Route path="/recipes/:recipeId" element={<RecipeDetailPage />} />
          <Route path="/recipes/:category" element={<RecipeDetailPage />} />
          <Route path="/add-recipe" element={<AddRecipesPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/my-profile" element={<MyProfilePage />}>
            <Route path="edit-profile" element={<EditProfileSection />} />
            <Route
              path="account-settings"
              element={<AccountSettingsSection />}
            />
            <Route path="my-recipes" element={<MyRecipesSection />} />
            <Route
              path="favorite-recipes"
              element={<FavoriteRecipesSection />}
            />
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
