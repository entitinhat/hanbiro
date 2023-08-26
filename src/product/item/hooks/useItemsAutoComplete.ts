import usePosts from '@base/hooks/usePosts';
import usePublicPosts from '@base/hooks/publics/usePublicPosts';
import { keyStringify } from '@base/utils/helpers';
import { queryKeys } from '@product/item/config/queryKeys';
import { GET_ITEMS } from '../services/graphql';

export const useItemsAutoComplete = (params: any, isPublic?: boolean) => {
  let usePostResult = null;
  if (isPublic) {
    usePostResult = usePublicPosts<any[]>([queryKeys.listTrackingItem, keyStringify(params?.filter, '')], GET_ITEMS, params);
  } else {
    usePostResult = usePosts<any[]>([queryKeys.listItem, keyStringify(params?.filter, '')], GET_ITEMS, params);
  }

  return usePostResult;
};
