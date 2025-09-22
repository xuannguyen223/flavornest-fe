import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import MainLayout from "./components/common/MainLayout";
import AuthLayout from "./components/common/auth/AuthLayout";
import SignupPage from "./features/signup/SignupPage";
import LoginPage from "./features/login/LoginPage";
import { myProfileRoutes, routes } from "./routes/routes";
import { lazy } from "react";
import SuspenseWrapper from "./features/not-found/components/SuspenseWrapper";
const MyProfile = lazy(() => import("./features/my-profile/MyProfilePage"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {routes.map((route) => (
            <Route
              key={["main-route", route.path].join("-")}
              path={route.path}
              element={route.element}
            />
          ))}
          <Route
            path="/my-profile"
            element={
              <SuspenseWrapper>
                <MyProfile />
              </SuspenseWrapper>
            }
          >
            {myProfileRoutes.map((route) => (
              <Route
                key={["my-profile-route", route.path].join("-")}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={1000} />
    </BrowserRouter>
  );
}

export default App;
