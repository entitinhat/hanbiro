import { queryKeys } from '@desk/ticket/config/queryKeys';
import { getListQuery } from '@desk/ticket/services/graphql';
import usePosts from '@base/hooks/usePosts';
import { keyStringify } from '@base/utils/helpers';
import { Ticket } from '../types/ticket';
import { getViewQuery, RESTORE_SCHEMA } from '@base/utils/helpers/schema';

export const useTicketList = (schema: string, params: any, opts?: any) => {
  const usePostResult = usePosts<Ticket[]>(
    [queryKeys.listTicket, keyStringify(params?.filter, '')],
    getListQuery([schema, RESTORE_SCHEMA].join('\n')),
    params,
    opts
  );

  return usePostResult;
};
