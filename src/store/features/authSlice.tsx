import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginService } from "@/services/auth.service";

// Chưa hoàn thiện
// Chỉ build tạm để auto login cho User Submit Rating
export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  userId: any | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  userId: null,
};

// Thunk
export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const data = await loginService(email, password);
      return data; // { ok: true, message: "Login successful.", 
        // data: { id "cmfq6o3gv0000v6wsas89tnf8", email: "johncole2@example.com" } }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.userId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.userId = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.data;
        state.userId = action.payload.data.id;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.userId = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;


