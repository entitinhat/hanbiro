import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { queryKeys } from '@settings/preferences/config/desk/queryKeys';
import { CREATE_DESK_CHANNEL, DELETE_DESK_CHANNEL, UPDATE_DESK_CHANNEL } from '@settings/preferences/services/graphql/desk';
import { useQueryClient } from '@tanstack/react-query';

export const useChannelMutation = () => {
  const queryClient = useQueryClient();
  const { enqueueSuccessBar } = useSnackBar();
  const mAdd: any = useMutationPost<BaseMutationResponse>(CREATE_DESK_CHANNEL, queryKeys.createChannel, {
    onSuccess: (res: any) => {
      enqueueSuccessBar('Data was saved!');
      queryClient.invalidateQueries({ queryKey: [queryKeys.channels] });
    }
  });
  const mUpdate: any = useMutationPost<BaseMutationResponse>(UPDATE_DESK_CHANNEL, queryKeys.updateChannel, {
    onSuccess: (res: any) => {
      enqueueSuccessBar('Data was saved!');
      queryClient.invalidateQueries({ queryKey: [queryKeys.channels] });
    }
  });
  const mDelete: any = useMutationPost<BaseMutationResponse>(DELETE_DESK_CHANNEL, queryKeys.deleteChannel, {
    onSuccess: (res: any) => {
      enqueueSuccessBar('Data was saved!');
      queryClient.invalidateQueries({ queryKey: [queryKeys.channels] });
    }
  });
  return { mAdd, mUpdate, mDelete };
};
