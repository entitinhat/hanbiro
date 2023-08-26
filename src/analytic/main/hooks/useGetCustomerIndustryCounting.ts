import {BaseResponse} from "@base/types/response";
import {FilterInput} from "@base/types/common";
import {CustomerIndustryCounting} from "@analytic/main/types/interfaces/customer";
import usePost from "@base/hooks/usePost";
import {ANALYTIC_CUSTOMERINDUSTRYCOUNTING} from "@analytic/main/services/customerGraphql";
import {queryKeys} from "@analytic/main/config/queryKeys";

export const useGetCustomerIndustryCounting = (filter: FilterInput) => {
  return usePost<BaseResponse<CustomerIndustryCounting>>(
    [queryKeys.customerIndustryCounting, ''],
    ANALYTIC_CUSTOMERINDUSTRYCOUNTING,
    filter,
    {
      keepPreviousData: true
    }
  );
};