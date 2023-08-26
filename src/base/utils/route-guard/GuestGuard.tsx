import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project import
import config from '@base/config/config';
import useAuth from '@base/hooks/useAuth';

// types
import { GuardProps } from '@base/types/auth';

// ==============================|| GUEST GUARD ||============================== //

const GuestGuard = ({ children }: GuardProps) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  console.log('GuestGuard', isLoggedIn);

  useEffect(() => {
    if (
      isLoggedIn &&
      location.pathname.indexOf('/signup') === -1 &&
      location.pathname.indexOf('/site') === -1 &&
      location.pathname.indexOf('/public') === -1
    ) {
      navigate(config.defaultPath, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return children;
};

export default GuestGuard;
