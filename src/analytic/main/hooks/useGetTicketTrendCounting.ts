import {ANALYTIC_TICKETTRENDCOUNTING} from "@analytic/main/services/deskGraphql";
import {TicketTrendCountingResponse} from "@analytic/main/types/interfaces/desk";
import {FilterInput} from "@base/types/common";
import usePost from "@base/hooks/usePost";
import {keyStringify} from "@base/utils/helpers";
import {queryKeys} from "@analytic/main/config/queryKeys";

export const useGetTicketTrendCounting = (filter: FilterInput) => {
  return usePost<TicketTrendCountingResponse>(
    [queryKeys.ticketTrendCounting, keyStringify(filter, '')],
    ANALYTIC_TICKETTRENDCOUNTING,
    filter,
  );
};