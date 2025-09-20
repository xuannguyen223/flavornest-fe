import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const signupSlice = createSlice({
  name: "signupSlice",
  initialState,
  reducers: {
    handleLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { handleLoading } = signupSlice.actions;

export default signupSlice.reducer;
