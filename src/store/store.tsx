import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/testSlice";
import recipeReducer from "./features/recipeSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    recipe: recipeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
