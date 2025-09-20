import axiosInstance from "@/services/axiosInstance";
import { clearUserProfile } from "./userSlice";
import type { Dispatch } from "redux";
import { LOGOUT_API } from "@/utils/constants";

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
