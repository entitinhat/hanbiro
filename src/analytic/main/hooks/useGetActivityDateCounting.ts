import {queryKeys} from "@analytic/main/config/queryKeys";
import {ANALYTIC_ACTIVITYDATECOUNTING} from "@analytic/main/services/activityGraphql";
import {ActivityDateCountingResponse} from "@analytic/main/types/interfaces/activity";
import {FilterInput} from "@base/types/common";
import usePost from "@base/hooks/usePost";
import {keyStringify} from "@base/utils/helpers";

export const useGetActivityDateCounting = (filter: FilterInput, opts?: {forWhichChart?: string}) => {
  return usePost<ActivityDateCountingResponse>(
    [queryKeys.activityDateCounting, {...(opts?.forWhichChart ? {for: opts?.forWhichChart} : {}), ...keyStringify(filter, '')}],
    ANALYTIC_ACTIVITYDATECOUNTING,
    filter,
  );
};