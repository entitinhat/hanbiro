import { lazy } from 'react';

//third-party
import { Navigate } from 'react-router-dom';

//project
import Loadable from '@base/components/App/Loadable';
import { MENU_CAMPAIGN } from '@base/config/menus';

//menu
import { CAMPAIGN_CATEGORY_ALL } from '@campaign/config/constants';

const CampaignMainPage = Loadable(lazy(() => import('@campaign/pages/MainPage')));

const Routes = {
  path: 'campaign/*',
  element: <CampaignMainPage />,
  children: [
    {
      index: true,
      element: <Navigate to={`/${MENU_CAMPAIGN}/${CAMPAIGN_CATEGORY_ALL}`} />
    }
  ]
};

export default Routes;
