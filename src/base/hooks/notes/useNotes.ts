import { NOTE_GET_LIST_BY_MENU, NOTES_GET_LIST_BY_MENU } from '@base/services/graphql/note';
import { Note } from '@base/types/note';
import useInfinitePosts from '../useInfinitePosts';

export function useNotes(queryKeys: string[], params: any) {
  const response = useInfinitePosts<Note[]>(queryKeys, NOTE_GET_LIST_BY_MENU, {
    ...params
  });
  return response;
}

export function useNotesNew(queryKeys: string[], params: any) { // add field updatedAt to schema
  const response = useInfinitePosts<Note[]>([...queryKeys, params.filter.paging], NOTES_GET_LIST_BY_MENU, {
    ...params
  });
  return response;
}