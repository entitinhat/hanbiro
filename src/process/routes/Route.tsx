import { lazy } from 'react';

import Loadable from '@base/components/App/Loadable';

const ProcessMainPage = Loadable(lazy(() => import('@process/pages/MainPage')));

const Routes = {
  path: 'process/*',
  element: <ProcessMainPage />,
};
export default Routes;
