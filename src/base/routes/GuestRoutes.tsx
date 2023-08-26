import { lazy } from 'react';

// project import
import GuestGuard from '@base/utils/route-guard/GuestGuard';
import CommonLayout from '@base/layouts/CommonLayout';
import Loadable from '@base/components/App/Loadable';

// render - login
const AuthLogin = Loadable(lazy(() => import('@base/pages/auth/login')));
// const AuthRegister = Loadable(lazy(() => import('base/pages/auth/register')));
// const AuthForgotPassword = Loadable(lazy(() => import('base/pages/auth/forgot-password')));
// const AuthCheckMail = Loadable(lazy(() => import('base/pages/auth/check-mail')));
// const AuthResetPassword = Loadable(lazy(() => import('base/pages/auth/reset-password')));
// const AuthCodeVerification = Loadable(lazy(() => import('base/pages/auth/code-verification')));

// ==============================|| AUTH ROUTING ||============================== //
const guestRoutes: any[] = [];
const publicAppRoutes = require.context('/src', true, /PublicRoute.tsx$/);
publicAppRoutes.keys().forEach((path: any) => {
  guestRoutes.push(publicAppRoutes(path).default);
});
console.log('guestRoutes', guestRoutes);
const LoginRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <GuestGuard>
          <CommonLayout />
        </GuestGuard>
      ),
      children: [
        {
          path: 'signin',
          element: <AuthLogin />
        },
        ...guestRoutes
      ]
    }
  ]
};

export default LoginRoutes;
