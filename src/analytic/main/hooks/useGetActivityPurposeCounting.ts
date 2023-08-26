import {queryKeys} from "@analytic/main/config/queryKeys";
import {BaseResponse} from "@base/types/response";
import {ANALYTIC_ACTIVITYBYPURPOSE} from "@analytic/main/services/activityGraphql";
import {FilterInput} from "@base/types/common";
import usePost from "@base/hooks/usePost";
import {ActivityPurposeCounting} from "@analytic/main/types/interfaces/activity";
import {keyStringify} from "@base/utils/helpers";

export const useGetActivityPurposeCounting = (filter: FilterInput) => {
  return usePost<BaseResponse<ActivityPurposeCounting>>(
    [queryKeys.activityByPurpose, keyStringify(filter, '')],
    ANALYTIC_ACTIVITYBYPURPOSE,
    filter,
  );
};