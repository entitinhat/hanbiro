import { usePost } from '@base/hooks/usePost';
import { customerQueryKeys } from '@customer/config/queryKeys';
import { getViewQuery, RESTORE_SCHEMA } from '@base/utils/helpers/schema';
import { Customer } from '@customer/types/interface';

export const useCustomer = (schemas: string, id: string, options?: any) => {
  const queryKey: string[] = [customerQueryKeys.customerGet, id, 'view'];
  // TODO issue remove schemas usePost don't work

  const query: string = getViewQuery({ queryKey, schemas: [schemas, RESTORE_SCHEMA].join('\n') });
  const variables: any = {
    id: id
  };
  const response = usePost<Customer>(queryKey, query, variables, {
    enabled: schemas.length > 0,
    ...options
    // cacheTime: 0
  });
  return response;
};
