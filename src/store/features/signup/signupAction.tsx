import axiosInstance from "@/services/axiosInstance";
import { handleLoading } from "./signupSlice";
import { REGISTER_API } from "@/utils/constants";
import type { SignupFormValues } from "@/components/common/auth/type/authInterface";
import type { Dispatch } from "redux";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

// Clean & format input data
const preparePayloadForRegister = (data: {
  fullname: string;
  email: string;
  password: string;
}) => {
  const { fullname, email, password } = data;
  return {
    fullname: fullname.trim(),
    email: email.trim(),
    password: password.trim(),
  };
};

export const handleRegisterAction = (data: SignupFormValues) => {
  return async (dispatch: Dispatch) => {
    dispatch(handleLoading(true));
    const payload = preparePayloadForRegister(data);

    try {
      const response = await axiosInstance.post(REGISTER_API, payload);
      if (response.status === 200) {
        toast.success(response?.data?.message || "Registration successful !");
        return true; // use to navigate
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError.response?.data?.message || "Registration failed !"
      );
      return false; // use to navigate
    } finally {
      dispatch(handleLoading(false));
    }
  };
};
