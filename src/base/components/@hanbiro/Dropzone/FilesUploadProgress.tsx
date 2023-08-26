// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { List, ListItemText, ListItem, LinearProgress, Box, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
// project import
import { getFileIcon, humanFileSize } from '@base/utils/helpers';

// utils
import getDropzoneData from '@base/utils/getDropzoneData';

// type
import { FileUploadProgressProps, UploadFileProgress } from '@base/types/dropzone';

// assets
import { SvgIcons } from '@base/assets/icons/svg-icons';
import { Typography } from '@mui/material';
import { PauseCircleOutlineOutlined } from '@mui/icons-material';
import { useAbortUploadMutation } from '@base/hooks/forms/useFileUploadMutation';
import { BaseMutationResponse } from '@base/types/response';
import { DeleteUploadRequest } from '@base/types/s3';
import { useEffect, useState } from 'react';
import useSnackBar from '@base/hooks/useSnackBar';
import UploadThumbnail from './UploadThumbnail';

// ==============================|| MULTI UPLOAD - PREVIEW ||============================== //

const renderAttachmentIcon = (fileName: string, preview?: string) => {
  const icon = getFileIcon(fileName);
  if (['jpg', 'png'].includes(icon) && preview)
    return (
      <Box sx={{ mr: '5px' }}>
        <UploadThumbnail preview={preview} maxWidth={50} />
      </Box>
    );
  else
    return (
      <Box sx={{ width: '50px', mr: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <SvgIcons type={icon} />{' '}
      </Box>
    );
};
export default function FilesUploadProgress({ uploadFiles, handleDeleteFile, startUpload = true }: FileUploadProgressProps) {
  // const theme = useTheme();
  const { enqueueErrorBar } = useSnackBar();
  const [progressFiles, setProgressFiles] = useState<UploadFileProgress[]>([]);
  const hasFile = progressFiles.length > 0;
  const completedFiles = progressFiles.filter((upFile) => upFile.percentCompleted === 100);
  const showProgress = !(progressFiles.length === completedFiles.length);
  //mutation
  const mAbortUpload: any = useAbortUploadMutation<BaseMutationResponse>({
    useErrorBoundary: false
  });
  const handleRemoveUpload = (upFile: UploadFileProgress, rIdx: number) => {
    if (upFile?.uploadId) {
      const req: DeleteUploadRequest = {
        id: upFile.uploadId,
        bucket: upFile.bucket
      };
      mAbortUpload.mutate(req, {
        onSuccess: (data: any, variables: any, context: any) => {
          //toast.success('Uploaded successfully!');
          const nUpFiles = progressFiles.filter((value, index) => index !== rIdx);
          setProgressFiles(nUpFiles);
        },
        onError: (error: any, variables: any, context: any) => {
          //// console.log('mutation error', error);
          enqueueErrorBar('Deleting upload has error:' + error?.message ?? '');
        }
      });
    } else {
      const nUpFiles = progressFiles.filter((value, index) => index !== rIdx);
      console.log('uploadFiles after delete:', nUpFiles);
      setProgressFiles(nUpFiles);
      handleDeleteFile && handleDeleteFile(nUpFiles);
    }
  };
  useEffect(() => {
    if (uploadFiles) {
      console.log('uploadFiles', uploadFiles);
      const nProgressFile = uploadFiles.filter((upFile) => !upFile.stopped);
      console.log('nProgressFile', nProgressFile);
      setProgressFiles(nProgressFile);
    }
  }, [uploadFiles]);
  return (
    <>
      {showProgress && (
        <>
          {startUpload && (
            <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>
              Uploading Process
            </Typography>
          )}
          <List disablePadding sx={{ ...(hasFile && { mb: 1 }), width: '100%' }}>
            {progressFiles.map((upFile, index) => {
              console.log('upFile:', upFile);
              const { key, name, size, preview, type } = getDropzoneData(upFile.file, index);
              console.log('getDropzoneData', key, name, size, preview, type);

              return (
                <ListItem
                  key={key}
                  sx={{
                    my: 1,
                    px: 2,
                    py: 0.75,
                    borderRadius: 0.75,
                    border: (theme) => `solid 1px ${theme.palette.divider}`
                  }}
                  secondaryAction={
                    <>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={(e: any) => {
                          handleRemoveUpload(upFile, index);
                        }}
                      >
                        <CancelIcon />
                      </IconButton>
                    </>
                  }
                >
                  <Box component="span" sx={{ '& svg': { width: 'auto', height: '30px', mr: 1 }, alignItems: 'center' }}>
                    {renderAttachmentIcon(name ?? '', preview)}
                  </Box>
                  <ListItemText
                    primary={name}
                    secondary={
                      <>
                        {humanFileSize(size || 0)}
                        {startUpload && <LinearProgress variant="determinate" value={upFile.percentCompleted} />}
                      </>
                    }
                    primaryTypographyProps={{ variant: 'subtitle2' }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
              );
            })}
          </List>
        </>
      )}
    </>
  );
}
