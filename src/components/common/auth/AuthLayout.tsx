import "./style.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthLeft from "./AuthLeft";
import AuthRight from "./AuthRight";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { checkLogin } from "@/store/features/login/loginAction";

const AuthLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const isSignUpPage = location.pathname === "/signup";
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.loginSlice
  );

  useEffect(() => {
    dispatch(checkLogin());
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleClose = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div className="auth-layout">
        <div className="auth-container">
          <AuthLeft isSignUpPage={isSignUpPage} />
          <AuthRight isSignUpPage={isSignUpPage} handleClose={handleClose} />
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

export default AuthLayout;
