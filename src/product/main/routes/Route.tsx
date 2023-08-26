import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from '@base/components/App/Loadable';

const ProductMainPage = Loadable(lazy(() => import('@product/product/pages/MainPage')));
const ItemMainPage = Loadable(lazy(() => import('@product/item/pages/MainPage')));
const GroupMainPage = Loadable(lazy(() => import('@product/group/pages/MainPage')));
const UnitMainPage = Loadable(lazy(() => import('@product/unit/pages/MainPage')));

const Routes = {
  path: 'product',
  children: [
    {
      index: true,
      element: <Navigate to="product" />
    },
    {
      path: 'product/*',
      element: <ProductMainPage />
    },
    {
      path: 'group/*',
      element: <GroupMainPage />
    },
    {
      path: 'item/*',
      element: <ItemMainPage />
    },
    {
      path: 'unit/*',
      element: <UnitMainPage />
    }
  ]
};
export default Routes;
