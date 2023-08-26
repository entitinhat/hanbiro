import Loadable from '@base/components/App/Loadable';
import { lazy } from 'react';

const MainPage = Loadable(lazy(() => import('@translator/pages/MainPage')));

const Routes = {
  path: 'translator/*',
  element: <MainPage />
};
export default Routes;
