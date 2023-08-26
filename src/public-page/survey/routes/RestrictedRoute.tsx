import Loadable from '@base/components/App/Loadable';
import { lazy } from 'react';

const MainPage = Loadable(lazy(() => import('@public-page/survey/pages/MainPage')));
const ViewPage = Loadable(lazy(() => import('@public-page/survey/pages/ViewPage')));

const PublicRoutes = {
  path: 'survey',
  element: <MainPage />,
  children: [
    {
      path: 'view',
      element: <ViewPage />
    }
  ]
};

export default PublicRoutes;
