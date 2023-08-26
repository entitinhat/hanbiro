import { useLocation, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../recoil/atoms/auth';

/**
 * This will check authenticated before go into the children components
 */
function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useRecoilValue(authAtom);
  const location = useLocation();
  //// console.log('authenticated >>>>>>>>>', auth);
  // if (!auth) { //check auth

  if (!auth) {
    //Skip auth
    // Redirect them to the /login page and save the current location
    // return <Navigate to="/login/auth" state={{ from: location }} replace />;
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
