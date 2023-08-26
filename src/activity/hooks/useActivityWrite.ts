import _ from 'lodash';

import { queryKeys } from '@activity/config/queryKeys';
import { ADD_ACTIVITY } from '@activity/services/graphql';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { ListType } from '@base/types/app';
import { BaseMutationResponse } from '@base/types/response';
import { useQueryClient } from '@tanstack/react-query';

export interface UseActivityWriteProps {
  onClose: () => void;
  listType: ListType;
  onReload?: () => void;
  isReset: boolean;
  reset?: () => void;
}

export default function useActivityWrite(props: UseActivityWriteProps) {
  const { listType, onClose, onReload, isReset, reset } = props;
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const queryClient = useQueryClient();

  const { mutate: mutationAdd, isLoading } = useMutationPost(ADD_ACTIVITY, queryKeys.createActivity, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse) => {
      //console.log('success data', data);
      if (isReset) {
        // for kanban
        if (listType == ListType.KANBAN) {
          queryClient.invalidateQueries([queryKeys.listActivity]);
          // queryClient.invalidateQueries([queryKeys.listActivity, 'overdue']);
          // queryClient.invalidateQueries([queryKeys.listActivity, 'today']);
          // queryClient.invalidateQueries([queryKeys.listActivity, 'thisweek']);
          // queryClient.invalidateQueries([queryKeys.listActivity, 'others']);
          // for calendar
        } else if (listType == ListType.CALENDAR) {
          const currentDate = new Date();
          queryClient.invalidateQueries([
            queryKeys.listActivity,
            {
              year: currentDate.getFullYear(),
              month: currentDate.getMonth()
            }
          ]);
        } else {
          // for list, grid
          onReload && onReload();
          reset && reset();
        }
      } else {
        // refecth data
        reset && reset();
        onReload && onReload();
        onClose && onClose();
      }

      enqueueSuccessBar('Create activity successfully!');
    },
    onError: (error: any) => {
      console.log('failed', error);
      enqueueErrorBar('Create activity failed');
    }
  });

  return { mutationAdd, isLoading };
}
