import useAWSS3Mutation from '@base/hooks/aws/useAWSS3Mutation';
import { DownloadObjectRequest } from '@base/types/s3';
import { CircularProgress } from '@mui/material';
import { Box, Skeleton, Stack, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';

const CtaImagePreview: React.FC<any> = (props: any) => {
  const { imgSrc, imgAlt, imgSize } = props;

  const theme = useTheme();

  // state
  const [imageSrc, setImageSrc] = useState<string>('');
  // const [imageData, setImageData] = useState<any>(null);

  // useEffect(() => {
  //   if (imgSrc != imageSrc) {
  //     setImageSrc(imgSrc);
  //   }
  // }, [imgSrc]);

  // download mutation
  const { mDownload } = useAWSS3Mutation();

  // useEffect(() => {
  //   if (imageSrc != '' && !mDownload.isLoading) {
  //     const params: DownloadObjectRequest = {
  //       key: imageSrc,
  //       bucket: 'desk-ncrm'
  //     };
  //     mDownload.mutate(params, {
  //       onSuccess: (data: any, variables: any, context: any) => {
  //         setImageData(data);
  //       }
  //     });
  //   }
  // }, [imageSrc]);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      flexGrow={1}
      sx={{
        mt: 1,
        mb: 2,
        width: '100%',
        height: '100%',
        borderRadius: 1,
        '& img': {
          maxWidth: '100%',
          width: imgSize?.width,
          height: imgSize?.height,
          objectFit: 'contain'
        }
      }}
    >
      {imgSrc && <img src={imgSrc} alt={imgAlt} onError={() => console.log('no img')} />}
    </Stack>
  );
};

export default CtaImagePreview;
