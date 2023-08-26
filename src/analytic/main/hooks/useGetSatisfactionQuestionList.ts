import {keyStringify} from "@base/utils/helpers";
import {FilterInput, IdName} from "@base/types/common";
import usePost from "@base/hooks/usePost";
import {BaseResponse} from "@base/types/response";
import {queryKeys} from "@analytic/main/config/queryKeys";
import {ANALYTIC_LISTSATISFACTIONQUESTIONS} from "@analytic/main/services/satisfactionGraphql";

export const useGetSatisfactionQuestionList = (filters: FilterInput = {}) => {
  return usePost<BaseResponse<IdName[]>>(
    [queryKeys.listSatisfactionQuestions, JSON.stringify(keyStringify(filters, ''))],
    ANALYTIC_LISTSATISFACTIONQUESTIONS,
    {filter: filters},
    {
      keepPreviousData: true
    }
  );
};