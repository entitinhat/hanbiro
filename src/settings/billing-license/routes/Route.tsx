import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from '@base/components/App/Loadable';
import BillPayment from '../pages/Bill&Payment';
import History from '../pages/History';
import Products from '../pages/Products';
import ProductURLs from '../pages/ProductURLs';

const BillingLicenseMainPage = Loadable(lazy(() => import('@settings/billing-license/pages')));
const BillingLicensePage = Loadable(lazy(() => import('@settings/billing-license/pages/License')));
const BillingInformationPage = Loadable(lazy(() => import('@settings/billing-license/pages/Information')));
const Routes = {
  path: 'settings',
  children: [
    {
      index: true,
      element: <Navigate to={`/settings/billing-license/products`} />
    },
    {
      path: 'billing-license',
      element: <BillingLicenseMainPage />,
      children: [
        // {
        //   index: true,
        //   element: <Navigate to={`/settings/billing-license/license`} />
        // },
        // {
        //   path: 'billing-information',
        //   element: <BillingInformationPage />
        // },
        // {
        //   path: 'license',
        //   element: <BillingLicensePage />
        // },
        // {
        //   path: 'bill-payment',
        //   element: <BillPayment />
        // },
        // {
        //   path: 'history',
        //   element: <History />
        // },
        {
          path: 'products',
          element: <Products />
        },
        {
          path: 'product-urls',
          element: <ProductURLs />
        }
      ]
    }
  ]
};
export default Routes;
