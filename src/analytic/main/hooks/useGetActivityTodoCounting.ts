import {queryKeys} from "@analytic/main/config/queryKeys";
import {BaseResponse} from "@base/types/response";
import {FilterInput} from "@base/types/common";
import {ANALYTIC_ACTIVITYTODOCOUNTING} from "@analytic/main/services/activityGraphql";
import usePost from "@base/hooks/usePost";
import {GeneralCounting} from "@analytic/main/types/interfaces/activity";
import {keyStringify} from "@base/utils/helpers";

export const useGetActivityTodoCounting = (filter: FilterInput) => {
  return  usePost<BaseResponse<GeneralCounting> | any>(
    [queryKeys.activityTodoCounting, keyStringify(filter, '')],
    ANALYTIC_ACTIVITYTODOCOUNTING,
    filter
  );
};