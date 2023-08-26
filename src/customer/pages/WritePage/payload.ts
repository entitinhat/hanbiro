import { CUSTOMER_CATEGORY_ACCOUNT } from '@customer/config/constants';

export const finalizeParams = (configParams: any, category: string) => {
  const newParams = { ...configParams };

  newParams.category = category === CUSTOMER_CATEGORY_ACCOUNT ? 'CATEGORY_ACCOUNT' : 'CATEGORY_CONTACT';

  return newParams;
};
