//third-party
import { useQueryClient } from '@tanstack/react-query';

//project base
import useSnackBar from '@base/hooks/useSnackBar';
import useMutationPost from '@base/hooks/useMutationPost';

//menu
import { queryKeys } from '@settings/preferences/config/sales/queryKeys';
import {
  SETTING_SALES_TEAM_MEMBER_CREATE,
  SETTING_SALES_TEAM_MEMBER_DELETE,
  SETTING_SALES_TEAM_MEMBER_UPDATE
} from '@settings/preferences/services/graphql/sales';

export function useSalesTeamMemberCreate() {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();

  const mPostResult = useMutationPost(SETTING_SALES_TEAM_MEMBER_CREATE, queryKeys.salesTeamMemberCreate, {
    useErrorBoundary: false,
    onSuccess: async (data: any, variables: any, context: any) => {
      //enqueueSuccessBar('Added sales team member successfully!');
      setTimeout(() => {
        queryClient.invalidateQueries([queryKeys.salesTeamView]); //refresh view
        queryClient.invalidateQueries([queryKeys.salesTeamsList]); //refresh list
      }, 1500);
    },
    onMutate: async (variables: any) => {},
    onError: (error: any, variables: any, context: any) => {
      //console.log('processing error', error);
      enqueueErrorBar('There existed this user, please try again.');
    },
    onSettled: () => {}
  });

  return mPostResult;
}

export function useSalesTeamMemberDelete() {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();

  const mPostResult = useMutationPost(SETTING_SALES_TEAM_MEMBER_DELETE, queryKeys.salesTeamMemberDelete, {
    useErrorBoundary: false,
    onSuccess: async (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Deleted sales team member successfully!');
    },
    onMutate: async (variables: any) => {},
    onError: (error: any, variables: any, context: any) => {
      //console.log('Deleted customer context', context);
      enqueueErrorBar('There is an error during creating, try again.');
    },
    onSettled: () => {
      setTimeout(() => {
        queryClient.invalidateQueries([queryKeys.salesTeamView]); //refresh view
        queryClient.invalidateQueries([queryKeys.salesTeamsList]); //refresh list
      }, 1500);
    }
  });

  return mPostResult;
}

export function useSalesTeamMemberUpdate() {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();

  const mPostResult = useMutationPost(SETTING_SALES_TEAM_MEMBER_UPDATE, queryKeys.salesTeamMemberUpdate, {
    useErrorBoundary: false,
    onSuccess: async (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Updated sales team member successfully!');
    },
    onMutate: async (variables: any) => {},
    onError: (error: any, variables: any, context: any) => {
      //console.log('Deleted customer context', context);
      enqueueErrorBar('There is an error during creating, try again.');
    },
    onSettled: () => {
      setTimeout(() => {
        queryClient.invalidateQueries([queryKeys.salesTeamView]); //refresh view
        queryClient.invalidateQueries([queryKeys.salesTeamsList]); //refresh list
      }, 1500);
    }
  });

  return mPostResult;
}
