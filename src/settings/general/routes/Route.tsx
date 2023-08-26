import { lazy } from 'react';
import Loadable from '@base/components/App/Loadable';
import { Navigate } from 'react-router-dom';

const MainPage = Loadable(lazy(() => import('@settings/general/pages')));
const FormatPage = Loadable(lazy(() => import('@settings/general/pages/FormatPage')));
const SelectionFieldsPage = Loadable(lazy(() => import('@settings/general/pages/SelectionFieldsPage')));
const PersonalizePage = Loadable(lazy(() => import('@settings/general/pages/PersonalizePage')));
const SelectionGroupFieldsPage = Loadable(lazy(() => import('@settings/general/pages/SelectionGroupFieldsPage')));
const SUSPage = Loadable(lazy(() => import('@settings/general/pages/SUSPage')));

const Routes = {
  path: 'settings',
  children: [
    {
      index: true,
      element: <Navigate to={`/settings/general`} />
    },
    {
      path: 'general',
      element: <MainPage />,
      children: [
        {
          index: true,
          element: <Navigate to={`format-setting`} />
        },
        {
          path: 'format-setting',
          element: <FormatPage />
        },
        // {
        //   path: 'selection-fields/fields',
        //   element: <SelectionFieldsPage />
        // },
        // {
        //   path: 'selection-fields/groups',
        //   element: <SelectionGroupFieldsPage />
        // },
        {
          path: 'personalize',
          element: <PersonalizePage />
        },
        {
          path: 'sus',
          element: <SUSPage />
        }
      ]
    }
  ]
};
export default Routes;
