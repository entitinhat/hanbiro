import {FilterInput} from "@base/types/common";
import usePost from "@base/hooks/usePost";
import {keyStringify} from "@base/utils/helpers";
import {queryKeys} from "@analytic/main/config/queryKeys";
import {TicketBaseCountingResponse} from "@analytic/main/types/interfaces/desk";
import {ANALYTIC_TICKETPERFORMANCE} from "@analytic/main/services/deskGraphql";

export const useGetTicketPerformanceCounting = (filter: FilterInput) => {
  return usePost<TicketBaseCountingResponse>(
    [queryKeys.ticketPerformance, keyStringify(filter, '')],
    ANALYTIC_TICKETPERFORMANCE,
    filter,
  );
};