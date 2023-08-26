import { queryKeys } from '@base/config/queryKeys';
import { GET_AVAILABLE_MENUS_LICENSE } from '@base/services/graphql/license';
import { MenuLicense } from '@base/types/license';
import { baseUrl } from '@base/utils/vora';
import usePosts from '../usePosts';

export const useAvailableMenusLicense = () => {
  const prodType = baseUrl();
  let queryKey = [queryKeys.availableMenusLicense, prodType];
  const params = {};
  const response = usePosts<MenuLicense[]>(queryKey, GET_AVAILABLE_MENUS_LICENSE, params, {});
  return response;
};
