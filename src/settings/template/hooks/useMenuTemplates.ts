import usePosts from '@base/hooks/usePosts';
import { FilterInput } from '@base/types/common';
import { GET_ALL_MENU_TEMPLATE } from '../services/graphql';
import { MenuTemplate } from '../types/template';
import { keyStringify } from '@base/utils/helpers';
import { queryKeys } from '../config/queryKeys';
export const useMenuTemplates = (filter: FilterInput, query?: string, options?: any) => {
  let queryKey = [queryKeys.settingMenuTemplatesGet, keyStringify(filter, '')];
  let params = {
    filter
  };
  const response = usePosts<MenuTemplate[]>(queryKey, GET_ALL_MENU_TEMPLATE(query), params, options);
  return response;
};
