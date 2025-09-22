import {
  BrowserRouter,
  Route,
  Routes,
  type RouteProps,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MainLayout from "./components/common/MainLayout";
import { lazy, useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { loginThunk } from "./store/features/authSlice";
import SuspenseWrapper from "./features/not-found/components/SuspenseWrapper";
import { myProfileRoutes, routes } from "./routes/routes";
const MyProfile = lazy(() => import("./features/my-profile/MyProfilePage"));

function App() {
  // auto Login use for testing use submit review
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      loginThunk({
        email: "johncole10@example.com",
        password: "@StrongPass8888",
      })
    )
      .unwrap()
      .then(() => console.log("✅ Auto login success"))
      .catch((err) => console.error("❌ Auto login failed", err));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {routes.map((route, idx) => (
            <Route
              key={["main-route", route.path, idx].join("-")}
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
            {myProfileRoutes.map((route: RouteProps, idx: number) => (
              <Route
                key={["profile-route", route.path, idx].join("-")}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
