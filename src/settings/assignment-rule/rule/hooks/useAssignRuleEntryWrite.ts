import _ from 'lodash';

import { queryKeys } from '@settings/assignment-rule/rule/config/queryKeys';
import { CREATE_ASSIGNMENT_RULE_ENTRY } from '@settings/assignment-rule/rule/services/graphql';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { ListType } from '@base/types/app';
import { BaseMutationResponse } from '@base/types/response';
import { useQueryClient } from '@tanstack/react-query';
import { AssignRule } from '../types/rule';
import { SET_TIMEOUT } from '@base/config/constant';

export interface UseAssignRuleEntryWriteProps {
  onClose: () => void;
  onReload?: () => void;
  isReset: boolean;
  reset?: () => void;
}

export default function useAssignRuleEntryWrite(props: UseAssignRuleEntryWriteProps) {
  const { onClose, onReload, isReset, reset } = props;
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const queryClient = useQueryClient();

  const { mutate: mutationAdd, isLoading } = useMutationPost(CREATE_ASSIGNMENT_RULE_ENTRY, queryKeys.createAssignRuleEntry, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //optimistic
      setTimeout(() => {
        queryClient.invalidateQueries([queryKeys.viewRule]);
      }, SET_TIMEOUT);
      enqueueSuccessBar('Create Rule Entry successfully!');
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
    },
    onError: (error: any) => {
      console.log('failed', error);
      enqueueErrorBar('Create Rule Entry failed');
    }
  });

  return { mutationAdd, isLoading };
}
