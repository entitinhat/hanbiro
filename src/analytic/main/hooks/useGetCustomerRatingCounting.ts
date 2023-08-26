import {DateCountingResponse, DateCountingsResult} from "@analytic/main/types/interfaces";
import {getDateCountingQueryString} from "@analytic/main/services/customerGraphql";
import {FilterInput} from "@base/types/common";
import {CustomerRatingCounting} from "@analytic/main/types/interfaces/customer";
import usePost from "@base/hooks/usePost";
import {keyStringify} from "@base/utils/helpers";
import {queryKeys} from "@analytic/main/config/queryKeys";

export const useGetCustomerRatingCounting = (filter: FilterInput) => {
  return usePost<DateCountingResponse<DateCountingsResult<CustomerRatingCounting>>>(
    [queryKeys.customerRatingCounting, keyStringify(filter, '')],
    getDateCountingQueryString(
      queryKeys.customerRatingCounting,
      `
      countings {
        rating {
          id
          keyName
          languageKey
        }
        counting{
          total
        }
      }
    `,
    ),
    filter,
    {
      keepPreviousData: true
    }
  );
};