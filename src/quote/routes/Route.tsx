import Loadable from '@base/components/App/Loadable';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const MainPage = Loadable(lazy(() => import('@quote/pages/MainPage')));

const Routes = {
  path: 'quote/*',
  element: <MainPage />
  // children: [
  //   {
  //     index: true,
  //     element: <Navigate to={`/quote/all`} />
  //   }
  // ]
};
export default Routes;
