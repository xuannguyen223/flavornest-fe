import { configureStore } from '@reduxjs/toolkit';
import sortReducer from './features/sortSlice';
import recipeReducer from './features/recipeSlice';
import recipeAPIReducer from './features/recipeAPISlice';
import authReducer from './features/authSlice';

export const store = configureStore({
	reducer: {
		recipe: recipeReducer,
		sort: sortReducer,
		recipeAPI: recipeAPIReducer,
		auth: authReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
