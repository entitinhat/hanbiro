import Loadable from '@base/components/App/Loadable';
import { MENU_CUSTOMER } from '@base/config/menus';
import { CUSTOMER_CATEGORY_ALL } from '@blocklist/config/constants';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const BlockMainPage = Loadable(lazy(() => import('@blocklist/pages/MainPage')));

const Routes = {
  path: '/customer/block/*',
  element: <BlockMainPage />
};
export default Routes;
