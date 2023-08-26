import { queryKeys } from '@base/config/queryKeys';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { NOTE_CREATE_ITEM, NOTE_DELETE_ITEM, NOTE_UPDATE_ITEM, SORT_NOTES } from '@base/services/graphql/note';
import { authAtom } from '@base/store/atoms/auth';
import { Note, NoteForm } from '@base/types/note';
import { BaseMutationResponse } from '@base/types/response';
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { useRecoilValue } from 'recoil';

export default function useProductsMutation(menuSourceId: string) {
  const queryClient = useQueryClient();
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();
  const { user } = useRecoilValue(authAtom);
  const mAddNote: any = useMutationPost<BaseMutationResponse>(NOTE_CREATE_ITEM, queryKeys.createNote, {
    onMutate: async () => {},
    onSuccess: (data: BaseMutationResponse, variables: any, context: any) => {
      const optimistic = variables.note;
      queryClient.setQueryData([queryKeys.notes, menuSourceId], (old: any) => {
        const pages = old?.pages ?? [];
        const firstPage =
          pages.length > 0
            ? pages[0]
            : {
                data: []
              };
        /**
         * pages = [
         *    {data: [], paging}
         * ]
         */
        const nNote: any = {
          id: data.id,
          content: optimistic.content,
          plan: optimistic.plan,
          users: optimistic.users,
          actions: optimistic.actions,
          source: optimistic.source?.menu ?? '',
          sourceId: optimistic.source?.id ?? ''
          //createdBy: {
          //  id: user?.id ?? '',
          // name: user?.displayName ?? ''
          // }
        };
        const nFirstPage = {
          ...firstPage,
          data: [nNote, ...firstPage?.data]
        };
        pages.pop();
        return { ...old, pages: [nFirstPage, ...pages] };
      });
      enqueueSuccessBar('Created Note successfully!');
    },
    onError: (data: BaseMutationResponse) => {}
  });

  const mUpdateNote: any = useMutationPost<BaseMutationResponse>(NOTE_UPDATE_ITEM, queryKeys.updateNote, {
    onMutate: async () => {},
    onSuccess: (data: BaseMutationResponse, variables: any, context: any) => {
      // const optimistic = variables.note as NoteForm;
      // queryClient.setQueryData([queryKeys.notes, menuSourceId], (old: any) => {
      //   const pages = old?.pages ?? [];
      //   const nPages = pages.map((page: any) => {
      //     const data = page.data ?? [];
      //     const nData = data.map((item: Note) => {
      //       if (item.id === optimistic.id) {
      //         return {
      //           ...item,
      //           conent: optimistic.content
      //         };
      //       }
      //       return item;
      //     });
      //     return {
      //       ...page,
      //       data: nData
      //     };
      //   });
      //   return { ...old, pages: nPages };
      // });
      queryClient.invalidateQueries([queryKeys.notes, menuSourceId]);
      enqueueSuccessBar('Updated Note successfully!');
    },
    onError: (data: BaseMutationResponse) => {}
  });

  const mDeleteNote: any = useMutationPost<BaseMutationResponse>(NOTE_DELETE_ITEM, queryKeys.deleteNote, {
    onMutate: async () => {},
    onSuccess: (data: BaseMutationResponse, variables: any, context: any) => {
      queryClient.invalidateQueries([queryKeys.notes, menuSourceId]);
      enqueueSuccessBar('Deleted Note successfully!');
    },
    onError: (data: BaseMutationResponse) => {}
  });
  const mSortNote: any = useMutationPost<BaseMutationResponse>(SORT_NOTES, queryKeys.sortNote, {
    onMutate: async () => {},
    onSuccess: (data: BaseMutationResponse, variables: any, context: any) => {
      const optimistic = variables.items as any[];
      queryClient.setQueryData([queryKeys.notes, menuSourceId], (old: any) => {
        const pages = old?.pages ?? [];

        const nPages = pages.map((page: any) => {
          const data = page.data ?? [];
          const nData = data.map((item: Note) => {
            const optimisticItem = optimistic.find((oItem) => oItem.id === item.id);
            if (optimisticItem) {
              return {
                ...item,
                order: optimisticItem.order
              };
            }
            return item;
          });
          return {
            ...page,
            data: nData
          };
        });
        return { ...old, pages: nPages };
      });
      enqueueSuccessBar('Sort Note successfully!');
    },
    onError: (data: BaseMutationResponse) => {}
  });
  return { mAddNote, mUpdateNote, mDeleteNote, mSortNote };
}
