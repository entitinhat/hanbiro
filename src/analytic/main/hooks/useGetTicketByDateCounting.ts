import {FilterInput} from "@base/types/common";
import usePost from "@base/hooks/usePost";
import {keyStringify} from "@base/utils/helpers";
import {queryKeys} from "@analytic/main/config/queryKeys";
import {TicketByDateCountingResponse, TicketDateCounting} from "@analytic/main/types/interfaces/desk";
import {ANALYTIC_TICKETBYDATECOUNTING} from "@analytic/main/services/deskGraphql";

export const useGetTicketByDateCounting = (filter: FilterInput) => {
  return usePost<TicketByDateCountingResponse<TicketDateCounting>>(
    [queryKeys.ticketByDateCounting, keyStringify(filter, '')],
    ANALYTIC_TICKETBYDATECOUNTING,
    filter,
  );
};