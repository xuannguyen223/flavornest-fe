import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // dùng localStorage
import { combineReducers } from 'redux';

import sortReducer from './features/sortSlice';
import recipeReducer from './features/recipeSlice';
import recipeAPIReducer from './features/recipeAPISlice';
import categoryReducer from './features/categorySlice';
import signupSlice from './features/signup/signupSlice';
import loginSlice from './features/login/loginSlice';
import userSlice from './features/user/userSlice';

const rootReducer = combineReducers({
	recipe: recipeReducer,
	sort: sortReducer,
	recipeAPI: recipeAPIReducer,
	category: categoryReducer,
	signupSlice,
	loginSlice,
	userSlice,
});

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['loginSlice', 'userSlice'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
