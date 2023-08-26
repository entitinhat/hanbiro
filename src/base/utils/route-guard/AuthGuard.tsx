import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project import
import useAuth from '@base/hooks/useAuth';

// types
import { GuardProps } from '@base/types/auth';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@base/store/atoms/auth';

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }: GuardProps) => {
  const auth = useRecoilValue(authAtom);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  console.log('AuthGuard', isLoggedIn, auth);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signin', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return children;
};

export default AuthGuard;
