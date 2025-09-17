import Logo from "./Logo";
import NavLinks from "./NavLinks";
import AddRecipeButton from "./action-buttons/AddRecipeButton";
import AuthButton from "./action-buttons/AuthButton";
import "../../style.css";

export default function MainHeader() {
  return (
    <header>
      <div className="header-container">
        <div className="header-top px-2 sm:px-4 lg:px-0">
          <Logo />
          <NavLinks />
          <div className="ml-auto flex items-center gap-3 sm:gap-4 lg:gap-6">
            <AddRecipeButton />
            <AuthButton />
          </div>
        </div>
      </div>
      <div className="header-divider" />
    </header>
  );
}
