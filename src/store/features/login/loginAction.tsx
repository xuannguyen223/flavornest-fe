import axiosInstance from "@/services/axiosInstance";
import { handleIsLogin, handleLoading } from "./loginSlice";
import {
  LOGIN_API,
  REFRESH_TOKEN_API,
  USER_ID,
  USER_PROFILE_API,
} from "@/utils/constants";
import type { LoginFormValues } from "@/components/common/auth/type/authInterface";
import type { Dispatch } from "redux";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { setUserProfile } from "../user/userSlice";

const preparePayloadForRegister = (data: {
  email: string;
  password: string;
}) => {
  const { email, password } = data;
  return {
    email: email.trim(),
    password: password.trim(),
  };
};

export const handleLoginAction = (data: LoginFormValues) => {
  return async (dispatch: Dispatch) => {
    dispatch(handleLoading(true));
    const payload = preparePayloadForRegister(data);

    try {
      const response = await axiosInstance.post(LOGIN_API, payload);
      console.log("response id: ", response.data.data.id);
      console.log("response ", response);
      if (response.status === 200) {
        const userID = response.data.data.id;
        localStorage.setItem(USER_ID, userID);
        toast.success(response?.data?.message || "Login successful !");
        return true; // use to navigate
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "Login failed !");
      return false; // use to navigate
    } finally {
      dispatch(handleLoading(false));
    }
  };
};

// Hàm này được gọi ở các layout chính (MainLayout, AuthLayout) để kiểm tra trạng thái đăng nhập
// Dựa vào kết quả trả về để điều hướng hoặc lấy thông tin user
export const checkLogin = (authMode: boolean = false) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.post(REFRESH_TOKEN_API);
      if (response.status === 200) {
        dispatch(handleIsLogin(true));
        if (!authMode) {
          const userID = localStorage.getItem(USER_ID);
          const profileResponse = await axiosInstance.get(
            `${USER_PROFILE_API}/${userID}`
          );
          if (profileResponse.status === 200) {
            dispatch(setUserProfile(profileResponse.data.data));
          } else {
            console.warn("No userID found in localStorage");
          }
        }
      }
    } catch (error) {
      console.log("error: ", error);
      dispatch(handleIsLogin(false));
    }
  };
};
