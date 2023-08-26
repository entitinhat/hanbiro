import { useTenant } from '@base/hooks/iam/useTenant';
import { useMe } from '@base/hooks/iam/useMe';
import { User, Tenant, ProductType } from '@base/types/iam';

import _ from 'lodash';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { authAtom } from '@base/store/atoms/auth';
import { AuthProps } from '@base/types/auth';
import Loader from '@base/components/App/Loader';

export type IAMContextType = {
  tenant: Tenant | null;
};

const IAMContex = createContext<IAMContextType | null>(null);

type IAMProviderProps = {
  children: ReactNode;
};

const IAMProvider = ({ children }: IAMProviderProps) => {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [auth, setAuth] = useRecoilState(authAtom);
  const [orgId, setOrgId] = useState<string>('');
  const host = location.host === 'localhost:8080' ? 'https://iam.habin.io' : location.host;
  const url = location.protocol + '//' + host + location.pathname;
  const { data: tenantData, isLoading: isTenantLoading } = useTenant();
  const { data: userData, isLoading: isUserLoading } = useMe(orgId, { useErrorBoundary: false });
  // for dev mode
  // const tenantTemp: Tenant = {
  //   id: 'org',
  //   orgId: 'org',
  //   productType: ProductType.GENERIC_PRODUCT,
  //   domain: '',
  //   path: '',
  //   urls: []
  // };
  // const userTemp: User = {
  //   id: '8S6wUoVSJE',
  //   displayName: 'Viet HM',
  //   primaryEmail: 'hoangminhviet2223@gmail.com',
  //   primaryPhone: '0982222132',
  //   orgId: '',
  //   fullName: '',
  //   urlName: '',
  //   emails: [],
  //   phones: []
  // };
  // useEffect(() => {
  //   setTenant(tenantTemp);
  //   setOrgId(tenantTemp.id);
  //   const newAuth: AuthProps = {
  //     ...auth,
  //     isLoggedIn: true,
  //     user: userTemp
  //   };
  //   setAuth(newAuth);
  // }, []);
  // end for dev mode
  useEffect(() => {
    if (!isTenantLoading && tenantData) {
      setTenant(tenantData);
      setOrgId(tenantData.orgId);
    }
    if (!isTenantLoading && !tenantData) {
      // @TODO go to tenant not foud
    }
  }, [tenantData]);
  useEffect(() => {
    console.log('IAMProvider', userData, isUserLoading);
    if (!isUserLoading && userData?.id !== '') {
      const newAuth: AuthProps = {
        ...auth,
        isLoggedIn: true,
        user: userData
      };
      setAuth(newAuth);
    } else if (!isUserLoading && !userData) {
    }
  }, [userData]);

  return (
    <IAMContex.Provider value={{ tenant }}>
      {isTenantLoading || isUserLoading ? <Loader /> : <></>}
      {!isTenantLoading && !isUserLoading && children}
      {/* {children} */}
    </IAMContex.Provider>
  );
};

export { IAMContex, IAMProvider };
