import { queryKeys } from '@product/unit/config/queryKeys';
import { IdName, PaginateInput } from '@base/types/common';
import usePosts from '@base/hooks/usePosts';
import { GET_PRODUCT_UNIT_VALUES } from '../services/graphql';
import { UnitValue } from '../types/unit';
import { DESC } from '@base/config/constant';

interface Props {
  unit?: IdName;
  keyword?: string;
  paging?: PaginateInput;
  opts: any;
}

export const useUnitValues = ({ keyword, paging, unit, opts }: Props) => {
  let query = '';
  if (keyword) {
    query += `name:\"${keyword}\"`;
  }

  if (unit && unit.id) {
    query += `unitId=\"${unit.id}\"`;
  }

  let queryKey = [queryKeys.listUnitValues, query, paging];
  const response = usePosts<UnitValue[]>(
    queryKey,
    GET_PRODUCT_UNIT_VALUES,
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
