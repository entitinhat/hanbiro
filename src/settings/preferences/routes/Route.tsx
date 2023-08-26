import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from '@base/components/App/Loadable';

const PreferenceMainPage = Loadable(lazy(() => import('@settings/preferences/pages')));
const PreferenceCustomerPage = Loadable(lazy(() => import('@settings/preferences/pages/Customer')));
const PreferenceProductPage = Loadable(lazy(() => import('@settings/preferences/pages/Product')));
const PreferenceActivityPage = Loadable(lazy(() => import('@settings/preferences/pages/Activity')));
const PreferenceDeskPage = Loadable(lazy(() => import('@settings/preferences/pages/Desk')));
const PreferenceProjectPage = Loadable(lazy(() => import('@project/containers/Setting')));
const PreferenceQuotePage = Loadable(lazy(() => import('@settings/preferences/pages/Quote')));
const PreferenceLeadPage = Loadable(lazy(() => import('@settings/preferences/pages/Lead')));
const PreferenceMarketingPage = Loadable(lazy(() => import('@settings/preferences/pages/Marketing')));
const PreferenceSalesPage = Loadable(lazy(() => import('@settings/preferences/pages/Sales')));

const Routes = {
  path: 'settings',
  children: [
    {
      index: true,
      element: <Navigate to={`/settings/preferences`} />
    },
    {
      path: 'preferences',
      element: <PreferenceMainPage />,
      children: [
        {
          index: true,
          element: <Navigate to={`/settings/preferences/desk`} />
        },
        {
          path: 'desk',
          element: <PreferenceDeskPage />
        },
        {
          path: 'customer',
          element: <PreferenceCustomerPage />
        },
        {
          path: 'product',
          element: <PreferenceProductPage />
        },
        {
          path: 'activity',
          element: <PreferenceActivityPage />
        },
        {
          path: 'project',
          element: <PreferenceProjectPage />
        },
        {
          path: 'quote',
          element: <PreferenceQuotePage />
        },
        {
          path: 'sales',
          element: <PreferenceSalesPage />
        },
        {
          path: 'marketing',
          element: <PreferenceMarketingPage />
        }
      ]
    }
  ]
};
export default Routes;
