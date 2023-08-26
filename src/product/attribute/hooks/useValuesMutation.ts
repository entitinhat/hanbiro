import { queryKeys } from '@product/attribute/config/queryKeys';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { ADD_PRODUCT_VALUE, UPDATE_PRODUCT_VALUE, DELETE_PRODUCT_VALUE } from '../services/graphql';
import { queryClient } from '@base/config/queryClient';

export const useValuesMutate = () => {
  const { enqueueSuccessBar } = useSnackBar();
  const mAdd: any = useMutationPost<BaseMutationResponse>(ADD_PRODUCT_VALUE, queryKeys.addValue, {
    onSuccess: (res: any) => {
      enqueueSuccessBar('Data was saved!');
      queryClient.invalidateQueries({ queryKey: ['product_attributes'] });
    }
  });
  const mDelete: any = useMutationPost<BaseMutationResponse>(DELETE_PRODUCT_VALUE, queryKeys.deleteValue, {
    onSuccess: (res: any) => {
      enqueueSuccessBar('Data was removed!');
      queryClient.invalidateQueries({ queryKey: ['product_attributes'] });
    }
  });
  const mUpdate: any = useMutationPost<BaseMutationResponse>(UPDATE_PRODUCT_VALUE, queryKeys.updateValue, {
    onSuccess: (res: any) => {
      enqueueSuccessBar('Data was updated!');
      queryClient.invalidateQueries({ queryKey: ['product_attributes'] });
    }
  });
  return { mAdd, mDelete, mUpdate };
};
