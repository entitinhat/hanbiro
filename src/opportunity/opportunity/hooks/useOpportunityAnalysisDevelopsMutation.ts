//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
//menu
import {
  OPPORTUNITY_PRODUCT_DEVELOP_ANALYSES_LIST_CREATE,
  OPPORTUNITY_PRODUCT_DEVELOP_ANALYSES_LIST_DELETE
} from '@opportunity/services/graphql';
import { queryKeys } from '@opportunity/config/queryKeys';
import { BaseMutationResponse } from '@base/types/response';
import { SET_TIMEOUT } from '@base/config/constant';

export default function useOpportunityAnalysisDevelopsMutation() {
  const queryClient = useQueryClient();
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mCreate = useMutationPost<BaseMutationResponse>(
    OPPORTUNITY_PRODUCT_DEVELOP_ANALYSES_LIST_CREATE,
    queryKeys.opportunityPerceptionAnalysisCreate,
    {
      onSuccess: (data: any, variables: any, context: any) => {
        enqueueSuccessBar('Created product develop successfully!');
      },
      onError: (error: any, variables: any, context: any) => {
        enqueueErrorBar('Created product develop failed');
      },
      onSettled: () => {
        setTimeout(() => {
          queryClient.refetchQueries([queryKeys.opportunityPerceptionAnalysisList]);
        }, SET_TIMEOUT);
      }
    }
  );

  //create mutation
  const mDelete: any = useMutationPost<BaseMutationResponse>(
    OPPORTUNITY_PRODUCT_DEVELOP_ANALYSES_LIST_DELETE,
    queryKeys.opportunityPerceptionAnalysisDelete,
    {
      onSuccess: (data: any, variables: any, context: any) => {
        enqueueSuccessBar('Deleted product develop successfully!');
      },
      onError: (error: any, variables: any, context: any) => {
        enqueueErrorBar('Deleted product develop failed');
      },
      onSettled: () => {
        setTimeout(() => {
          queryClient.refetchQueries([queryKeys.opportunityPerceptionAnalysisList]);
        }, SET_TIMEOUT);
      }
    }
  );

  return { mCreate, mDelete };
}
