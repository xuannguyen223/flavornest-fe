import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	isAuthenticated: false,
};

const loginSlice = createSlice({
	name: 'loginSlice',
	initialState,
	reducers: {
		handleLoading(state, action) {
			state.loading = action.payload;
		},
		handleIsLogin(state, action) {
			state.isAuthenticated = action.payload;
		},
	},
});

export const { handleLoading, handleIsLogin } = loginSlice.actions;

export default loginSlice.reducer;
