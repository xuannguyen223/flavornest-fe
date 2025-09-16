import Logo from "./Logo";
import NavLinks from "./NavLinks";
import AddRecipeButton from "./action-buttons/AddRecipeButton";
import AuthButton from "./action-buttons/AuthButton";
import UserMenu from "./action-buttons/UserMenu";
import "../../style.css";

export default function MainHeader() {
  const isLoggedIn = typeof window !== "undefined" && !!localStorage.getItem("auth_token");
  const displayName = (typeof window !== "undefined" && localStorage.getItem("display_name")) || "Name";

  const handleLogout = () => {
    try {
      localStorage.removeItem("auth_token");
      // optionally clear other auth-related items
      // localStorage.removeItem("display_name");
      window.location.reload();
    } catch {}
  };
  return (
    <header>
      <div className="header-container">
        <div className="header-top px-2 sm:px-4 lg:px-0">
          <Logo />
          <NavLinks />
          <div className="ml-auto flex items-center gap-3 sm:gap-4 lg:gap-6">
            <AddRecipeButton />
            {isLoggedIn ? (
              <UserMenu displayName={displayName} onLogout={handleLogout} />
            ) : (
              <AuthButton />
            )}
          </div>
        </div>
      </div>
      <div className="header-divider" />
    </header>
  );
}
