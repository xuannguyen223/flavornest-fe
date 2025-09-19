import { type FormikProps } from "formik";

export interface InputFieldProps<T> {
  name: keyof T;
  label: string;
  type?: string;
  placeholder?: string;
  formik: FormikProps<T>;
}

export interface SignupFormValues {
  fullname: string;
  email: string;
  password: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SubmitButtonProps {
  submitLoading: boolean;
  text: string;
}
