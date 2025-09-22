import Footer from "@/features/footer/Footer";
import MainHeader from "@/features/header/components/main-header/MainHeader";
import SuspenseWrapper from "@/features/loading/SuspenseWrapper";
import { useAppDispatch } from "@/hooks/redux";
import { checkLogin } from "@/store/features/login/loginAction";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkLogin());
  }, []);
  return (
    <div className="flex flex-col min-h-screen mx-auto w-full">
      <SuspenseWrapper>
        <MainHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </SuspenseWrapper>
    </div>
  );
}
