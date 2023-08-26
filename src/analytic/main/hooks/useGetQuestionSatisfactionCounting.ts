import {FilterInput} from "@base/types/common";
import usePost from "@base/hooks/usePost";
import {keyStringify} from "@base/utils/helpers";
import {queryKeys} from "@analytic/main/config/queryKeys";
import {SatisfactionCounting} from "@analytic/main/types/interfaces/satisfaction";
import {
  ANALYTIC_QUESTIONSATISFACTIONCOUNTING
} from "@analytic/main/services/satisfactionGraphql";

export const useGetQuestionSatisfactionCounting = (filter: FilterInput) => {
  return usePost<SatisfactionCounting>(
    [queryKeys.satisfactionQuestionSatisfactionCounting, keyStringify(filter, '')],
    ANALYTIC_QUESTIONSATISFACTIONCOUNTING,
    {filter}
  );
};