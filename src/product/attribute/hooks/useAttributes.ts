import { PaginateInput } from '@base/types/common';
import usePosts from '@base/hooks/usePosts';
import { Attribute } from '../types/attribute';
import { queryKeys } from '@product/attribute/config/queryKeys';
import { GET_PRODUCT_ATTRIBUTES } from '../services/graphql';
import { DESC } from '@base/config/constant';

interface Props {
  keyword?: string;
  paging?: PaginateInput;
  options?: any;
}

export const useAttributes = ({ keyword, paging, options }: Props) => {
  let query = '';
  if (keyword) {
    query += `name:\"${keyword}\"`;
  }

  let queryKey = [queryKeys.listAttributes, query, paging];
  const response = usePosts<Attribute[]>(
    queryKey,
    GET_PRODUCT_ATTRIBUTES,
    {
      filter: {
        query,
        paging,
        sort: {
          field: 'createdAt',
          orderBy: DESC
        }
      }
    },
    { ...options }
  );
  return response;
};
