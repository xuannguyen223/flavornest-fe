import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  redirectPath: "/",
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    handleLoading(state, action) {
      state.loading = action.payload;
    },
    handleIsLogin(state, action) {
      state.isAuthenticated = action.payload;
    },
    handleRedirectPath(state, action) {
      state.redirectPath = action.payload;
    },
  },
});

export const { handleLoading, handleIsLogin, handleRedirectPath } =
  loginSlice.actions;

export default loginSlice.reducer;
