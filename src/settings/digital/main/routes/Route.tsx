import { lazy } from 'react';

//third-party
import { Navigate } from 'react-router-dom';

//project
import Loadable from '@base/components/App/Loadable';

const MainPage = Loadable(lazy(() => import('@settings/digital/main')));
const SurveyListPage = Loadable(lazy(() => import('@settings/digital/survey/pages/ListPage')));
const SurveyViewPage = Loadable(lazy(() => import('@settings/digital/survey/pages/ViewPage')));
const CtaMainPage = Loadable(lazy(() => import('@settings/digital/cta/pages/MainPage')));
const LandingPage = Loadable(lazy(() => import('@settings/digital/landing-page/pages/MainPage')));
const ViewPage = Loadable(lazy(() => import('@settings/digital/survey/pages/ViewPage')));
const FormMainPage = Loadable(lazy(() => import('@settings/digital/ticket-form/pages/MainPage')));

const Routes = {
  path: 'settings',
  children: [
    {
      index: true,
      element: <Navigate to={`/settings/digital`} />
    },
    {
      path: 'digital',
      element: <MainPage />,
      children: [
        {
          index: true,
          element: <Navigate to={`/settings/digital/survey`} />
        },
        {
          path: 'survey',
          children: [
            {
              index: true,
              element: <Navigate to={`/settings/digital/survey/all`} />
            },
            {
              path: 'all',
              element: <SurveyListPage />
            },
            {
              path: ':id',
              element: <SurveyViewPage />
            }
          ]
        },
        {
          path: 'cta/*',
          element: <CtaMainPage />
        },
        {
          path: 'form/*',
          element: <FormMainPage />,
        },
        {
          path: 'landing-page/*',
          element: <LandingPage />,
          children: [
            {
              index: true,
              element: <Navigate to={`/settings/digital/landing-page/all`} />
            },
            {
              path: 'all',
              element: <LandingPage />
            },
            {
              path: ':id',
              element: <ViewPage />
            }
          ]
        }
      ]
    }
  ]
};
export default Routes;
