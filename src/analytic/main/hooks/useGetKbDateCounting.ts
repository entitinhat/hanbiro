import {KbDateCounting} from "@analytic/main/types/interfaces/desk";
import {DateCountingResponse} from "@analytic/main/types/interfaces";
import {FilterInput} from "@base/types/common";
import usePost from "@base/hooks/usePost";
import {ANALYTIC_KBDATECOUNTING} from "@analytic/main/services/deskGraphql";
import {keyStringify} from "@base/utils/helpers";
import {queryKeys} from "@analytic/main/config/queryKeys";

export const useGetKbDateCounting = (filter: FilterInput) => {
  return usePost<DateCountingResponse<KbDateCounting>>(
    [queryKeys.kbDateCounting, keyStringify(filter, '')],
    ANALYTIC_KBDATECOUNTING,
    filter,
  );
};