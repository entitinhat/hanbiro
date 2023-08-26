import { Activity } from '@activity/types/activity';
import useInfinitePosts from '@base/hooks/useInfinitePosts';

export function useActivityTimeline(queryKeys: string[], schema: string, params: any, opts: any) {
  const response = useInfinitePosts<Activity[]>(queryKeys, schema, params, opts);
  return response;
}
