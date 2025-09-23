import Logo from "./Logo";
import NavLinks from "./NavLinks";
import AddRecipeButton from "./action-buttons/AddRecipeButton";
import AuthButton from "./action-buttons/AuthButton";
import UserMenu from "./action-buttons/UserMenu";
import "../../style.css";
import { Categories } from "../categories";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useState } from "react";
import { handleLogOutFromBE } from "@/store/features/user/userAction";
import { toast } from "react-toastify";
import { handleRedirectPath } from "@/store/features/login/loginSlice";

export default function MainHeader() {
  const dispatch = useAppDispatch();
  const categoriesByType = useAppSelector(
    (state) => state.category.categoriesByType
  );
  const isLoggedIn = useAppSelector(
    (state) => state.loginSlice.isAuthenticated
  );

  const userProfile = useAppSelector((state) => state.userSlice.profile);

  const displayName = userProfile.name || "Name";

  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogin = () => {
    navigate("/login");
    dispatch(handleRedirectPath(location.pathname));
  };
  const handleAddRecipes = () => {
    if (isLoggedIn) {
      navigate("/add-recipe");
    } else {
      toast.error("Login or SignUp to add a Recipe!");
      navigate("/login");
      dispatch(handleRedirectPath(location.pathname));
    }
  };
  const handleLogout = () => {
    dispatch(handleLogOutFromBE(navigate));
  };

  // SVG Hamburger
  const HamburgerIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );

  // SVG Close
  const CloseIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  return (
    <header className="w-full header-shadow sticky top-0 z-50 bg-white ">
      <div className="header-container border-b-2 border-[var(--divide-color)]">
        <div className="header-top flex items-center justify-between px-2 sm:px-4 lg:px-0">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* NavLinks desktop */}
          <div className="hidden md:flex ml-6 gap-6">
            <NavLinks />
          </div>

          {/* Hamburger mobile */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
              {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>

          {/* User actions */}
          <div className="ml-auto flex items-center gap-2 sm:gap-3 lg:gap-4">
            <AddRecipeButton onClick={handleAddRecipes} />
            {isLoggedIn ? (
              <UserMenu displayName={displayName} onLogout={handleLogout} />
            ) : (
              <AuthButton onClick={handleLogin} />
            )}
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-2 px-2 flex flex-col gap-4">
            {/* Nav links */}
            <div className="flex flex-col gap-2">
              <NavLinks />
            </div>

            {/* Categories cũng trong dropdown */}
            <div className="flex flex-col gap-2">
              <Categories itemsByType={categoriesByType} />
            </div>
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="hidden md:flex justify-center md:block shadow-lg">
        <Categories itemsByType={categoriesByType} />
      </div>
    </header>
  );
}
