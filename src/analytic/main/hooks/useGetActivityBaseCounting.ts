import {queryKeys} from "@analytic/main/config/queryKeys";
import {BaseResponse} from "@base/types/response";
import {ANALYTIC_ACTIVITYBASECOUNTING} from "@analytic/main/services/activityGraphql";
import {FilterInput} from "@base/types/common";
import usePost from "@base/hooks/usePost";
import {GeneralCounting} from "@analytic/main/types/interfaces/activity";
import {keyStringify} from "@base/utils/helpers";

export const useGetActivityBaseCounting = (filter: FilterInput) => {
  return usePost<BaseResponse<GeneralCounting> | any>(
    [queryKeys.activityBaseCounting, keyStringify(filter, '')],
    ANALYTIC_ACTIVITYBASECOUNTING,
    filter
  );
};