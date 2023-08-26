import usePost from '@base/hooks/usePost';
import { MenuSetting } from '@base/types/setting';
import { queryKeys } from '@settings/preferences/config/queryKeys';
import { GET_AUTO_CLOSE_TICKET_SETTING } from '@settings/preferences/services/graphql/desk';

export const useAutoCloseTicketSetting = () => {
  let queryKey = [queryKeys.menuSetting, 'desk', 'auto_close_ticket'];
  const response = usePost<MenuSetting>(queryKey, GET_AUTO_CLOSE_TICKET_SETTING, {});
  return response;
};
