import React, { useEffect, useRef, useState } from 'react';
import imageNoPic from '@base/assets/images/users/no-pic-m.png';
import { Box, Stack } from '@mui/material';
import { useDownloadObjectMutation } from '@base/hooks/forms/useFileUploadMutation';
import LazyLoadImage from '@base/components/@hanbiro/LazyLoadImage';

const View: React.FC<any> = (props: any) => {
  const { value } = props; //value is S3 url
  //const loadedRef = useRef(true);
  const [imageData, setImageData] = useState<any>(null);
  //const [curValue, setCurValue] = useState('');

  //download mutation
  const mDownload: any = useDownloadObjectMutation<any>({
    onSuccess: (data: any, variables: any, context: any) => {
      setImageData(data);
    },
    onError: (error: any, variables: any, context: any) => {}
  });

  //re-init
  // useEffect(() => {
  //   if (value !== curValue) {
  //     setCurValue(value);
  //     loadedRef.current = true;
  //   }
  // }, [value]);

  //init load image
  useEffect(() => {
    if (value) {
      //if (loadedRef.current) {
      try {
        const params = JSON.parse(value);
        mDownload.mutate(params);
      } catch (e) {
        console.log('photo parse error');
      }
      // return () => {
      //   loadedRef.current = false;
      // };
      //}
    }
  }, [value]);

  return (
    <Stack sx={{ display: 'flex', width: '100%' }} justifyContent={'center'} alignItems={'center'}>
      <Box justifyContent={'center'} alignItems={'center'} sx={{ display: 'flex', marginRight: '3px', width: '100%' }}>
        <LazyLoadImage url={value ? imageData : imageNoPic} thumb={imageNoPic} />
      </Box>
    </Stack>
  );
};

export default View;
