import _ from 'lodash';
import { useRecoilCallback } from 'recoil';

import { queryKeys } from '@activity/config/queryKeys';
import { ADD_SEQUENCE, DELETE_SEQUENCE, UPDATE_SEQUENCE } from '@activity/services/graphql';
import { sequenceAtom } from '@activity/store/atoms/task';
import { TaskSequence, TaskSequenceDeleteRequest, TaskSequenceRequest } from '@activity/types/task';
import useMutationPost from '@base/hooks/useMutationPost';
import { replaceItemAtIndex } from '@base/utils/helpers/arrayUtils';
import { useQueryClient } from '@tanstack/react-query';

export interface UseSequenceMutateProps {
  item: TaskSequence;
  onChange?: (v: TaskSequence[]) => void;
}

export default function useSequenceMutation(props: UseSequenceMutateProps) {
  const { item, onChange } = props;

  const queryClient = useQueryClient();
  const syncAddMutate = async (variables: any) => {
    // Cancel current queries for the  checklist
    // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries([queryKeys.listSequence]);
    // Snapshot the previous value
    const previous = queryClient.getQueryData([queryKeys.listSequence]);
    // Optimistically update to the new value
    onMutationSuccess(variables);

    return { previous };
  };

  const syncDeleteMutate = async (variables: any) => {
    await queryClient.cancelQueries([queryKeys.listSequence]);

    const previous = queryClient.getQueryData([queryKeys.listSequence]);
    const optimistic = variables.checklist as TaskSequence;

    queryClient.setQueryData([queryKeys.listSequence], (old: any) => {
      return {
        results: old.results?.filter((v: TaskSequence) => v.id !== optimistic.id)
      };
    });

    return { previous };
  };

  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData([queryKeys.listSequence], context.previous);
    }
  };

  const settledMutate = () => {
    // Always refetch after error or success:
    queryClient.invalidateQueries([queryKeys.listSequence]);
  };

  const { mutate: mutationAdd } = useMutationPost<TaskSequenceRequest>(ADD_SEQUENCE, queryKeys.createTaskSequence, {
    onMutate: syncAddMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  const { mutate: mutationUpdate } = useMutationPost<TaskSequenceRequest>(UPDATE_SEQUENCE, queryKeys.updateTaskSequence, {
    onMutate: syncAddMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  const { mutate: mutationDelete } = useMutationPost<TaskSequenceDeleteRequest>(DELETE_SEQUENCE, queryKeys.deleteTaskSequence, {
    onMutate: syncDeleteMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  const onMutationSuccess = useRecoilCallback(
    ({ set, snapshot }) =>
      (variables: any) => {
        const optimistic = variables.sequence as TaskSequence;
        let newItem = _.clone(item);
        delete newItem.newFlag;
        delete newItem.editFlag;
        const updateData = { ...newItem, ...optimistic };
        const items = snapshot.getLoadable(sequenceAtom).contents as TaskSequence[];
        const targetIndex = items.findIndex((v) => v.id == item.id);
        const newItems = replaceItemAtIndex(items, targetIndex, updateData);
        set(sequenceAtom, newItems);
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
  //       const items = snapshot.getLoadable(sequenceAtom).contents as TaskSequence[];
  //       const newItems = items.filter((ele) => ele.id !== item.id);
  //       set(sequenceAtom, newItems);
  //       onChange && onChange(newItems);
  //     },
  //   [item],
  // );

  return { mutationAdd, mutationUpdate, mutationDelete };
}
