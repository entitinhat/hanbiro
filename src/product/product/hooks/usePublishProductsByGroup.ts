import usePublicPosts from '@base/hooks/publics/usePublicPosts';
import { queryKeys } from '../config/queryKeys';
import { GET_PUBLISH_PRODUCT_LIST } from '../services/graphql';

export const usePublishProductsByGroup = ({ groupId, paging }: any) => {
  const menu = queryKeys.listProduct;
  let params = {
    filter: {
      // paging: paging || { page: 1, size: 999 },
      query: `groupId=\"${groupId}\"`
    }
  };
  const usePostResult = usePublicPosts<any[]>([menu, groupId, paging], GET_PUBLISH_PRODUCT_LIST, params, {
    enabled: groupId.length > 0
  });

  return usePostResult;
};
