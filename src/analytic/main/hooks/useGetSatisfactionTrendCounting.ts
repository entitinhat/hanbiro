import {queryKeys} from "@analytic/main/config/queryKeys";
import {FilterInput} from "@base/types/common";
import usePost from "@base/hooks/usePost";
import {keyStringify} from "@base/utils/helpers";
import {ANALYTIC_SATISFACTIONTRENDCOUNTING} from "@analytic/main/services/satisfactionGraphql";
import {SatisfactionTrendCountingResponse} from "@analytic/main/types/interfaces/satisfaction";

export const useGetSatisfactionTrendCounting = (filter: FilterInput) => {
  return usePost<SatisfactionTrendCountingResponse>(
    [queryKeys.satisfactionTrendCounting, keyStringify(filter, '')],
    ANALYTIC_SATISFACTIONTRENDCOUNTING,
    filter,
  );
};