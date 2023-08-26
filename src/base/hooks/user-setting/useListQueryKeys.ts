import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { SearchFilter } from '@base/types/app';
import { FilterInput } from '@base/types/common';
import { keyStringify } from '@base/utils/helpers';

export function useListQueryKeys(pageDataKey: string, filterQueryFn?: (filter?: SearchFilter) => string) {
  let listQueryKey = [];
  const { keyword, sort, paging, filterQuery } = useListPageSettings(pageDataKey, filterQueryFn);
  const filtersQuery: FilterInput = {
    keyword: keyword,
    sort: sort,
    paging: paging,
    query: filterQuery
  };
  const filterKey = keyStringify(filtersQuery, '');
  listQueryKey = [filterKey];
  return { listQueryKey };
}
