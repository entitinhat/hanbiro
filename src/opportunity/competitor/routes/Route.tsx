import { lazy } from 'react';
import Loadable from '@base/components/App/Loadable';

const MainPage = Loadable(lazy(() => import('@competitor/pages/MainPage')));

const Routes = {
  path: 'competior/*',
  element: <MainPage />
};
export default Routes;
