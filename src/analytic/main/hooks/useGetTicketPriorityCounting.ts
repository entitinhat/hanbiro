import {FilterInput} from "@base/types/common";
import usePost from "@base/hooks/usePost";
import {keyStringify} from "@base/utils/helpers";
import {queryKeys} from "@analytic/main/config/queryKeys";
import {TicketPriorityCountingResult} from "@analytic/main/types/interfaces/desk";
import {BaseResponse} from "@base/types/response";
import {ANALYTIC_TICKETPRIORITY} from "@analytic/main/services/deskGraphql";

export const useGetTicketPriorityCounting = (filter: FilterInput) => {
  return usePost<BaseResponse<TicketPriorityCountingResult>>(
    [queryKeys.ticketPriority, keyStringify(filter, '')],
    ANALYTIC_TICKETPRIORITY,
    filter,
  );
};