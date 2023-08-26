import { usePost } from '@base/hooks/usePost';
import { getViewQuery } from '@base/utils/helpers/schema';
import { queryKeys } from '@product/unit/config/queryKeys';
import { BaseUnit } from '../types/unit';
import { RESTORE_SCHEMA } from '@base/utils/helpers/schema';

export const useBaseUnit = (schemas: string, id: string, options?: any) => {
  const queryKey: string[] = [queryKeys.viewBaseUnit, id];

  const query: string = getViewQuery({ queryKey, schemas: [schemas, RESTORE_SCHEMA].join('\n') });
  const variables: any = {
    id: id
  };
  const response = usePost<BaseUnit>(queryKey, query, variables, {
    ...options,
    enabled: schemas.length > 0
    // cacheTime: 0
  });
  return response;
};
