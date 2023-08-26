import { lazy } from 'react';

import Loadable from '@base/components/App/Loadable';

const ActivityMainPage = Loadable(lazy(() => import('@activity/pages/MainPage')));
// const ActivityListPage = Loadable(lazy(() => import('@activity/pages/ListPage')));

const Routes = {
  path: 'activity/*',
  element: <ActivityMainPage />,
  children: [
    {
      path: 'activity',
      element: <ActivityMainPage />
    }
    /*{
      path: 'mywork',
      element: <ActivityListPage />
    },*/
    // {
    //   path: 'view/:id',
    //   element: <ActivityMainPage />
    // }
  ]
};
export default Routes;
