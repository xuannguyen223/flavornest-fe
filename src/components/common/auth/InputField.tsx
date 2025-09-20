import { Field, ErrorMessage } from "formik";
import type { InputFieldProps } from "./type/authInterface";

function InputForm<T>({
  name,
  label,
  type = "text",
  placeholder,
  formik,
}: InputFieldProps<T>) {
  return (
    <div className="form-group">
      <label htmlFor={String(name)}>{label}</label>
      <Field
        type={type}
        name={String(name)}
        placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
        className={`form-input ${
          formik.touched[name] && formik.errors[name]
            ? "input-error"
            : "input-valid"
        }`}
      />
      <ErrorMessage
        name={String(name)}
        component="div"
        className="error-message"
      />
    </div>
  );
}

export default InputForm;
