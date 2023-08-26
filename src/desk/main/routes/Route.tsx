import Loadable from '@base/components/App/Loadable';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const TicketMainPage = Loadable(lazy(() => import('@desk/ticket/pages/MainPage')));
const KnowledgeBaseMainPage = Loadable(lazy(() => import('@desk/knowledge-base/pages/MainPage')));

const Routes = {
  path: 'mdesk',
  children: [
    {
      index: true,
      element: <Navigate to="ticket" />
    },
    {
      path: 'ticket/*',
      element: <TicketMainPage />
    },
    {
      path: 'knowledge/*',
      element: <KnowledgeBaseMainPage />
    }
  ]
};
export default Routes;
