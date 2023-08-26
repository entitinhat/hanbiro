import usePost from '@base/hooks/usePost';
import { GET_MENU_TEMPLATE_DETAIL } from '../services/graphql';

export const useMenuTemplateDetail = (id: string) => {
  const response = usePost<any>(['setting_menuTemplate', id], GET_MENU_TEMPLATE_DETAIL, { id }, { enabled: id.length > 0 });
  return response;
};
