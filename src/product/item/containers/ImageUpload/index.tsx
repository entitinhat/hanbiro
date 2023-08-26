// material-ui
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';

// third-party
import { useDropzone } from 'react-dropzone';

// project import

// assets
import { CameraOutlined } from '@ant-design/icons';

// types
import { CustomFile, UploadProps } from '@base/types/dropzone';
import IconAvatar from '@base/components/@hanbiro/IconAvatar';

const RootWrapper = styled('div')(({ theme }) => ({
  width: 40,
  height: 40
  // borderRadius: '50%',
  // border: `1px dashed ${theme.palette.primary.main}`,
  // background: theme.palette.primary.lighter
}));

const DropzoneWrapper = styled('div')({
  zIndex: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '4px',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': { width: '100%', height: '100%' },
  '&:hover': {
    cursor: 'pointer',
    '& .placeholder': {
      zIndex: 9
    }
  }
});

const PlaceholderWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: alpha(theme.palette.primary.lighter, 0.75),
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&:hover': { opacity: 0.85 }
}));

// ==============================|| UPLOAD - AVATAR ||============================== //

const ImageUpload = ({ error, file, setFieldValue, sx, ...other }: UploadProps) => {
  const theme = useTheme();

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    accept: {
      'image/*': []
    },
    multiple: false,
    onDrop: (acceptedFiles: CustomFile[]) => {
      setFieldValue(
        'files',
        acceptedFiles.map((file: CustomFile) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const thumbs =
    file &&
    file.map((item: CustomFile) => (
      <img
        key={item.name}
        alt={item.name}
        src={item.preview}
        onLoad={() => {
          URL.revokeObjectURL(item.preview!);
        }}
      />
    ));

  return (
    <>
      <RootWrapper
        sx={{
          ...((isDragReject || error) &&
            {
              // borderColor: 'error.light'
            }),
          ...sx
        }}
      >
        <DropzoneWrapper {...getRootProps()} sx={{ ...(isDragActive && { opacity: 1 }) }}>
          <input {...getInputProps()} />
          {thumbs}

          <PlaceholderWrapper
            className="placeholder"
            sx={{
              ...(thumbs && {
                opacity: 0,
                color: 'common.white',
                bgcolor: 'grey.900'
              }),
              ...((isDragReject || error) && {
                bgcolor: 'error.lighter'
              })
            }}
          >
            <IconAvatar showType="image" variant="rounded" id={''} url={''} alt={''} size="md" />
          </PlaceholderWrapper>
        </DropzoneWrapper>
      </RootWrapper>
    </>
  );
};

export default ImageUpload;
