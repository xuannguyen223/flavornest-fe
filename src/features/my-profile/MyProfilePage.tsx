import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const MY_PROFILE_NAV = [
  {
    key: "EDIT_PROFILE",
    label: "Edit Your Profile",
    path: "/my-profile/edit-profile",
    isDefault: true,
  },
  {
    key: "ACCOUNT_SETTINGS",
    label: "Account Settings",
    path: "/my-profile/account-settings",
  },
  {
    key: "MY_RECIPES",
    label: "My Recipes",
    path: "/my-profile/my-recipes",
  },
  {
    key: "SAVED_RECIPES",
    label: "Saved Recipes",
    path: "/my-profile/saved-recipes",
  },
];

function MyProfilePage() {
  const location = useLocation();
  const isBasePath = location.pathname === "/my-profile";

  if (isBasePath) {
    return <Navigate to="/my-profile/edit" replace />;
  }

  return (
    <div className="w-full grid grid-cols-1 gap-[80px] md:grid-cols-[400px_1fr] min-h-screen">
      <aside className="h-full">
        <nav className="h-full bg-(--second-color)">
          <h2 className="p-[50px] py-5 font-semibold text-[32px] text-white">
            My Profile
          </h2>
          <ul className="space-y-1">
            {MY_PROFILE_NAV.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.key}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center justify-between pl-[50px] py-[20px] text-[20px] text-white",
                      isActive
                        ? "bg-background font-medium bg-white text-(--light-black-color)"
                        : "hover:bg-accent"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <div className="w-full min-w-0 pr-[80px]">
        <Outlet />
      </div>
    </div>
  );
}

export default MyProfilePage;