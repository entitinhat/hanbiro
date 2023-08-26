import Loadable from '@base/components/App/Loadable';
import { MENU_CUSTOMER } from '@base/config/menus';
import { CUSTOMER_CATEGORY_ALL } from '@customer/config/constants';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const CustomerMainPage = Loadable(lazy(() => import('@customer/pages/MainPage')));
//const CustomerListPage = Loadable(lazy(() => import('@customer/pages/ListPage'))); //FOR TEST

const Routes = {
  path: 'customer/*',
  element: <CustomerMainPage />,
  children: [
    {
      index: true,
      element: <Navigate to={`/${MENU_CUSTOMER}/${CUSTOMER_CATEGORY_ALL}`} />
    },
    // {
    //   path: 'all',
    //   element: <CustomerMainPage />,
    //   children: [
    //     {
    //       path: ':id',
    //       element: <></>
    //     }
    //   ]
    // },
    // {
    //   path: 'account',
    //   // element: <CustomerListPage /> //TODO
    // },
    // {
    //   path: 'contact',
    //   // element: <CustomerListPage /> //TODO
    // }
  ]
};
export default Routes;
