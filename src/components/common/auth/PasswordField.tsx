// InputForm.tsx
import { Field, ErrorMessage } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import type { InputFieldProps } from "./type/authInterface";

function InputPasswordField<T>({
  name,
  label,
  type = "text",
  placeholder,
  formik,
}: InputFieldProps<T>) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="form-group">
      <label htmlFor={String(name)}>{label}</label>
      <div className="flex items-center">
        <Field
          type={isPassword ? (passwordVisible ? "text" : "password") : type}
          name={String(name)}
          placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
          className={`form-input ${
            formik.touched[name] && formik.errors[name]
              ? "input-error"
              : "input-valid"
          }`}
        />
        {isPassword && (
          <button
            type="button"
            className="ml-2 btn-show-password"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
      <ErrorMessage
        name={String(name)}
        component="div"
        className="error-message"
      />
    </div>
  );
}

export default InputPasswordField;
