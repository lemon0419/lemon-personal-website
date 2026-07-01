import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntersectObserver from '@/components/common/IntersectObserver';
import { Toaster } from '@/components/ui/sonner';
import FloatingDiscPlayer from '@/components/FloatingDiscPlayer';
import { I18nProvider } from '@/contexts/I18nContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

import { routes } from './routes';

export default function App() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <Router>
          <IntersectObserver />
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              <Routes>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
          <Toaster />
          <FloatingDiscPlayer
            audioSrc="/music/you-will-be-found.mp3"
            labelLine1="You Will"
            labelLine2="Be Found"
          />
        </Router>
      </ThemeProvider>
    </I18nProvider>
  );
}
