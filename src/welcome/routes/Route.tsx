import Loadable from '@base/components/App/Loadable';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const MainPage = Loadable(lazy(() => import('@welcome/pages/MainPage')));

const Routes = {
  path: 'welcome/*',
  element: <MainPage />
  // children: [
  //   {
  //     index: true,
  //     element: <Navigate to={`/quote/all`} />
  //   }
  // ]
};
export default Routes;
