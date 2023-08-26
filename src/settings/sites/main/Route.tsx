import { lazy } from 'react';

import Loadable from '@base/components/App/Loadable';
import { Navigate } from 'react-router-dom';

const MainPage = Loadable(lazy(() => import('./pages')));
const DeskMainPage = Loadable(lazy(() => import('@settings/sites/desk/pages/MainPage')));

const Routes = {
  path: 'settings/*',
  children: [
    {
      path: 'sites/*',
      element: <MainPage />,
      children: [
        {
          index: true,
          element: <Navigate to={`/settings/sites/desk`} />
        },
        {
          path: 'desk/*',
          element: <DeskMainPage />
        }
      ]
    }
  ]
};
export default Routes;
