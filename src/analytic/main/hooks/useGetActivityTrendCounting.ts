import {queryKeys} from "@analytic/main/config/queryKeys";
import {ActivityTrendCountingResponse} from "@analytic/main/types/interfaces/activity";
import {FilterInput} from "@base/types/common";
import usePost from "@base/hooks/usePost";
import {keyStringify} from "@base/utils/helpers";
import {ANALYTIC_ACTIVITYTREND} from "@analytic/main/services/activityGraphql";

export const useGetActivityTrendCounting = (filter: FilterInput) => {
  return usePost<ActivityTrendCountingResponse>(
    [queryKeys.activityTrendCounting, keyStringify(filter, '')],
    ANALYTIC_ACTIVITYTREND,
    filter,
  );
};