import { useUploadMutation } from '@base/hooks/forms/useFileUploadMutation';
import useMutationPost from '@base/hooks/useMutationPost';
import { BaseMutationResponse } from '@base/types/response';
import { TICKET_COMMENT_CREATE, TICKET_COMMENT_DELETE } from '../services/graphql';
import { queryKeys } from '@desk/ticket/config/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import useSnackBar from '@base/hooks/useSnackBar';

export const useTicketCommentMutation = () => {
  const queryClient = useQueryClient();
  const { enqueueSuccessBar } = useSnackBar();

  const syncAddMutate = async (variables: any) => {
    await queryClient.cancelQueries([queryKeys.createComment]);
    const previous = queryClient.getQueryData([queryKeys.createComment]);
    queryClient.setQueryData([queryKeys.createComment], (old: any) => {
      // const oResults = old.results ?? [];
      // return { results: [...oResults, ...optimistic] };
    });
    return { previous };
  };

  const syncDeleteMutate = async (variables: any) => {
    await queryClient.cancelQueries([queryKeys.createComment]);

    const previous = queryClient.getQueryData([queryKeys.createComment]);
    const optimistic = variables.refId as string;
    queryClient.setQueryData([queryKeys.createComment], (old: any) => {
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
      queryClient.setQueryData([queryKeys.createComment], context.previous);
    }
  };

  const settledMutate = () => {
    queryClient.invalidateQueries([queryKeys.createComment]);
  };

  const settledMutateDelete = () => {
    queryClient.invalidateQueries([queryKeys.deleteComment]);
  };

  const successMutate = (sucess: any, variables: any, context: any) => {
    //// console.log('after save', context);
    //toast.success('Created ticket comment successfully!');
  };

  //create mutation
  const mutationAdd: any = useMutationPost<BaseMutationResponse>(TICKET_COMMENT_CREATE, queryKeys.createComment, {
    // onMutate: syncAddMutate,
    onSuccess: successMutate,
    onError: errorMutate,
    onSettled: settledMutateDelete
  });
  // delete mutation
  const mutationDelete: any = useMutationPost<BaseMutationResponse>(TICKET_COMMENT_DELETE, queryKeys.deleteComment, {
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
  const response = { mutationAdd, mUpload, mutationDelete };
  return response;
};
