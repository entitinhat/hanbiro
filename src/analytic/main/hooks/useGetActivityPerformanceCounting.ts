import {ActivityPerformanceCounting} from "@analytic/main/types/interfaces/activity";
import {BaseResponse} from "@base/types/response";
import {FilterInput} from "@base/types/common";
import {ANALYTIC_ACTIVITYPERFORMANCE} from "@analytic/main/services/activityGraphql";
import usePost from "@base/hooks/usePost";
import {keyStringify} from "@base/utils/helpers";
import {queryKeys} from "@analytic/main/config/queryKeys";

export const useGetActivityPerformanceCounting = (filter: FilterInput) => {
  return usePost<BaseResponse<ActivityPerformanceCounting>>(
    [queryKeys.activityPerformance, keyStringify(filter, '')],
    ANALYTIC_ACTIVITYPERFORMANCE,
    filter,
  );
};