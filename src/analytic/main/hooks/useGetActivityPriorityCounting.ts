import {queryKeys} from "@analytic/main/config/queryKeys";
import {ANALYTIC_ACTIVITYBYPRIORITY} from "@analytic/main/services/activityGraphql";
import {FilterInput} from "@base/types/common";
import {ActivityResultsResponse} from "@analytic/main/types/interfaces/activity";
import usePost from "@base/hooks/usePost";
import {keyStringify} from "@base/utils/helpers";

export const useGetActivityPriorityCounting = (filter: FilterInput) => {
  return usePost<ActivityResultsResponse>(
    [queryKeys.activityByPriority, keyStringify(filter, '')],
    ANALYTIC_ACTIVITYBYPRIORITY,
    filter,
  );
};