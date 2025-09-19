import { useFormik, FormikProvider } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { loginValidationSchema } from "../../components/common/auth/utils/validation";
import InputForm from "@/components/common/auth/InputField";
import type { LoginFormValues } from "@/components/common/auth/type/authInterface";
import InputPasswordField from "@/components/common/auth/PasswordField";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { handleLoading } from "@/store/features/login/loginSlice";
import { handleLoginAction } from "@/store/features/login/loginAction";
import { toast } from "react-toastify";
import SubmitButton from "@/components/common/auth/SubmitButton";

const LoginPage = () => {
  const submitLoading = useSelector(
    (state: RootState) => state.loginSlice.loading
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      dispatch(handleLoading(true));
      const success = await dispatch(handleLoginAction(values));
      if (success) {
        toast.info("You will be redirected to the Homepage !");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    },
  });

  return (
    <div className="register">
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-[4%]">
            {/* email */}
            <InputForm<LoginFormValues>
              name="email"
              label="E-mail Address"
              type="email"
              formik={formik}
            />
            {/* password */}
            <InputPasswordField<LoginFormValues>
              name="password"
              label="Password"
              type="password"
              formik={formik}
            />
          </div>

          <SubmitButton submitLoading={submitLoading} text="Login" />
        </form>
      </FormikProvider>

      {/* navigate */}
      <div className="navigate">
        Don't have an account?
        <Link to="/signup" className="text-gray-600 hover:underline ml-1">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
