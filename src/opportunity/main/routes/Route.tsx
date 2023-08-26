import Loadable from '@base/components/App/Loadable';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const OpportunityMainPage = Loadable(lazy(() => import('@opportunity/pages/MainPage')));
const CompetitorMainPage = Loadable(lazy(() => import('@competitor/pages/MainPage')));
const QuoteMainPage = Loadable(lazy(() => import('@quote/pages/MainPage')));

const Routes = {
  path: 'opportunity',
  children: [
    {
      index: true,
      element: <Navigate to="quote" />
    },
    {
      path: 'opportunity/*',
      element: <OpportunityMainPage />
    },
    {
      path: 'quote/*',
      element: <QuoteMainPage />
    },
    {
      path: 'competitor/*',
      element: <CompetitorMainPage />
    }
  ]
};
export default Routes;
