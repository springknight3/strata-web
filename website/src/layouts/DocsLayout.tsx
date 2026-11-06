import React, { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

interface RootContextType {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DocsLayout: React.FC = () => {
  const rootContext = useOutletContext<RootContextType>();
  const [localMobileOpen, setLocalMobileOpen] = useState(false);

  const isMobileOpen = rootContext ? rootContext.isMobileMenuOpen : localMobileOpen;
  const setMobileOpen = rootContext ? rootContext.setIsMobileMenuOpen : setLocalMobileOpen;

  return (
    <div className="mx-auto flex max-w-7xl">
      <Sidebar isMobileOpen={isMobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <main id="main-content" className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12">
        <Outlet />
      </main>
    </div>
  );
};
