import Loadable from '@base/components/App/Loadable';
import { MENU_CUSTOMER } from '@base/config/menus';
import { CUSTOMER_CATEGORY_ALL } from '@marketing-list/config/constants';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const MarketingMainPage = Loadable(lazy(() => import('@marketing-list/pages/MainPage')));

const Routes = {
  path: 'customer/marketing/*',
  element: <MarketingMainPage />
};
export default Routes;
