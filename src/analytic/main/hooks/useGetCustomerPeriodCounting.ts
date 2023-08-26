import {DateCountingResponse, DateCountingResult} from "@analytic/main/types/interfaces";
import {FilterInput} from "@base/types/common";
import {CustomerCounting} from "@analytic/main/types/interfaces/customer";
import usePost from "@base/hooks/usePost";
import {keyStringify} from "@base/utils/helpers";
import {getDateCountingQueryString} from "@analytic/main/services/customerGraphql";
import {queryKeys} from "@analytic/main/config/queryKeys";

export const useGetCustomerPeriodCounting = (filter: FilterInput) => {
  return usePost<DateCountingResponse<DateCountingResult<CustomerCounting>>>(
    [queryKeys.customerPeriodCounting, keyStringify(filter, '')],
    getDateCountingQueryString(
      queryKeys.customerPeriodCounting,
      `
      counting {
        total
        account
        contact       
      }
    `,
    ),
    filter,
    {
      keepPreviousData: true
    }
  );
};