import usePost from '@base/hooks/usePost';
// import { ResponseData } from '@base/types/response';
import { Paging } from '@base/types/response';
import { keyStringify } from '@base/utils/helpers';
import { queryKeys } from '@desk/ticket/config/queryKeys';
import { GET_ALL_TICKETS_BY_TAG } from '@settings/preferences/services/graphql/desk';
import { ITicketByTag } from '@settings/preferences/types/desk/ticketByTag';

interface ResponseData<T> {
  results: T[];
  paging: Paging;
}

export const useGetAllTicketByTag = (params: any) => {
  const query = params?.filter?.query ?? '';
  let queryKey = [queryKeys.listTicket, keyStringify(params?.filter, '')];
  const response = usePost<ResponseData<ITicketByTag>>(queryKey, GET_ALL_TICKETS_BY_TAG, params, {});
  return response;
};
