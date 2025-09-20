import * as Yup from "yup";

export const registerValidationSchema = Yup.object({
  fullname: Yup.string().required("Full name is required!"),
  email: Yup.string()
    .required("Email is required!")
    .email("Invalid email address!"),
  password: Yup.string()
    .required("Password is required!")
    .min(8, "Password must be at least 8 characters!")
    .max(20, "Password must not exceed 20 characters!")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter!")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter!")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character!"
    ),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string().required("Email is required!"),
  password: Yup.string().required("Password is required!"),
});
