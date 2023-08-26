import {TicketBaseCountingResponse} from "@analytic/main/types/interfaces/desk";
import {FilterInput} from "@base/types/common";
import {ANALYTIC_TICKETBASECOUNTING} from "@analytic/main/services/deskGraphql";
import usePost from "@base/hooks/usePost";
import {keyStringify} from "@base/utils/helpers";
import {queryKeys} from "@analytic/main/config/queryKeys";

export const useGetTicketBaseCounting = (filter: FilterInput) => {
  return usePost<TicketBaseCountingResponse>(
    [queryKeys.ticketBaseCounting, keyStringify(filter, '')],
    ANALYTIC_TICKETBASECOUNTING,
    filter,
  );
};