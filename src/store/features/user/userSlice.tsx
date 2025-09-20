import { createSlice } from "@reduxjs/toolkit";

export interface UserProfile {
  age: number | null;
  avatarUrl: string | null;
  bio: string | null;
  gender: string | null;
  id: string;
  name: string;
  userId: string;
  userPreferences: string[];
}

interface UserState {
  profile: UserProfile;
  // Bỏ thêm các interface khác nếu cần
}

const initialState: UserState = {
  profile: {
    age: null,
    avatarUrl: null,
    bio: null,
    gender: null,
    id: "",
    name: "",
    userId: "",
    userPreferences: [],
  },
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearUserProfile: (state) => {
      state.profile = initialState.profile;
    },
  },
});

export const { setUserProfile, clearUserProfile } = userSlice.actions;

export default userSlice.reducer;
