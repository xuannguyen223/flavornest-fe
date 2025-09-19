import axiosInstance from "@/services/axiosInstance";
import { handleIsLogin, handleLoading } from "./loginSlice";
import { LOGIN_API, REFRESH_TOKEN_API } from "@/utils/constants";
import type { LoginFormValues } from "@/components/common/auth/type/authInterface";
import type { Dispatch } from "redux";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

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
      if (response.status === 200) {
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

export const checkLogin = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.post(REFRESH_TOKEN_API);
      if (response.status === 200) {
        dispatch(handleIsLogin(true));
      }
    } catch (error) {
      console.log("error: ", error);
      dispatch(handleIsLogin(false));
    }
  };
};
