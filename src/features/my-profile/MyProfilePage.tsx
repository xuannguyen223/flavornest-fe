import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  MY_PROFILE_BASE_PATH,
  MY_PROFILE_NAV,
  MY_PROFILE_TABS,
} from "./routes";
import EditProfileSection from "./components/sections/EditProfileSection";
import AccountSettingsSection from "./components/sections/AccountSettingsSection";
import MyRecipesSection from "./components/sections/MyRecipesSection";

function MyProfilePage() {
  const location = useLocation();
  const isBasePath = location.pathname === MY_PROFILE_BASE_PATH;

  if (isBasePath) {
    return (
      <Navigate
        to={`${MY_PROFILE_BASE_PATH}/${MY_PROFILE_TABS.EDIT_PROFILE}`}
        replace
      />
    );
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
        <Routes>
          <Route
            path={MY_PROFILE_TABS.EDIT_PROFILE}
            element={<EditProfileSection />}
          />
          <Route
            path={MY_PROFILE_TABS.ACCOUNT_SETTINGS}
            element={<AccountSettingsSection />}
          />
          <Route
            path={MY_PROFILE_TABS.MY_RECIPES}
            element={<MyRecipesSection />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default MyProfilePage;