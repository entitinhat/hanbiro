import _ from 'lodash';

import { queryKeys } from '@activity/config/queryKeys';
import { ADD_ASSIGNTO, DELETE_ASSIGNTO } from '@activity/services/graphql';
import { UserOrCustomer } from '@activity/types/activity';
import useMutationPost from '@base/hooks/useMutationPost';
import { BaseMutationResponse } from '@base/types/response';
import { useQueryClient } from '@tanstack/react-query';

export default function useAssignCustomerMutate() {
  const queryClient = useQueryClient();
  const syncAddMutate = async (variables: any) => {
    await queryClient.cancelQueries([queryKeys.assignTos]);

    const previous = queryClient.getQueryData([queryKeys.assignTos]);
    const optimistic = variables.assignTo as UserOrCustomer[];
    queryClient.setQueryData([queryKeys.assignTos], (old: any) => {
      const oResults = old.results ?? [];
      return { results: [...oResults, ...optimistic] };
    });

    return { previous };
  };

  const syncDeleteMutate = async (variables: any) => {
    await queryClient.cancelQueries([queryKeys.assignTos]);

    const previous = queryClient.getQueryData([queryKeys.assignTos]);
    const optimistic = variables.assignTo as string[];
    queryClient.setQueryData([queryKeys.assignTos], (old: any) => {
      return {
        results: old.results?.filter((v: UserOrCustomer) => !_.includes(optimistic, v.id))
      };
    });

    return { previous };
  };

  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData([queryKeys.assignTos], context.previous);
    }
  };

  const settledMutate = () => {
    queryClient.invalidateQueries([queryKeys.assignTos]);
  };

  const mAddCustomer: any = useMutationPost<BaseMutationResponse>(ADD_ASSIGNTO, queryKeys.createAssignTo, {
    onMutate: syncAddMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  const mDeleteCustomer: any = useMutationPost<BaseMutationResponse>(DELETE_ASSIGNTO, queryKeys.deleteAssignTo, {
    onMutate: syncDeleteMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  return { mAddCustomer, mDeleteCustomer };
}
