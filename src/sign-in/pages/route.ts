import { lazy } from 'react';

const SignIn = lazy(() => import('./main'));

export default [
  {
    path: '/sign-in',
    component: SignIn,
  },
];
