import _ from 'lodash';
import { useRecoilCallback } from 'recoil';

import { queryKeys } from '@activity/config/queryKeys';
import { ADD_CHECKLIST, DELETE_CHECKLIST, UPDATE_CHECKLIST } from '@activity/services/graphql';
import { checklistAtom } from '@activity/store/atoms/task';
import { TaskChecklist, TaskChecklistDeleteRequest, TaskChecklistRequest } from '@activity/types/task';
import useMutationPost from '@base/hooks/useMutationPost';
import { replaceItemAtIndex } from '@base/utils/helpers/arrayUtils';
import { useQueryClient } from '@tanstack/react-query';

export interface UseChecklistMutateProps {
  item: TaskChecklist;
  onChange?: (v: TaskChecklist[]) => void;
}

export default function useChecklistMutation(props: UseChecklistMutateProps) {
  const { item, onChange } = props;

  const queryClient = useQueryClient();
  const syncAddMutate = async (variables: any) => {
    // Cancel current queries for the  checklist
    // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries([queryKeys.listChecklist]);
    // Snapshot the previous value
    const previous = queryClient.getQueryData([queryKeys.listChecklist]);
    // Optimistically update to the new value
    onMutationSuccess(variables);

    return { previous };
  };

  const syncDeleteMutate = async (variables: any) => {
    await queryClient.cancelQueries([queryKeys.listChecklist]);

    const previous = queryClient.getQueryData([queryKeys.listChecklist]);
    const optimistic = variables.checklist as TaskChecklist;

    queryClient.setQueryData([queryKeys.listChecklist], (old: any) => {
      return {
        results: old.results?.filter((v: TaskChecklist) => v.id !== optimistic.id)
      };
    });

    return { previous };
  };

  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData([queryKeys.listChecklist], context.previous);
    }
  };

  const settledMutate = () => {
    // Always refetch after error or success:
    queryClient.invalidateQueries([queryKeys.listChecklist]);
  };

  const { mutate: mutationAdd } = useMutationPost<TaskChecklistRequest>(ADD_CHECKLIST, queryKeys.createTaskChecklist, {
    onMutate: syncAddMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  const { mutate: mutationUpdate } = useMutationPost<TaskChecklistRequest>(UPDATE_CHECKLIST, queryKeys.updateTaskChecklist, {
    onMutate: syncAddMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  const { mutate: mutationDelete } = useMutationPost<TaskChecklistDeleteRequest>(DELETE_CHECKLIST, queryKeys.deleteTaskChecklist, {
    onMutate: syncDeleteMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  const onMutationSuccess = useRecoilCallback(
    ({ set, snapshot }) =>
      (variables: any) => {
        const optimistic = variables.checklist as TaskChecklist;
        let newItem = _.clone(item);
        delete newItem.newFlag;
        delete newItem.editFlag;
        const updateData = { ...newItem, ...optimistic };
        const items = snapshot.getLoadable(checklistAtom).contents as TaskChecklist[];
        const targetIndex = items.findIndex((v) => v.id == item.id);
        const newItems = replaceItemAtIndex(items, targetIndex, updateData);
        set(checklistAtom, newItems);
        onChange && onChange(newItems);

        // check done all and update activity status
        const completed = items.filter((v) => v.done).length;
        if (completed == items.length) {
          queryClient.setQueryData([queryKeys.viewActivity], (old: any) => {
            return { ...old, status: 'STATUS_DONE' };
          });
        }
      },
    [item]
  );

  // const onMutationError = useRecoilCallback(
  //   ({ set, snapshot }) =>
  //     () => {
  //       const items = snapshot.getLoadable(checklistAtom).contents as TaskChecklist[];
  //       const newItems = items.filter((ele) => ele.id !== item.id);
  //       set(checklistAtom, newItems);
  //       onChange && onChange(newItems);
  //     },
  //   [item],
  // );

  return { mutationAdd, mutationUpdate, mutationDelete };
}
