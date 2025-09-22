import { Suspense, type ReactNode } from "react";
import Spinner from "./Spinner";

type Props = {
  children: ReactNode;
};

export default function SuspenseWrapper({ children }: Props) {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
}
