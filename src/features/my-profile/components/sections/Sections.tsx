import type { ReactNode } from "react";

type SectionsProps = {
  title: string;
  children: ReactNode;
};

function Sections({ title, children }: SectionsProps) {
  return (
    <div className="w-full space-y-6 mt-8 pb-20">
      <header>
        <h1 className="text-[36px] font-semibold">{title}</h1>

        <hr className="text-(--divide-color) border-1 my-2" />

        <div className="mt-2 h-px w-full bg-border" />
      </header>

      {children}
    </div>
  );
}

export default Sections;