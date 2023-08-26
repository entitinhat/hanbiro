// material-ui
import { styled } from '@mui/material/styles';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';

// third-party
import { useDropzone } from 'react-dropzone';

// project import
import RejectionFiles from './RejectionFiles';
import PlaceholderContent from './PlaceholderContent';
import FilesPreview from './FilesPreview';

// types
import { CustomFile, MIMEType, UploadMultiFileProps } from '@base/types/dropzone';

const DropzoneWrapper = styled('div')(({ theme }) => ({
  outline: 'none',
  padding: theme.spacing(1, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.secondary.main}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' }
}));

// ==============================|| UPLOAD - MULTIPLE FILE ||============================== //

const MultiFileUpload = ({
  error,
  showList = false,
  files,
  setFieldValue,
  sx,
  onUpload,
  simplePlaceholder = false,
  autoUpload = false,
  allowExtensions,
  ...other
}: UploadMultiFileProps) => {
  const theme = useTheme();
  const getAcceptExtensionsField = (allowExtensions: MIMEType[] | undefined) => {
    const res: {
      [key: string]: string[];
    } = {};
    if (allowExtensions && allowExtensions?.length > 0) {
      allowExtensions.map((extension: MIMEType) => {
        res[`${extension.type}/${extension.subtype}`] = extension.extensions;
      });
    }
    return res;
  };
  const getAcceptExtensions = (allowExtensions: MIMEType[] | undefined) => {
    let res: string[] = [];
    if (allowExtensions && allowExtensions?.length > 0) {
      allowExtensions.map((extension: MIMEType) => {
        res = res.concat(extension.extensions);
      });
    }
    return res;
  };
  // console.log('getAcceptExtensions(allowExtensions)', getAcceptExtensionsField(allowExtensions));
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: true,
    accept: getAcceptExtensionsField(allowExtensions),
    onDrop: (acceptedFiles: CustomFile[]) => {
      if (files) {
        setFieldValue('files', [
          ...files,
          ...acceptedFiles.map((file: CustomFile) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          )
        ]);
      } else {
        setFieldValue(
          'files',
          acceptedFiles.map((file: CustomFile) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          )
        );
      }
    }
  });

  const onRemoveAll = () => {
    setFieldValue('files', null);
  };

  const onRemove = (file: File | string) => {
    const filteredItems = files && files.filter((_file) => _file !== file);
    setFieldValue('files', filteredItems);
  };

  // console.log('getAcceptExtensions(allowExtensions)', getAcceptExtensions(allowExtensions));
  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropzoneWrapper
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter'
          }),
          padding: theme.spacing(1, 1) //simplePlaceholder ? theme.spacing(1, 1) : theme.spacing(5, 1)
        }}
      >
        <input {...getInputProps()} />
        <PlaceholderContent simple={simplePlaceholder} />
      </DropzoneWrapper>
      {allowExtensions && (
        <Typography variant="h6" color="textSecondary" sx={{ mt: '5px' }} align="right">{`Files allowed: ${getAcceptExtensions(
          allowExtensions
        ).map((extension: string) => {
          return ` ${extension}`;
        })}`}</Typography>
      )}
      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}
      {files && files.length > 0 && !autoUpload && <FilesPreview files={files} showList={showList} onRemove={onRemove} />}
      {files && files.length > 0 && !autoUpload && showList && (
        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
          <Button color="inherit" size="small" onClick={onRemoveAll}>
            Remove all
          </Button>
          <Button size="small" variant="contained" onClick={onUpload}>
            Upload files
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default MultiFileUpload;
