import { useFormik, FormikProvider } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { registerValidationSchema } from "../../components/common/auth/utils/validation";
import InputForm from "@/components/common/auth/InputField";
import type { SignupFormValues } from "@/components/common/auth/type/authInterface";
import InputPasswordField from "@/components/common/auth/PasswordField";
import { useDispatch, useSelector } from "react-redux";
import { handleLoading } from "@/store/features/signup/signupSlice";
import { handleRegisterAction } from "@/store/features/signup/signupAction";
import type { AppDispatch, RootState } from "@/store/store";
import { toast } from "react-toastify";
import SubmitButton from "@/components/common/auth/SubmitButton";

const SignupPage = () => {
  const submitLoading = useSelector(
    (state: RootState) => state.signupSlice.loading
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const formik = useFormik<SignupFormValues>({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      dispatch(handleLoading(true));
      const success = await dispatch(handleRegisterAction(values));
      if (success) {
        formik.resetForm();
        toast.info("You will be redirected to the Login page !");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    },
  });

  return (
    <div className="login">
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-[4%]">
            {/* username */}
            <InputForm<SignupFormValues>
              name="fullname"
              label="Full Name"
              type="text"
              formik={formik}
            />
            {/* email */}
            <InputForm<SignupFormValues>
              name="email"
              label="E-mail Address"
              type="email"
              formik={formik}
            />
            {/* password */}
            <InputPasswordField<SignupFormValues>
              name="password"
              label="Password"
              type="password"
              formik={formik}
            />
          </div>

          <SubmitButton submitLoading={submitLoading} text="Create Account" />
        </form>
      </FormikProvider>

      {/* navigate */}
      <div className="navigate">
        Already have an account?
        <Link to="/login" className="text-gray-600 hover:underline ml-1">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
