import axiosInstance from "@/services/axiosInstance";
import { clearUserProfile } from "./userSlice";
import type { Dispatch } from "redux";
import {
  CREATE_IMG_URL_API,
  LOGOUT_API,
  UPDATE_USER_PROFILE_API,
  USER_ID,
} from "@/utils/constants";
import axios from "axios";
import { uploadImageToCDN } from "@/utils/CdnUtil";

export const handleLogOutFromBE = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.post(LOGOUT_API);
      console.log("response ", response);
      if (response.status === 200) {
        dispatch(clearUserProfile());
      }
    } catch (error) {
      console.error("Error clear user profile:", error);
    }
  };
};

export const handleUpdateUserProfile = (profile, fileImage) => {
  return async (dispatch: Dispatch) => {
    // console.log("profile: ", profile);
    try {
      profile.avatarUrl = await uploadImageToCDN(fileImage);
      console.log("profile.avatarUrl: ", profile.avatarUrl);
      const userID = localStorage.getItem(USER_ID);
      const updatedProfile = await axiosInstance.put(
        `${UPDATE_USER_PROFILE_API}/${userID}`,
        profile
      );
      console.log("updatedProfile: ", updatedProfile);
    } catch (error) {
      console.error("Error update user profile:", error);
    }
  };
};
