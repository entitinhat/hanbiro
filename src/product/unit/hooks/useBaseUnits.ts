import { queryKeys } from '@product/unit/config/queryKeys';
import { PaginateInput } from '@base/types/common';
import usePosts from '@base/hooks/usePosts';
import { GET_PRODUCT_BASE_UNIT } from '../services/graphql';
import { BaseUnit } from '../types/unit';
import { DESC } from '@base/config/constant';
import { KEY_UNIT_CREATED_AT } from '../config/keyNames';

interface Props {
  keyword?: string;
  paging?: PaginateInput;
}

export const useBaseUnits = ({ keyword, paging }: Props) => {
  let query = '';
  if (keyword) {
    query += `name:\"${keyword}\"`;
  }

  let queryKey = [queryKeys.listBaseUnits, keyword, paging];
  const response = usePosts<BaseUnit[]>(queryKey, GET_PRODUCT_BASE_UNIT, {
    filter: {
      query,
      paging,
      sort: {
        field: KEY_UNIT_CREATED_AT,
        orderBy: DESC
      }
    }
  });
  return response;
};
