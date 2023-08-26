//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
//menu
import {
  OPPORTUNITY_CREATE,
  OPPORTUNITY_PRODUCT_DEVELOP_CREATE,
  OPPORTUNITY_PRODUCT_DEVELOP_DELETE,
  OPPORTUNITY_PRODUCT_DEVELOP_UPDATE
} from '@opportunity/services/graphql';
import { queryKeys } from '@opportunity/config/queryKeys';
import { BaseMutationResponse } from '@base/types/response';
import { SET_TIMEOUT } from '@base/config/constant';

export default function useOpportunityProductDevelopsMutation() {
  const queryClient = useQueryClient();
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mCreate = useMutationPost<BaseMutationResponse>(OPPORTUNITY_PRODUCT_DEVELOP_CREATE, queryKeys.opportunityProductDevelopCreate, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Created product develop successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Created product develop failed');
    },
    onSettled: () => {
      setTimeout(() => {
        queryClient.refetchQueries([queryKeys.opportunityProductDevelopList]);
      }, SET_TIMEOUT);
    }
  });

  //create mutation
  const mUpdate: any = useMutationPost<BaseMutationResponse>(
    OPPORTUNITY_PRODUCT_DEVELOP_UPDATE,
    queryKeys.opportunityProductDevelopUpdate,
    {
      onSuccess: (data: any, variables: any, context: any) => {
        enqueueSuccessBar('Updated product develop successfully!');
      },
      onError: (error: any, variables: any, context: any) => {
        enqueueErrorBar('Updated product develop failed');
      },
      onSettled: () => {
        setTimeout(() => {
          queryClient.refetchQueries([queryKeys.opportunityProductDevelopList]);
        }, SET_TIMEOUT);
      }
    }
  );

  //create mutation
  const mDelete: any = useMutationPost<BaseMutationResponse>(
    OPPORTUNITY_PRODUCT_DEVELOP_DELETE,
    queryKeys.opportunityProductDevelopDelete,
    {
      onSuccess: (data: any, variables: any, context: any) => {
        enqueueSuccessBar('Deleted product develop successfully!');
      },
      onError: (error: any, variables: any, context: any) => {
        enqueueErrorBar('Deleted product develop failed');
      },
      onSettled: () => {
        setTimeout(() => {
          queryClient.refetchQueries([queryKeys.opportunityProductDevelopList]);
        }, SET_TIMEOUT);
      }
    }
  );

  return { mCreate, mUpdate, mDelete };
}
