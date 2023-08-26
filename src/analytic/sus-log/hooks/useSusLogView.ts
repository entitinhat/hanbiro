import usePost from '@base/hooks/usePost';
import {queryKeys} from '../config/queryKeys';
import {getViewQuery} from '../services/graphql';

export default (schema: string, params: any, opts?: any) => {
  const queryKey: string[] = [queryKeys.viewSusLog, params.id];
  const query: string = getViewQuery(schema);

  return usePost<any>(queryKey, query, params, {
    ...opts,
    enabled: schema != '' && params?.id?.length > 0,
    cacheTime: 0
  });
};
