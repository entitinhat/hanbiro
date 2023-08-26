import { IdName, PaginateInput } from '@base/types/common';
import usePosts from '@base/hooks/usePosts';
import { AttributeValue } from '../types/attribute';
import { queryKeys } from '@product/attribute/config/queryKeys';
import { GET_PRODUCT_ATTRIBUTE_VALUES } from '../services/graphql';
import { DESC } from '@base/config/constant';

interface Props {
  keyword?: string;
  paging?: PaginateInput;
  attr?: IdName;
  opts: any;
}

export const useAttributeValues = ({ keyword, paging, attr, opts }: Props) => {
  let query = '';
  if (keyword) {
    query += `name:\"${keyword}\"`;
  }

  if (attr && attr.id) {
    query += `attrId=\"${attr.id}\"`;
  }

  let queryKey = [queryKeys.listAttributeValues, query, paging];
  const response = usePosts<AttributeValue[]>(
    queryKey,
    GET_PRODUCT_ATTRIBUTE_VALUES,
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
    { ...opts }
  );
  return response;
};
