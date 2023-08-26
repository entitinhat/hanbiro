import Loadable from '@base/components/App/Loadable';
import { lazy } from 'react';

const MainPage = Loadable(lazy(() => import('@public-page/site/pages/MainPage')));
const ViewPage = Loadable(lazy(() => import('@public-page/site/pages/ViewPage')));

const PublicRoutes = {
  path: 'site',
  element: <MainPage />,
  children: [
    {
      path: 'view',
      element: <ViewPage />
    }
  ]
};

export default PublicRoutes;
