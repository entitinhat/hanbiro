import { Box, Grid, Stack, useTheme } from '@mui/material';
import UploadMultiFile from '@base/components/@hanbiro/Dropzone/MultiFile';
import FilesUploadProgress from '@base/components/@hanbiro/Dropzone/FilesUploadProgress';
import { useEffect, useState } from 'react';
import { useUploadMutation } from '@base/hooks/forms/useFileUploadMutation';
import { BaseMutationResponse } from '@base/types/response';
import useSnackBar from '@base/hooks/useSnackBar';
import { S3UploadedFile } from '@base/types/s3';
import { MIMEType } from '@base/types/dropzone';

interface S3UploadFilesProps {
  autoUpload?: boolean;
  showList?: boolean;
  onUploadCompleted: (files: S3UploadedFile[]) => void;
  startUpload: boolean;
  allowExtensions?: MIMEType[];
}
const S3UploadFiles = (props: S3UploadFilesProps) => {
  const { autoUpload = false, showList = true, onUploadCompleted, startUpload, allowExtensions } = props;
  const theme = useTheme();
  const { enqueueErrorBar } = useSnackBar();

  const [uploadFiles, setUploadFiles] = useState<any[]>([]);
  const [completedFiles, setCompletedFiles] = useState<S3UploadedFile[]>([]);
  const [curFileIndex, setCurFileIndex] = useState<number>(-1);
  const [lastUploadedFileIndex, setLastUploadedFileIndex] = useState<number>(-1);
  const [progressParts, setProgressParts] = useState<any>([]);
  //calculate progress for parts
  const uploadProgressHandler = async (progressEvent: ProgressEvent, numberParts: number, partIndex: number, extraParam: any) => {
    const { uploadId, bucket } = extraParam;
    if (progressEvent.loaded >= progressEvent.total) return;
    const currentProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //set parts upload progress
    setProgressParts((progressParts: any[]) => {
      progressParts[partIndex] = currentProgress;
      const sum = progressParts.reduce((acc: any, curr: any) => acc + curr);

      //set file progress
      const newUploadFiles = [...uploadFiles];
      if (!newUploadFiles[curFileIndex].stopped) {
        newUploadFiles[curFileIndex].percentCompleted = Math.round(sum / numberParts);
        newUploadFiles[curFileIndex].uploadId = uploadId || '';
        newUploadFiles[curFileIndex].bucket = bucket || '';
        //@TODO need to improve rerender
        setUploadFiles(newUploadFiles);
      }

      return progressParts;
    });
  };
  // upload
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
    (pEvent: ProgressEvent, partsNumber: number, partIndex: number, extraParam?: any) =>
      uploadProgressHandler(pEvent, partsNumber, partIndex, extraParam)
  );
  //upload files change, start upload files
  useEffect(() => {
    if (startUpload) {
      if (uploadFiles.length > 0 && curFileIndex === -1) {
        setCurFileIndex(lastUploadedFileIndex === -1 ? 0 : lastUploadedFileIndex + 1);
      }
      if (uploadFiles.length === 0) {
        onUploadCompleted && onUploadCompleted([]);
      }
    }
  }, [startUpload]);

  //upload current file
  useEffect(() => {
    if (curFileIndex !== -1) {
      mUpload.mutate(uploadFiles[curFileIndex].file);
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
  //files select
  const handleFilesChange = (files: any) => {
    // reset upload
    setLastUploadedFileIndex(-1);
    const newFiles = files.map((_file: any) => ({ file: _file, percentCompleted: 0, stopped: false }));
    if (uploadFiles.length === 0) setUploadFiles(newFiles);
    else setUploadFiles(uploadFiles.concat(newFiles));
  };
  const handleDeleteFile = (files: any) => {
    setUploadFiles(files);
  };
  console.log('uploadFIles waiting for upload:', uploadFiles);
  //upload success
  useEffect(() => {
    if (mUpload.isSuccess) {
      console.log('<<< completed useEffect >>>', mUpload);
      //set progress to 100
      const newUploadFiles = [...uploadFiles];
      newUploadFiles[curFileIndex].percentCompleted = 100;

      //save to DB
      // uploading has Error
      const nCompletedFiles = [...completedFiles];
      if (mUpload.data.key === '') {
        // upload has error
        newUploadFiles[curFileIndex].stopped = true;
      }

      if (mUpload.data.key !== '') {
        const upFile: S3UploadedFile = {
          objectId: mUpload.data.key as string, //upload id
          objectUrl: mUpload.data.bucket as string, //download url
          name: newUploadFiles[curFileIndex].file.name as string,
          size: newUploadFiles[curFileIndex].file.size as number,
          contentType: newUploadFiles[curFileIndex].file.type as string
        };
        nCompletedFiles.push(upFile);
      }
      setLastUploadedFileIndex(curFileIndex);
      setUploadFiles(newUploadFiles);
      setCompletedFiles(nCompletedFiles);
      if (curFileIndex === uploadFiles.length - 1) {
        // upload completed
        onUploadCompleted && onUploadCompleted(nCompletedFiles);
      }
    }
  }, [mUpload.isSuccess]);
  return (
    <>
      <Box component="div" sx={{ marginTop: '10px' }}>
        <Grid container>
          <Grid item xs={12}>
            <Stack alignItems="center">
              <UploadMultiFile
                sx={{ padding: 0, borderColor: theme.palette.secondary.light }}
                showList={showList}
                setFieldValue={(field: string, nFiles: any[]) => {
                  handleFilesChange(nFiles);
                }}
                simplePlaceholder={true}
                autoUpload={autoUpload}
                allowExtensions={allowExtensions}
              />
              {uploadFiles.length > 0 && (
                <FilesUploadProgress uploadFiles={uploadFiles} handleDeleteFile={handleDeleteFile} startUpload={startUpload} />
              )}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default S3UploadFiles;
