import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";

import MainLayout from "./components/common/MainLayout";
import AuthLayout from "./components/common/auth/AuthLayout";
import { lazy } from "react";
import SuspenseWrapper from "./features/not-found/SuspenseWrapper";

const Home = lazy(() => import("./features/home/HomePage"));
const AboutUs = lazy(() => import("./features/about-us/AboutUsPage"));
const RecipeList = lazy(() => import("./features/list-recipes/RecipeListPage"));
const RecipeDetail = lazy(
  () => import("./features/recipe-detail/RecipeDetailPage")
);
const AddRecipes = lazy(() => import("./features/add-recipes/AddRecipesPage"));
const MyProfile = lazy(() => import("./features/my-profile/MyProfilePage"));
const EditProfile = lazy(
  () => import("./features/my-profile/components/sections/EditProfileSection")
);
const AccountSettings = lazy(
  () =>
    import("./features/my-profile/components/sections/AccountSettingsSection")
);
const MyRecipes = lazy(
  () => import("./features/my-profile/components/sections/MyRecipesSection")
);
const FavoriteRecipes = lazy(
  () =>
    import("./features/my-profile/components/sections/FavoriteRecipesSection")
);
const NotFound = lazy(() => import("./features/not-found/NotFoundPage"));
const Signup = lazy(() => import("./features/signup/SignupPage"));
const Login = lazy(() => import("./features/login/LoginPage"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <SuspenseWrapper>
                <Home />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/recipes"
            element={
              <SuspenseWrapper>
                <RecipeList />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/recipes/:recipeId"
            element={
              <SuspenseWrapper>
                <RecipeDetail />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/recipes/:category"
            element={
              <SuspenseWrapper>
                <RecipeDetail />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/add-recipe"
            element={
              <SuspenseWrapper>
                <AddRecipes />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/about"
            element={
              <SuspenseWrapper>
                <AboutUs />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/my-profile"
            element={
              <SuspenseWrapper>
                <MyProfile />
              </SuspenseWrapper>
            }
          >
            <Route
              path="edit-profile"
              element={
                <SuspenseWrapper>
                  <EditProfile />
                </SuspenseWrapper>
              }
            />
            <Route
              path="account-settings"
              element={
                <SuspenseWrapper>
                  <AccountSettings />
                </SuspenseWrapper>
              }
            />
            <Route
              path="my-recipes"
              element={
                <SuspenseWrapper>
                  <MyRecipes />
                </SuspenseWrapper>
              }
            />
            <Route
              path="favorite-recipes"
              element={
                <SuspenseWrapper>
                  <FavoriteRecipes />
                </SuspenseWrapper>
              }
            />
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route
            path="/signup"
            element={
              <SuspenseWrapper>
                <Signup />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/login"
            element={
              <SuspenseWrapper>
                <Login />
              </SuspenseWrapper>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <SuspenseWrapper>
              <NotFound />
            </SuspenseWrapper>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={1000} />
    </BrowserRouter>
  );
}

export default App;
