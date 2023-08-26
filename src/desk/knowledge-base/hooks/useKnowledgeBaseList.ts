import { queryKeys } from '@desk/knowledge-base/config/queryKeys';
import { getListQuery  } from '@desk/knowledge-base/services/graphql';
import usePosts from '@base/hooks/usePosts';
import { keyStringify } from '@base/utils/helpers';
import { KnowledgeBase } from '../types/knowledge';
import { getViewQuery, RESTORE_SCHEMA } from '@base/utils/helpers/schema';

export const useKnowledgeBaseList = (schema: string, params: any, opts?: any) => {
  const usePostResult = usePosts<KnowledgeBase[]>(
    [queryKeys.listKnowledgebases, keyStringify(params?.filter, '')],
    getListQuery([schema, RESTORE_SCHEMA].join('\n')),
    params,
    opts
  );

  return usePostResult;
};
