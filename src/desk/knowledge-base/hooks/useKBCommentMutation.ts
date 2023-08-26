import { useUploadMutation } from '@base/hooks/forms/useFileUploadMutation';
import useMutationPost from '@base/hooks/useMutationPost';
import { BaseMutationResponse } from '@base/types/response';
import { queryKeys } from '@desk/knowledge-base/config/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import useSnackBar from '@base/hooks/useSnackBar';
import { DESK_KB_COMMENT_CREATE, DESK_KB_COMMENT_DELETE, DESK_KB_COMMENT_LIST } from '../services/graphql';

export const useKnowledgeCommentMutation = () => {
  const queryClient = useQueryClient();
  const { enqueueSuccessBar } = useSnackBar();

  const syncAddMutate = async (variables: any) => {
    await queryClient.cancelQueries([queryKeys.deskCreateKBComment]);
    const previous = queryClient.getQueryData([queryKeys.deskCreateKBComment]);
    queryClient.setQueryData([queryKeys.deskCreateKBComment], (old: any) => {
      // const oResults = old.results ?? [];
      // return { results: [...oResults, ...optimistic] };
    });
    return { previous };
  };

  const syncDeleteMutate = async (variables: any) => {
    await queryClient.cancelQueries([queryKeys.deskCreateKBComment]);

    const previous = queryClient.getQueryData([queryKeys.deskCreateKBComment]);
    const optimistic = variables.refId as string;
    queryClient.setQueryData([queryKeys.deskCreateKBComment], (old: any) => {
      // return {
      //   results: old.results?.filter((v: any) => v?.id != optimistic)
      // };
    });

    return { previous };
  };
  const errorMutate = (error: any, variables: any, context: any) => {
    // An error happened!
    //// console.log('mutation error', error);
    // toast.error('There is an error during creating: ' + JSON.parse(error).message);
    if (context.previous) {
      queryClient.setQueryData([queryKeys.deskCreateKBComment], context.previous);
    }
  };

  const settledMutate = () => {
    queryClient.invalidateQueries([queryKeys.deskCreateKBComment]);
  };

  const settledMutateDelete = () => {
    queryClient.invalidateQueries([queryKeys.deskDeleteKBComment]);
  };

  const successMutate = (sucess: any, variables: any, context: any) => {
    //// console.log('after save', context);
    //toast.success('Created ticket comment successfully!');
  };

  //create mutation
  const mutationAdd: any = useMutationPost<BaseMutationResponse>(DESK_KB_COMMENT_CREATE, queryKeys.deskCreateKBComment, {
    onSuccess: successMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });
  // delete mutation
  const mutationDelete: any = useMutationPost<BaseMutationResponse>(DESK_KB_COMMENT_DELETE, queryKeys.deskDeleteKBComment, {
    onMutate: syncDeleteMutate,
    onSuccess: successMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  // upload
  const mUpload: any = useUploadMutation<BaseMutationResponse>(
    {
      onSuccess: (data: any, variables: any, context: any) => {
        //toast.success('Uploaded successfully!');
      },
      onError: (error: any, variables: any, context: any) => {
        //// console.log('mutation error', error);
        // toast.error('There is error during uploading: ' + JSON.parse(error).message);
      }
    }
    // (pEvent: ProgressEvent, partsNumber: number, partIndex: number, uploadId?: string) =>
    //   uploadProgressHandler(pEvent, partsNumber, partIndex, uploadId),
  );
  const response = { mutationAdd, mutationDelete, mUpload };
  return response;
};
