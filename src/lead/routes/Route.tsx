import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from '@base/components/App/Loadable';
import { MENU_LEAD, MENU_SALES } from '@base/config/menus';

const LeadMainPage = Loadable(lazy(() => import('@lead/pages/MainPage')));

const Routes = {
  path: `${MENU_LEAD}/*`,
  element: <LeadMainPage />
  // children: [
  //   {
  //     index: true,
  //     element: <Navigate to={MENU_LEAD} />
  //   },
  //   {
  //     path: `${MENU_LEAD}/*`,
  //     element: <LeadMainPage />
  //   }
  // ]
};
export default Routes;
