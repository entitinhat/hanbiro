import MainCard from '@base/components/App/MainCard';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import UploadMultiFile from '@base/components/@hanbiro/Dropzone/MultiFile';
import { useEffect, useState } from 'react';
import { useUploadMutation } from '@base/hooks/forms/useFileUploadMutation';
import { BaseMutationResponse } from '@base/types/response';
import useSnackBar from '@base/hooks/useSnackBar';
import { MENU_DESK } from '@base/config/menus';
import { s3UploadObjectApi } from '@base/utils/axios/graphql';
import { buildS3Headers, s3CreateObjectKey } from '@base/utils/s3';
import { STORAGE_BUCKET } from '@base/config/graphql';
import axios from 'axios';
import { PresignedUrl } from '@base/types/s3';

interface StoragePageProps {}
const StoragePage = (props: StoragePageProps) => {
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();
  const [uploadFiles, setUploadFiles] = useState<any>([]);
  const [uploadFilesNormal, setUploadFilesNormal] = useState<any>([]);
  const [curFileIndex, setCurFileIndex] = useState<number>(-1);
  const [lastUploadedFileIndex, setLastUploadedFileIndex] = useState<number>(-1);
  const [curDownloadIndex, setCurDownloadIndex] = useState<number>(-1);
  const [lastDownloadedIndex, setLastDownloadedIndex] = useState<number>(-1);
  const [progressParts, setProgressParts] = useState<any>([]);
  const theme = useTheme();

  const mUpload: any = useUploadMutation<BaseMutationResponse>(
    {
      onSuccess: (data: any, variables: any, context: any) => {
        //toast.success('Uploaded successfully!');
      },
      onError: (error: any, variables: any, context: any) => {
        //// console.log('mutation error', error);
        enqueueErrorBar('Uploaded failed: ' + JSON.parse(error).message);
      }
    },
    (pEvent: ProgressEvent, partsNumber: number, partIndex: number, uploadId?: string) =>
      uploadProgressHandler(pEvent, partsNumber, partIndex, uploadId)
  );
  //calculate progress for parts
  const uploadProgressHandler = async (progressEvent: ProgressEvent, numberParts: number, partIndex: number, uploadId?: string) => {
    if (progressEvent.loaded >= progressEvent.total) return;
    const currentProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //set parts upload progress
    setProgressParts((progressParts: any[]) => {
      progressParts[partIndex] = currentProgress;
      const sum = progressParts.reduce((acc: any, curr: any) => acc + curr);

      //set file progress
      const newUploadFiles = [...uploadFiles];
      newUploadFiles[curFileIndex].percentCompleted = Math.round(sum / numberParts);
      newUploadFiles[curFileIndex].uploadId = uploadId || '';
      setUploadFiles(newUploadFiles);

      return progressParts;
    });
  };
  //upload success
  useEffect(() => {
    //// console.log('<<< completed useEffect >>>', mUpload);
    if (mUpload.isSuccess) {
      //set progress to 100
      const newUploadFiles = [...uploadFiles];
      newUploadFiles[curFileIndex].percentCompleted = 100;
      setUploadFiles(newUploadFiles);
      //save to DB
      const params = {
        source: {
          menu: MENU_DESK,
          id: '2a9e40f6-9db4-42da-891d-aa2972df2f86'
        },
        objectId: mUpload.data.id, //upload id
        objectUrl: mUpload.data.url, //download url
        name: newUploadFiles[curFileIndex].name,
        size: newUploadFiles[curFileIndex].size,
        contentType: newUploadFiles[curFileIndex].type
      };
      enqueueSuccessBar('Uploaded ' + newUploadFiles[curFileIndex].name);
    }
  }, [mUpload.isSuccess]);
  //upload current file
  useEffect(() => {
    console.log('curFileIndex', curFileIndex, uploadFiles);
    if (curFileIndex !== -1 && uploadFiles.length > 0) {
      mUpload.mutate(uploadFiles[curFileIndex]);
    }
  }, [curFileIndex]);

  //next file - last file
  useEffect(() => {
    if (lastUploadedFileIndex === -1) {
      return;
    }
    const isLastFile = lastUploadedFileIndex === uploadFiles.length - 1;
    const nextFileIndex = isLastFile ? -1 : curFileIndex + 1;
    setCurFileIndex(nextFileIndex);
  }, [lastUploadedFileIndex]);
  const onSetFiles = (fileKey: string, nFiles: any[]) => {
    console.log('onSetFiles', fileKey, nFiles);
    setUploadFiles(nFiles);
  };
  const onSubmit = () => {
    setCurFileIndex(0);
  };
  const onSetFilesNormal = (fileKey: string, nFiles: any[]) => {
    console.log('onSetFiles', fileKey, nFiles);
    setUploadFilesNormal(nFiles);
  };
  const onSubmitNormal = async () => {
    const file = uploadFilesNormal[0];
    console.log('do upload', file);
    const params = {
      object: {
        key: s3CreateObjectKey(file.name),
        bucket: STORAGE_BUCKET,
        contentType: file.type
      }
    };
    const resp = await s3UploadObjectApi<PresignedUrl>(params);
    console.log('UploadObject', resp);
    const { url, method, headers } = resp;
    const nHeaders = buildS3Headers(headers);
    var encodedToken = window.btoa('root:eatcodesleep1');
    let baseHeaders = {
      Authorization: `Basic ${encodedToken}`,
      Accept: '*/*'
    };
    const response = await axios.put<any>(url, file, {
      // headers: helper.uploadHeaderHandler(true, headers)
      headers: {
        ...nHeaders
      }
    });
    if (response.status == 200) {
      enqueueSuccessBar('Uploading is successful!');
    }
  };
  return (
    <>
      <MainCard>
        <Stack spacing={2}>
          <Stack>
            <Typography variant={'h2'}>Multiple Part Upload</Typography>
            <Box>
              <UploadMultiFile
                sx={{ padding: 0, borderColor: theme.palette.secondary.light }}
                showList={false}
                setFieldValue={onSetFiles}
                files={uploadFiles}
                onUpload={onSubmit}
                simplePlaceholder={true}
              />
            </Box>
          </Stack>
          <Stack>
            <Typography variant={'h2'}>Upload Object</Typography>
            <Box>
              <UploadMultiFile
                sx={{ padding: 0, borderColor: theme.palette.secondary.light }}
                showList={false}
                setFieldValue={onSetFilesNormal}
                files={uploadFilesNormal}
                onUpload={onSubmitNormal}
                simplePlaceholder={true}
              />
            </Box>
          </Stack>
        </Stack>
      </MainCard>
    </>
  );
};

export default StoragePage;
