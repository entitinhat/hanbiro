import Loadable from '@base/components/App/Loadable';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const RuleMainPage = Loadable(lazy(() => import('@settings/assignment-rule/rule/pages/MainPage')));
const ReportMainPage = Loadable(lazy(() => import('@settings/assignment-rule/report/pages/MainPage')));
const KnowledgeBaseMainPage = Loadable(lazy(() => import('@desk/knowledge-base/pages/MainPage')));

const Routes = {
  path: 'settings/assignment',
  children: [
    {
      index: true,
      element: <Navigate to="rule" />
    },
    {
      path: 'rule/*',
      element: <RuleMainPage />
    },
    {
      path: 'report/*',
      element: <ReportMainPage />
    }
  ]
};
export default Routes;
