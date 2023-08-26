import { PaginateInput } from '@base/types/common';
import usePosts from '@base/hooks/usePosts';
import { Attribute } from '../types/attribute';
import { queryKeys } from '@product/attribute/config/queryKeys';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { CREATE_PRODUCT_ATTRIBUTE, DELETE_PRODUCT_ATTRIBUTE, UPDATE_PRODUCT_ATTRIBUTE } from '../services/graphql';
import { queryClient } from '@base/config/queryClient';

export const useAttributesMutate = () => {
  const { enqueueSuccessBar } = useSnackBar();
  const mAdd: any = useMutationPost<BaseMutationResponse>(CREATE_PRODUCT_ATTRIBUTE, queryKeys.addAttribute, {
    onSuccess: (res: any) => {
      enqueueSuccessBar('Data was saved!');
      queryClient.invalidateQueries({ queryKey: ['product_attributes'] });
    }
  });
  const mDelete: any = useMutationPost<BaseMutationResponse>(DELETE_PRODUCT_ATTRIBUTE, queryKeys.deleteAttribute, {
    onSuccess: (res: any) => {
      enqueueSuccessBar('Data was removed!');
      queryClient.invalidateQueries({ queryKey: ['product_attributes'] });
    }
  });
  const mUpdate: any = useMutationPost<BaseMutationResponse>(UPDATE_PRODUCT_ATTRIBUTE, queryKeys.updateAttribute, {
    onSuccess: (res: any) => {
      enqueueSuccessBar('Data was updated!');
      queryClient.invalidateQueries({ queryKey: ['product_attributes'] });
    }
  });
  return { mAdd, mDelete, mUpdate };
};
