//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';

//menu
import { CUSTOMER_CLONE } from '@customer/services/graphql';
import { customerQueryKeys } from '@customer/config/queryKeys';

export default function useCustomerClone() {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();

  const mPostResult = useMutationPost(CUSTOMER_CLONE, customerQueryKeys.customerClone, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      enqueueSuccessBar('Cloned customer successfully!');
      //remove list to refresh
      queryClient.removeQueries([customerQueryKeys.customersGet, 'list']);
    },
    onError: (error: any) => {
      //console.log('Cloned customer failed', error);
      enqueueErrorBar('There was an error during cloning: ' + JSON.stringify(error));
    }
  });

  return mPostResult;
}
