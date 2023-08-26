import Loadable from '@base/components/App/Loadable';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const DashboardPage = Loadable(lazy(() => import('@analytic/dashboard/pages/MainPage')));
const ReportPage = Loadable(lazy(() => import('@analytic/report/pages/MainPage')));
const SusLogPage = Loadable(lazy(() => import('@analytic/sus-log/pages/MainPage')));

const Routes = {
  path: 'analytic',
  children: [
    {
      index: true,
      element: <Navigate to="dashboard" />
    },
    {
      path: 'dashboard/*',
      element: <DashboardPage />
    },
    {
      path: 'report/*',
      element: <ReportPage />
    },
    {
      path: 'sus-log/*',
      element: <SusLogPage />
    }
  ]
};
export default Routes;
