import { queryKeys } from '@base/config/queryKeys';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { ATTACHMENT_ADD_ITEM, ATTACHMENT_DELETE_ITEM } from '@base/services/graphql/attachment';
import { Attachment } from '@base/types/attachment';
import { BaseMutationResponse } from '@base/types/response';
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';

export default function useAttachmentMutation(menuSource: string, menuSourceId: string) {
  const queryClient = useQueryClient();
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();
  const mAddAttachment: any = useMutationPost<BaseMutationResponse>(ATTACHMENT_ADD_ITEM, queryKeys.createAttachment, {
    onSuccess: (data: BaseMutationResponse, variables: any, context: any) => {
      // console.log('mAddCustomer', data);
      const optimistic = variables.attachment as Attachment;
      queryClient.setQueryData([queryKeys.attachments, menuSource, menuSourceId], (old: any) => {
        const oResults = old.results ?? [];
        return { results: [...oResults, optimistic] };
      });
      enqueueSuccessBar('Uploaded Attachment successfully!');
    },
    onError: (data: BaseMutationResponse) => {
      // console.log('mAddCustomer: Error', data);
    }
  });
  //delete in DB
  const mDeleteAttachment: any = useMutationPost<BaseMutationResponse>(ATTACHMENT_DELETE_ITEM, queryKeys.deleteAttachment, {
    onSuccess: (data: BaseMutationResponse, variables: any, context: any) => {
      // console.log('mAddCustomer', data);
      const optimistic = variables.id as string;
      queryClient.setQueryData([queryKeys.attachments, menuSource, menuSourceId], (old: any) => {
        console.log('setQueryData', old);
        const oResults = old.results ?? [];
        const nResults = oResults.filter((v: Attachment) => {
          return v.id !== optimistic;
        });
        console.log(nResults);
        return {
          ...old,
          results: nResults
        };
      });
      enqueueSuccessBar('Deleted Attachment successfully!');
    },
    onError: (data: BaseMutationResponse) => {
      // console.log('mAddCustomer: Error', data);
    }
  });
  return { mAddAttachment, mDeleteAttachment };
}
