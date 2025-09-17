import { configureStore } from '@reduxjs/toolkit';
import sortReducer from './features/sortSlice';
import recipeReducer from './features/recipeSlice';

export const store = configureStore({
	reducer: {
		recipe: recipeReducer,
		sort: sortReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
