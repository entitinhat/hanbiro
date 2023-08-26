import { lazy } from 'react';

import Loadable from '@base/components/App/Loadable';

const ProjectMainPage = Loadable(lazy(() => import('@project/pages/MainPage')));

const Routes = {
  path: 'project/*',
  element: <ProjectMainPage />
};
export default Routes;
