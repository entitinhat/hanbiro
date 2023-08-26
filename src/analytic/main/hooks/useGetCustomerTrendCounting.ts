import {FilterInput} from "@base/types/common";
import {CustomerCounting} from "@analytic/main/types/interfaces/customer";
import usePost from "@base/hooks/usePost";
import {TrendCountingResponse} from "@analytic/main/types/interfaces";
import {keyStringify} from "@base/utils/helpers";
import {ANALYTIC_CUSTOMERTRENDCOUNTING} from "@analytic/main/services/customerGraphql";
import {queryKeys} from "@analytic/main/config/queryKeys";

export const useGetCustomerTrendCounting = (filter: FilterInput) => {
  return usePost<TrendCountingResponse<CustomerCounting>>(
    [queryKeys.customerTrendCounting, keyStringify(filter, '')],
    ANALYTIC_CUSTOMERTRENDCOUNTING,
    filter,
    {
      // enabled: !!filter?.query,
      keepPreviousData: true
    }
  );
};