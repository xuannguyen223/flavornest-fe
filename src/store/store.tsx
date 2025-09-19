import { configureStore } from "@reduxjs/toolkit";
import sortReducer from "./features/sortSlice";
import recipeReducer from "./features/recipeSlice";
import recipeAPIReducer from "./features/recipeAPISlice";
import authReducer from "./features/authSlice";
import categoryReducer from "./features/categorySlice";
import signupSlice from "./features/signup/signupSlice";
import loginSlice from "./features/login/loginSlice";

export const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    sort: sortReducer,
    recipeAPI: recipeAPIReducer,
    auth: authReducer,
    category: categoryReducer,
    signupSlice,
    loginSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
