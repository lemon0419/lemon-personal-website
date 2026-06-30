import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import { useState } from 'react';
import type { ReactNode } from 'react';

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  /** Accessible without login. Routes without this flag require authentication. Has no effect when RouteGuard is not in use. */
  public?: boolean;
}

function RootPage() {
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('visited');
  });

  const handleEnter = () => {
    sessionStorage.setItem('visited', 'true');
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <SplashPage onEnter={handleEnter} />}
      <HomePage />
    </>
  );
}

export const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <RootPage />,
    public: true,
  },
  {
    name: 'Portfolio',
    path: '/portfolio',
    element: <PortfolioPage />,
    public: true,
  }
];
