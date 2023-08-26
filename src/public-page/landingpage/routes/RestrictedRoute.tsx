import Loadable from '@base/components/App/Loadable';
import { lazy } from 'react';

const MainPage = Loadable(lazy(() => import('@public-page/landingpage/pages/MainPage')));
const ViewPage = Loadable(lazy(() => import('@public-page/landingpage/pages/ViewPage')));

const PublicRoutes = {
  path: 'landingpage',
  element: <MainPage />,
  children: [
    {
      path: 'view',
      element: <ViewPage />
    }
  ]
};

export default PublicRoutes;
