import { GET_TIMELINE_BY_MENU } from '@base/services/graphql/timeline';
import { Timeline } from '@base/types/timeLine';
import useInfinitePosts from '../useInfinitePosts';
import usePosts from '../usePosts';

export function useTimelines(queryKeys: string[], params: any) {
  const response = useInfinitePosts<Timeline[]>(queryKeys, GET_TIMELINE_BY_MENU, {
    ...params
  });
  return response;
}

export function useTimelinesLimit(queryKeys: string[], params: any) {
  const response = usePosts<Timeline[]>([ ...queryKeys, params], GET_TIMELINE_BY_MENU, {
    ...params
  });
  return response;
}
