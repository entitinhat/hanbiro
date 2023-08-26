import {queryKeys} from "@analytic/main/config/queryKeys";
import {ResponsePaging} from "@base/types/response";
import {FilterInput} from "@base/types/common";
import usePost from "@base/hooks/usePost";
import {ANALYTIC_ACTIVITIES} from "@analytic/main/services/activityGraphql";
import {keyStringify} from "@base/utils/helpers";
import {Activity} from "@analytic/main/types/interfaces/activity";

export const useGetActivityTodoList = (filter: FilterInput) => {
  return usePost<ResponsePaging<Activity> | any>(
    [queryKeys.activities, keyStringify(filter, '')],
    ANALYTIC_ACTIVITIES,
    filter,
  );
};