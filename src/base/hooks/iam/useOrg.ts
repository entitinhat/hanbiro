import { IAMContex } from '@base/contexts/IAMContext';
import { ProductType } from '@base/types/iam';
import { productType } from '@base/utils/vora';
import { useContext } from 'react';

// const {id} = useOrg();
export function useOrg() {
  const context = useContext(IAMContex);
  if (!context) throw new Error('context must be use inside provider');
  //flow:
  // 1. Get Org by domain
  // 2. Return Org information
  const { tenant } = context;
  return {
    id: tenant?.orgId ?? 'org',
    tenantId: tenant?.id ?? 'org',
    // @Todo: tenant?.productType ?? ProductType.DESK use it production
    productType: productType()
  };
}
