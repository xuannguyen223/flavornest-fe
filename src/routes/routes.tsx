import SuspenseWrapper from "@/features/not-found/components/SuspenseWrapper";
import { lazy } from "react";
import type { RouteProps } from "react-router-dom";

const Home = lazy(() => import("../features/home/HomePage"));
const RecipeList = lazy(
  () => import("../features/list-recipes/RecipeListPage")
);
const RecipeDetail = lazy(
  () => import("../features/recipe-detail/RecipeDetailPage")
);
const AddRecipes = lazy(() => import("../features/add-recipes/AddRecipesPage"));
const AboutUs = lazy(() => import("../features/about-us/AboutUsPage"));
const EditProfile = lazy(
  () => import("../features/my-profile/components/sections/EditProfileSection")
);
const AccountSettings = lazy(
  () =>
    import("../features/my-profile/components/sections/AccountSettingsSection")
);
const MyRecipes = lazy(
  () => import("../features/my-profile/components/sections/MyRecipesSection")
);
const FavoriteRecipes = lazy(
  () =>
    import("../features/my-profile/components/sections/FavoriteRecipesSection")
);
const NotFound = lazy(() => import("../features/not-found/NotFoundPage"));

export const routes: RouteProps[] = [
  {
    path: "/",
    element: (
      <SuspenseWrapper>
        <Home />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/about",
    element: (
      <SuspenseWrapper>
        <AboutUs />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/recipes",
    element: (
      <SuspenseWrapper>
        <RecipeList />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/recipes/:recipeId",
    element: (
      <SuspenseWrapper>
        <RecipeDetail />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/recipes/:category",
    element: (
      <SuspenseWrapper>
        <RecipeDetail />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/add-recipe",
    element: (
      <SuspenseWrapper>
        <AddRecipes />
      </SuspenseWrapper>
    ),
  },
  {
    path: "*",
    element: (
      <SuspenseWrapper>
        <NotFound />
      </SuspenseWrapper>
    ),
  },
];

export const myProfileRoutes: RouteProps[] = [
  {
    path: "edit-profile",
    element: (
      <SuspenseWrapper>
        <EditProfile />
      </SuspenseWrapper>
    ),
  },
  {
    path: "account-settings",
    element: (
      <SuspenseWrapper>
        <AccountSettings />
      </SuspenseWrapper>
    ),
  },
  {
    path: "my-recipes",
    element: (
      <SuspenseWrapper>
        <MyRecipes />
      </SuspenseWrapper>
    ),
  },
  {
    path: "favorite-recipes",
    element: (
      <SuspenseWrapper>
        <FavoriteRecipes />
      </SuspenseWrapper>
    ),
  },
];
