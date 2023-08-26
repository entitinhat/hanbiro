import {FilterInput} from "@base/types/common";
import usePost from "@base/hooks/usePost";
import {keyStringify} from "@base/utils/helpers";
import {queryKeys} from "@analytic/main/config/queryKeys";
import {
  ANALYTIC_SUSCLICKCOUNTING
} from "@analytic/main/services/susGraphql";
import {BaseResponse} from "@base/types/response";
import {DateNumber} from "@analytic/main/types/interfaces";

export default (variables: FilterInput) => {
  return usePost<BaseResponse<DateNumber>>(
    [queryKeys.susClickCounting, keyStringify(variables, '')],
    ANALYTIC_SUSCLICKCOUNTING,
    variables
  );
};