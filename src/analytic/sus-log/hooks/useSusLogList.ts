import usePosts from '@base/hooks/usePosts';
import { SusLog } from '../types/interfaces';
import { queryKeys } from '../config/queryKeys';
import { keyStringify } from '@base/utils/helpers';
import { getListQuery } from '../services/graphql';

export default (schema: string, params: any, opts?: any) => {
  return usePosts<SusLog[]>([queryKeys.listSusLog, keyStringify(params?.filter, '')], getListQuery(schema), params, opts);
};
