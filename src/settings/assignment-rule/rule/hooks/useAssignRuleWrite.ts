import _ from 'lodash';

import { queryKeys } from '@settings/assignment-rule/rule/config/queryKeys';
import { CREATE_ASSIGNMENT_RULE } from '@settings/assignment-rule/rule/services/graphql';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { ListType } from '@base/types/app';
import { BaseMutationResponse } from '@base/types/response';
import { useQueryClient } from '@tanstack/react-query';
import { AssignRule } from '../types/rule';

export interface UseAssignRuleWriteProps {
  onClose: () => void;
  onReload?: () => void;
  isReset: boolean;
  reset?: () => void;
}

export default function useAssignRuleWrite(props: UseAssignRuleWriteProps) {
  const { onClose, onReload, isReset, reset } = props;
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const queryClient = useQueryClient();

  const { mutate: mutationAdd, isLoading } = useMutationPost(CREATE_ASSIGNMENT_RULE, queryKeys.createAssignRule, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //optimistic
      const optimistic = variables.ar as AssignRule;
      queryClient.setQueryData([queryKeys.listRule], (old: any) => {
        const oResults = old?.results ?? [];
        onReload && onReload();
        return { results: [oResults, optimistic] };
      });
      if (isReset) {
        // for list, grid
        // onReload && onReload();
        reset && reset();
      } else {
        // refecth data
        reset && reset();
        // onReload && onReload();
        onClose && onClose();
      }

      enqueueSuccessBar('Create AssignRule successfully!');
    },
    onError: (error: any) => {
      console.log('failed', error);
      enqueueErrorBar('Create AssignRule failed');
    }
  });

  return { mutationAdd, isLoading };
}
