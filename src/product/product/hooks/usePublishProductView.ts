import usePublicPost from '@base/hooks/publics/usePublicPost';
import { queryKeys } from '../config/queryKeys';
import { GET_PRODUCT_VIEW } from '../services/graphql';

export const usePublishProductView = (id: string) => {
  const result = usePublicPost<any>([queryKeys.viewProduct, id], GET_PRODUCT_VIEW, { id: id });
  return result;
};
