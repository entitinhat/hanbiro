import usePosts from '@base/hooks/usePosts';
import { FilterInput } from '@base/types/common';
// import { GET_ALL_MENU_TEMPLATE } from '../services/graphql';
import { GET_ALL_MENU_TEMPLATE } from '@settings/template/services/graphql';
// import { MenuTemplate } from '../types/template';
import { MenuTemplate } from '@settings/template/types/template';
import { keyStringify } from '@base/utils/helpers';

export const useListTemplate = (filter: FilterInput, query?: string, options?: any) => {
  let queryKey = ['setting_menuTemplates', keyStringify(filter, '')];
  let params = {
    filter
  };
  const response = usePosts<MenuTemplate[]>(queryKey, GET_ALL_MENU_TEMPLATE(query), params, options);
  return response;
};