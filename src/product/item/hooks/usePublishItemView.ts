import usePublicPost from '@base/hooks/publics/usePublicPost';
import { queryKeys } from '../config/queryKeys';
import { GET_ITEM_VIEW } from '../services/graphql';

export const usePublishItemView = (id: string) => {
  const result = usePublicPost<any>([queryKeys.viewItem, id], GET_ITEM_VIEW, { id: id });
  return result;
};
