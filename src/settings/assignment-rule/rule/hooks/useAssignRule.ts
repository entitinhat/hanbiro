import { usePost } from '@base/hooks/usePost';
import { queryKeys } from '@settings/assignment-rule/rule/config/queryKeys';
import { getViewQuery } from '@base/utils/helpers/schema';
import { AssignRule } from '../types/rule';

export const useAssignRule = (schemas: string, id: string, options?: any) => {
  const queryKey: string[] = [queryKeys.viewRule, id];
  // TODO issue remove schemas usePost don't work

  const query: string = getViewQuery({ queryKey, schemas });
  const variables: any = {
    id: id
  };
  const response = usePost<AssignRule>(queryKey, query, variables, {
    ...options,
    enabled: schemas.length > 0
  });
  return response;
};
