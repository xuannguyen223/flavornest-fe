import authImage from "../../../assets/images/auth/auth-image.jpg";

const AuthLeft = ({ isSignUpPage }: { isSignUpPage: boolean }) => {
  return (
    <div
      className="auth-banner"
      style={{ backgroundImage: `url(${authImage})` }}
    >
      {isSignUpPage && (
        <>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
          {/* Text content */}
          <div className="signup-content">
            <h1>
              Embark on a <br /> culinary journey <br /> with us! <br /> Sign up
              to unlock <br /> a world of <br /> delicious recipes, <br /> and
              personalized <br /> cooking <br /> experiences.
            </h1>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthLeft;
