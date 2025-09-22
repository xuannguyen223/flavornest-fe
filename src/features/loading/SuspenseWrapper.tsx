import { Suspense, type ReactNode } from "react";
import LoadingPage from "./LoadingPage";

type Props = {
  children: ReactNode;
};

export default function SuspenseWrapper({ children }: Props) {
  return <Suspense fallback={<LoadingPage />}>{children}</Suspense>;
}
