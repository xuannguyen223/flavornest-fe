import Footer from "@/features/footer/Footer";
import MainHeader from "@/features/header/components/main-header/MainHeader";
import LoadingPage from "@/features/loading/LoadingPage";
import { useAppDispatch } from "@/hooks/redux";
import { checkLogin } from "@/store/features/login/loginAction";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(checkLogin());
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="flex flex-col min-h-screen mx-auto w-full">
      <MainHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
