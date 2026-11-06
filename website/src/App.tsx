import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { DocsLayout } from './layouts/DocsLayout';
import { HomePage } from './pages/HomePage';
import { DocsPage } from './pages/DocsPage';
import { DownloadsPage } from './pages/DownloadsPage';
import { LicensesPage } from './pages/LicensesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { getFirstDoc } from './lib/docs';

export const App: React.FC = () => {
  const firstDoc = getFirstDoc();
  const firstDocPath = firstDoc ? firstDoc.path : '/docs/getting-started/introduction';

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="docs" element={<Navigate to={firstDocPath} replace />} />
          <Route path="docs" element={<DocsLayout />}>
            <Route path=":group/:slug" element={<DocsPage />} />
          </Route>
          <Route path="downloads" element={<DownloadsPage />} />
          <Route path="licenses" element={<LicensesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
