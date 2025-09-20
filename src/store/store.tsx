import { configureStore } from "@reduxjs/toolkit";
import sortReducer from "./features/sortSlice";
import recipeReducer from "./features/recipeSlice";
import recipeAPIReducer from "./features/recipeAPISlice";
import categoryReducer from "./features/categorySlice";
import signupSlice from "./features/signup/signupSlice";
import loginSlice from "./features/login/loginSlice";
import userSlice from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    sort: sortReducer,
    recipeAPI: recipeAPIReducer,
    category: categoryReducer,
    signupSlice,
    loginSlice,
    userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
