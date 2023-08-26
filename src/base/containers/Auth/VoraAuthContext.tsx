import React, { createContext, useEffect } from 'react';
import { AuthProps, VoraAuthContextType } from '@base/types/auth';
import { useRecoilState } from 'recoil';
import Storages from '@base/utils/storages/ls';
import { authAtom } from '@base/store/atoms/auth';

// ==============================|| Vora Auth CONTEXT & PROVIDER ||============================== //

const VoraAuthContext = createContext<VoraAuthContextType | null>(null);

export const VoraAuthProvider = ({ children }: { children: React.ReactElement }) => {
  const [auth, setAuth] = useRecoilState(authAtom);
  console.log('VoraAuthProvider', auth);
  const Ls = new Storages();

  //
  const login = () => {};
  const logout = () => {
    console.log('VoraAuthContext Logout');
    Ls.remove('token');
    setAuth({
      isLoggedIn: false,
      isInitialized: false,
      user: null,
      token: null
    });
  };
  const resetPassword = (email: string) => new Promise<void>((resolve, reject) => {});
  return (
    <VoraAuthContext.Provider
      value={{
        ...auth,
        login,
        logout,
        resetPassword
      }}
    >
      {children}
    </VoraAuthContext.Provider>
  );
};

export default VoraAuthContext;
