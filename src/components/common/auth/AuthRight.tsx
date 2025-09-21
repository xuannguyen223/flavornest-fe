import { Outlet } from "react-router-dom";
import AuthLogo from "./AuthLogo";
import { GoogleButtonContent } from "./GoogleBtnContent";

const AuthRight = ({
  isSignUpPage,
  handleClose,
}: {
  isSignUpPage: boolean;
  handleClose: () => void;
}) => {
  return (
    <div className="auth-main">
      <div className="auth-main-container">
        {/* Header */}
        <div className="header">
          <div className="auth-logo">
            <AuthLogo />
          </div>
          <button className="auth-close-button" onClick={handleClose}>
            <svg
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.0391 23.04L48.9591 48.96M48.9591 23.04L23.0391 48.96"
                stroke="#1D1D1D"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Title */}
        <h1 className="title">
          {isSignUpPage ? "Create an Account" : "Login"}
        </h1>

        {/* Social Login */}
        <div className="social-login">
          <button className="button-google">
            <GoogleButtonContent />
          </button>
        </div>

        {/* Divider */}
        <div className="divider">
          <div></div>
          <span>OR</span>
          <div></div>
        </div>

        {/* Placeholder Form */}
        <div className="form">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthRight;
