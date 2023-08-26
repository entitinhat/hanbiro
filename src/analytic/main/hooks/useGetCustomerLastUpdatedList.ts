import { Customer } from '@analytic/main/types/interfaces/customer';
import { keyStringify } from '@base/utils/helpers';
import { queryKeys } from '@analytic/main/config/queryKeys';
import { getListQuery } from '@base/utils/helpers/schema';
import useInfinitePosts from '@base/hooks/useInfinitePosts';

export const useGetCustomerLastUpdatedList = (params: any) => {
  const queryKey = [queryKeys.lastUpdatedCustomers, params.filter.paging.page || 1];

  return useInfinitePosts<Customer[]>(
    queryKey,
    getListQuery(
      queryKeys.lastUpdatedCustomers,
      `
      id
      code
      name
      updatedAt`
    ),
    params,
    {
      keepPreviousData: true
    }
  );
};
