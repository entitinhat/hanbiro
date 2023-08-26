import { queryKeys } from '@desk/knowledge-base/config/queryKeys';
import { DESK_KB_COMMENT_LIST, getListQuery } from '@desk/knowledge-base/services/graphql';
import usePosts from '@base/hooks/usePosts';
import { keyStringify } from '@base/utils/helpers';
import { KBComment, KnowledgeBase } from '../types/knowledge';
import { getViewQuery, RESTORE_SCHEMA } from '@base/utils/helpers/schema';
import usePost from '@base/hooks/usePost';

export const useKBCommentList = (params: any, opts?: any) => {
  const usePostResult = usePosts<KBComment[]>(
    [queryKeys.deskKBComments, keyStringify(params?.filter, '')],
    DESK_KB_COMMENT_LIST,
    params,
    opts
  );

  return usePostResult;
};

// export const useKBComment = (schemas: string, id: string, options?: any) => {
//   const queryKey: string[] = [queryKeys.deskKBComment, id];
//   // TODO issue remove schemas usePost don't work

//   // const query: string = getViewQuery({ queryKey, schemas: [schemas, RESTORE_SCHEMA].join('\n') });
//   const variables: any = {
//     id: id
//   };
//   const response = usePost<KBComment>(queryKey, DESK_KB_COMMENT, variables, {
//     ...options,
//     enabled: schemas.length > 0
//   });
//   return response;
// };
