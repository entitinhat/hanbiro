import { lazy } from 'react';
import Loadable from '@base/components/App/Loadable';

const MainPage = Loadable(lazy(() => import('@opportunity/pages/MainPage')));

const Routes = {
  path: 'opportunity/*',
  element: <MainPage />
};

export default Routes;
