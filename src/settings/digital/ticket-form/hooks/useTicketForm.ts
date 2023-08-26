import { usePost } from '@base/hooks/usePost';
import { customerQueryKeys } from '@customer/config/queryKeys';
import { getViewQuery } from '@base/utils/helpers/schema';
import { Customer } from '@customer/types/interface';
import { queryKeys } from '../config/queryKeys';

export const useTicketForm = (schemas: string, id: string, options?: any) => {
  const queryKey: string[] = [queryKeys.ticketFormGet, id, 'view'];
  // TODO issue remove schemas usePost don't work

  const query: string = getViewQuery({ queryKey, schemas });
  const variables: any = {
    id: id
  };
  const response = usePost<any>(queryKey, query, variables, {
    ...options,
    enabled: schemas.length > 0
    // cacheTime: 0
  });
  return response;
};
