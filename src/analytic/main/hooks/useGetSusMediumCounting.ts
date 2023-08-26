import {queryKeys} from "@analytic/main/config/queryKeys";
import {FilterInput} from "@base/types/common";
import usePost from "@base/hooks/usePost";
import {keyStringify} from "@base/utils/helpers";
import {getQueryString} from "@analytic/main/services";
import {ANALYTIC_IDNAME_NUMBER_COUNTING_SCHEMA} from "@analytic/main/services/susGraphql";
import {BaseResponse} from "@base/types/response";
import {IdNameNumber} from "@analytic/main/types/interfaces";

export default (variables: FilterInput) => {
  return usePost<BaseResponse<IdNameNumber>>(
    [queryKeys.susMediumCounting, keyStringify(variables, '')],
    getQueryString(queryKeys.susMediumCounting, ANALYTIC_IDNAME_NUMBER_COUNTING_SCHEMA),
    variables,
  );
};