import { queryKeys } from '@product/group/config/queryKeys';
import { PaginateInput } from '@base/types/common';
import usePosts from '@base/hooks/usePosts';
import { PRODUCT_GROUPS_GET } from '../services/graphql';
import { DESC, ASC } from '@base/config/constant';

interface Props {
  keyword?: string;
  parentId?: string;
  paging?: PaginateInput;
}

export const useProductGroups = ({ keyword, parentId, paging }: Props) => {
  let query = '';
  if (keyword) {
    query += `name:\"${keyword}\"`;
  }
  if (parentId !== undefined) {
    query += ` parentId:\"${parentId}\"`;
  }

  let queryKey = [queryKeys.listProductGroups, query, paging];
  const response = usePosts<any[]>(queryKey, PRODUCT_GROUPS_GET, {
    filter: {
      query,
      paging,
      sort: {
        field: 'createdAt',
        orderBy: ASC
      }
    }
  });
  return response;
};
