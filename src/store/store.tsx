import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/testSlice';
import sortReducer from './features/sortSlice';
import recipeReducer from "./features/recipeSlice";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
    recipe: recipeReducer,
		sort: sortReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;