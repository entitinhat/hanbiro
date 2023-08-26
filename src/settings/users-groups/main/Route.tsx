import { lazy } from 'react';

import Loadable from '@base/components/App/Loadable';
import { Navigate } from 'react-router-dom';

const MainPage = Loadable(lazy(() => import('./pages')));
const UsersPage = Loadable(lazy(() => import('@settings/users-groups/users/pages/MainPage')));
const GroupsPage = Loadable(lazy(() => import('@settings/users-groups/groups/pages/MainPage')));

const Routes = {
  path: 'settings/*',
  children: [
    {
      path: 'manage-users-groups/*',
      element: <MainPage />,
      children: [
        {
          index: true,
          element: <Navigate to={`/settings/manage-users-groups/users`} />
        },
        {
          path: 'users/*',
          element: <UsersPage />
        },
        {
          path: 'groups/*',
          element: <GroupsPage />
        }
      ]
    }
  ]
};
export default Routes;
