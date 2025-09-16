import React from 'react';
import type { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto max-w-[1280px] p-8">
      {children}
    </div>
  );
};

export default MainLayout;

