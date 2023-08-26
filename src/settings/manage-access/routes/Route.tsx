import Loadable from '@base/components/App/Loadable';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const MainPage = Loadable(lazy(() => import('@settings/manage-access/pages/MainPage')));

const Routes = {
  path: 'settings/manage-access/*',
  element: <MainPage />
};
export default Routes;
