import { lazy } from 'react';

import Loadable from '@base/components/App/Loadable';
// project import
import MainLayout from '@base/layouts/MainLayout';
import AuthGuard from '@base/utils/route-guard/AuthGuard';
import { MENU_ANALYTIC } from '@base/config/menus';
import { Navigate } from 'react-router-dom';

// ==============================|| MAIN ROUTING ||============================== //
const defaultPath: string | null = MENU_ANALYTIC;
const moduleRoutes: any[] = [];
const requireAppRoutes = require.context('/src', true, /(?<!Public)Route.tsx$/);

requireAppRoutes.keys().forEach((path: any) => {
  const route = requireAppRoutes(path).default;
  if (route.path === defaultPath) {
    // check exist or not
    moduleRoutes.unshift({
      index: true,
      element: <Navigate to={defaultPath} />
    });
  }
  moduleRoutes.push(route);
});
console.log('moduleRoutes', moduleRoutes);
const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: moduleRoutes
    }
  ]
};

export default MainRoutes;
