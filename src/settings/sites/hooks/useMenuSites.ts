import usePosts from '@base/hooks/usePosts';
import { FilterInput } from '@base/types/common';
import { GET_ALL_MENU_SITE } from '../services/graphql';
import { MenuSite } from '../types/site';
import { keyStringify } from '@base/utils/helpers';

export const useMenuSites = (filter: FilterInput, query?: string, options?: any) => {
  let queryKey = ['setting_siteTemplates', keyStringify(filter, '')];
  let params = {
    filter
  };
  const response = usePosts<MenuSite[]>(queryKey, GET_ALL_MENU_SITE(query), params, options);
  return response;
};
