import { MENU_SETTING_SITE } from '@base/config/menus';
import { lazy } from 'react';

/** MAIN PAGE CONFIG */
export const MAIN_MENU = MENU_SETTING_SITE;
export const LIST_ROUTE = ':category';
export const VIEW_ROUTE = ':category/:id/*';
export const WRITE_ROUTE = ':category/write';
export const DEFAULT_ROUTE = '/settings/site/desk';
export const DEFAULT_CATEGORY = 'desk';
export const ListPage = lazy(() => import('@settings/site/pages/List'));
export const ViewPage = lazy(() => import('@settings/site/pages/View'));
export const WritePage = lazy(() => import('@settings/site/pages/Write'));
export const TabConentPage = lazy(() => import('@settings/site/pages/TabContent'));

export const PRIMARY_KEY = 'id';
export const NAME_KEY = 'name';
