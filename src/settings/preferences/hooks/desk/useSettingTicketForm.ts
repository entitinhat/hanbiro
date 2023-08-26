import usePost from '@base/hooks/usePost';
import { FilterInput } from '@base/types/common';
import { BaseResponse } from '@base/types/response';
import { queryKeys } from '@settings/preferences/config/desk/queryKeys';
import { GET_ALL_TICKET_FORM } from '@settings/preferences/services/graphql/desk';
import { DeskSettingTicketForm } from '@settings/preferences/types/desk/settingTicketForm';

interface Params {
  keyword: string;
}
export const useSettingTicketForm = ({ keyword }: Params) => {
  let filter: FilterInput = {
    query: `name:${keyword}`
  };
  let queryKey = [queryKeys.settingTicketForm];
  let params = {
    filter
  };
  const response = usePost<BaseResponse<DeskSettingTicketForm[]>>(queryKey, GET_ALL_TICKET_FORM, params, {
    // initialData: settingTicketCategories(), // init fake data
  });
  return response;
};
