import { lazy } from 'react';

import Loadable from '@base/components/App/Loadable';
import { Navigate } from 'react-router-dom';

const MainPage = Loadable(lazy(() => import('@settings/template/pages')));
const SMSMainPage = Loadable(lazy(() => import('@settings/template/sms/pages')));
const CallMainPage = Loadable(lazy(() => import('@settings/template/call/pages')));
const KnowLedgeMainPage = Loadable(lazy(() => import('@settings/template/kb/pages')));
const TaskMainPage = Loadable(lazy(() => import('@settings/template/task/pages')));
const EmailMainPage = Loadable(lazy(() => import('@settings/template/email/pages')));
const QuoteMainPage = Loadable(lazy(() => import('@settings/template/quote/pages')));
const ProjectMainPage = Loadable(lazy(() => import('@project/pages/ListPage/Template')));

const Routes = {
  path: 'settings/*',
  children: [
    {
      path: 'template/*',
      element: <MainPage />,
      children: [
        {
          index: true,
          element: <Navigate to={`/settings/template/sms`} />
        },
        {
          path: 'sms/*',
          element: <SMSMainPage />
        },
        {
          path: 'call/*',
          element: <CallMainPage />
        },
        {
          path: 'knowledgebase/*',
          element: <KnowLedgeMainPage />
        },
        {
          path: 'task/*',
          element: <TaskMainPage />
        },
        {
          path: 'email/*',
          element: <EmailMainPage />
        },
        {
          path: 'quote/*',
          element: <QuoteMainPage />
        },
        {
          path: 'project/*',
          element: <ProjectMainPage />
        }
      ]
    }
  ]
};
export default Routes;
