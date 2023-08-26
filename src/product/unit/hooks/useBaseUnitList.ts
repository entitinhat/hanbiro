import usePosts from '@base/hooks/usePosts';
import { keyStringify } from '@base/utils/helpers';
import { getListQuery } from '@base/utils/helpers/schema';
import { queryKeys } from '@product/unit/config/queryKeys';
import { BaseUnit } from '../types/unit';
import { RESTORE_SCHEMA } from '@base/utils/helpers/schema';

export const useBaseUnitList = (schema: string, params: any, opts?: any) => {
  const fallback = { data: [], paging: undefined };
  const {
    data: results = fallback,
    refetch,
    status
  } = usePosts<BaseUnit[]>(
    [queryKeys.listBaseUnits, keyStringify(params?.filter, '')],
    getListQuery(queryKeys.listBaseUnits, [schema, RESTORE_SCHEMA].join('\n')),
    params,
    opts
  );

  return { results, refetch, status };
};
