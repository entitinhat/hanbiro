//third-party
import { useQueryClient } from '@tanstack/react-query';

//project base
import useSnackBar from '@base/hooks/useSnackBar';
import useMutationPost from '@base/hooks/useMutationPost';

//menu
import { queryKeys } from '@settings/preferences/config/sales/queryKeys';
import { SETTING_SALES_TEAM_PRODUCT_CREATE, SETTING_SALES_TEAM_PRODUCT_DELETE } from '@settings/preferences/services/graphql/sales';

export function useSalesTeamProductCreate() {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();

  const mPostResult = useMutationPost(SETTING_SALES_TEAM_PRODUCT_CREATE, queryKeys.salesTeamProductCreate, {
    useErrorBoundary: false,
    onSuccess: async (data: any, variables: any, context: any) => {
      //enqueueSuccessBar('Added sales team product successfully!');
      setTimeout(() => {
        queryClient.invalidateQueries([queryKeys.salesTeamView]); //refresh view
        queryClient.invalidateQueries([queryKeys.salesTeamsList]); //refresh list
      }, 1500);
    },
    onMutate: async (variables: any) => {},
    onError: (error: any, variables: any, context: any) => {
      //console.log('Deleted context', error);
      enqueueErrorBar('There existed this product, please try again.');
    },
    onSettled: () => {}
  });

  return mPostResult;
}

export function useSalesTeamProductDelete() {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();

  const mPostResult = useMutationPost(SETTING_SALES_TEAM_PRODUCT_DELETE, queryKeys.salesTeamProductDelete, {
    useErrorBoundary: false,
    onSuccess: async (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Deleted sales team product successfully!');
    },
    onMutate: async (variables: any) => {},
    onError: (error: any, variables: any, context: any) => {
      //console.log('Deleted customer context', context);
      enqueueErrorBar('There is an error during creating, try again.');
    },
    onSettled: () => {
      setTimeout(() => {
        queryClient.invalidateQueries([queryKeys.salesTeamsList]); //refresh list
        queryClient.invalidateQueries([queryKeys.salesTeamView]); //refresh view
      }, 1500);
    }
  });

  return mPostResult;
}
