// scroll bar
import 'simplebar/src/simplebar.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// apex-chart
import '@base/assets/third-party/apex-chart.css';
import '@base/assets/third-party/react-table.css';
// font
import '@base/assets/fonts/base.css';
import '@base/assets/scss/app.scss';

import { lazy, Suspense } from 'react';

import CriticalErrorBoundary from '@base/components/@hanbiro/Errors/CriticalErrorBoundary';
import Loader from '@base/components/App/Loader';
import { queryClient } from '@base/config/queryClient';
import ThemeCustomization from '@base/themes';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { IAMProvider } from '@base/contexts/IAMContext';
import LicenseProvider from '@base/containers/License';
import PublicProvider from '@base/components/App/PublicProvider';
import Public from '@base/components/App/Public';

const Main = lazy(() => import('./Main'));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <IAMProvider>
      <LicenseProvider>
        <ThemeCustomization>
          <CriticalErrorBoundary>
            <Suspense fallback={<></>}>
              <Loader />
              <Main />
              <Toaster position="top-right" reverseOrder={false} />
            </Suspense>
          </CriticalErrorBoundary>
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeCustomization>
      </LicenseProvider>
    </IAMProvider>
    <PublicProvider>
      <ThemeCustomization>
        <CriticalErrorBoundary>
          <Suspense fallback={<></>}>
            <Loader />
            <Public />
            <Toaster position="top-right" reverseOrder={false} />
          </Suspense>
        </CriticalErrorBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeCustomization>
    </PublicProvider>
  </QueryClientProvider>
);

export default App;
