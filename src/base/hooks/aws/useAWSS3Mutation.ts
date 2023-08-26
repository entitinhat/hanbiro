import { BaseMutationResponse } from '@base/types/response';
import { useDownloadObjectMutation, useUploadMutation } from '@base/hooks/forms/useFileUploadMutation';
import useSnackBar from '../useSnackBar';

export default function useAWSS3Mutation(onSetImage?: any) {
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();

  const mUpload: any = useUploadMutation<BaseMutationResponse>(
    {
      useErrorBoundary: false,
      onSuccess: (data: any, variables: any, context: any) => {
        enqueueSuccessBar('Uploaded file(s) successfully!');
      },
      onError: (error: any, variables: any, context: any) => {
        //console.log('mutation error', error);
        enqueueErrorBar('There was an error during uploading: ' + JSON.parse(error).message);
      }
    },
    (pEvent: ProgressEvent, partsNumber: number, partIndex: number) => {
      // console.log('uploading...');
    }
  );

  //download mutation
  const mDownload: any = useDownloadObjectMutation<any>({
    useErrorBoundary: false,
    onSuccess: (data: any, variables: any, context: any) => {
      onSetImage && onSetImage(data);
    },
    onError: (error: any, variables: any, context: any) => {
      //// console.log('mutation error', error);
      enqueueErrorBar('There was an error during downloading: ' + JSON.parse(error).message);
    }
  });

  return { mUpload, mDownload };
}
