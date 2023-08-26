import { queryKeys } from '@quote/config/queryKeys';
import usePosts from '@base/hooks/usePosts';
import { keyStringify } from '@base/utils/helpers';
import {getListQuery} from "@base/utils/helpers/schema";
import {MENU_QUOTE} from "@base/config/menus";
import {Quote} from "@quote/types/interfaces";

export const useQuoteList = (schema: string, params: any, opts?: any) => {
  const fallback = { data: [], paging: undefined };
  const {
    data: results = fallback,
    refetch,
    status
  } = usePosts<Quote[]>(
    [queryKeys.listQuote, keyStringify(params?.filter, '')],
    getListQuery(`${MENU_QUOTE}_quotes`, schema),
    params,
    opts
  );

  return { results, refetch, status };
};
