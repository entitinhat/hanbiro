import Loadable from '@base/components/App/Loadable';

import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const VoraSignUp = Loadable(lazy(() => import('@vora-works/pages/SignUp')));
const ComparePlans = Loadable(lazy(() => import('@vora-works/pages/ComparePlans')));
const Routes = {
  // element: <VoraSignUp />,
  children: [
    {
      path: '/signup',
      element: <VoraSignUp />
    },

    {
      path: '/compareplans',
      element: <ComparePlans />
    }
  ]
};
export default Routes;
