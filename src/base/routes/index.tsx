import { useRoutes } from 'react-router-dom';

import AuthRoutes from './AuthorizedRoutes';
import GuestRoutes from './GuestRoutes';


export default function ThemeRoutes() {
  // return useRoutes([GuestRoutes, AuthRoutes]);
  return useRoutes([AuthRoutes, GuestRoutes]);
}
