import {FilterInput} from "@base/types/common";
import usePost from "@base/hooks/usePost";
import {keyStringify} from "@base/utils/helpers";
import {queryKeys} from "@analytic/main/config/queryKeys";
import {BaseResponse} from "@base/types/response";
import {TicketCategoryCounting} from "@analytic/main/types/interfaces/desk";
import {ANALYTIC_TICKETCATEGORY} from "@analytic/main/services/deskGraphql";

export const useGetTicketCategoryCounting = (filter: FilterInput) => {
  return usePost<BaseResponse<TicketCategoryCounting>>(
    [queryKeys.ticketCategory, keyStringify(filter, '')],
    ANALYTIC_TICKETCATEGORY,
    filter,
  );
};