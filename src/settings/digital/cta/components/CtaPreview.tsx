import { Box, Stack, Typography, useTheme } from '@mui/material';
import { t } from 'i18next';
import { isString } from 'lodash';
import { useEffect, useRef, useState } from 'react';

const CtaPreview = (props: any) => {
  const { image, imageSize = { width: '300px', height: '300px' }, altText } = props;
  const theme = useTheme();

  // state
  const [imagePreview, setImagePreView] = useState<string>('');

  useEffect(() => {
    if (image) {
      if (isString(image?.image)) {
        setImagePreView(image?.image);
      } else {
        setImagePreView(URL?.createObjectURL(image?.image));
      }
    }
  }, [image]);

  return (
    <Stack direction="column" sx={{ height: '100%' }}>
      <Typography>{t('ncrm_generalsetting_cta_preview')}</Typography>
      <Stack
        justifyContent="center"
        alignItems="center"
        flexGrow={1}
        sx={{
          mt: 1,
          height: '100%',
          bgcolor: theme.palette.grey[100],
          borderRadius: 1,
          '& img': {
            width: imageSize?.width,
            height: imageSize?.height,
            objectFit: 'contain'
          }
        }}
      >
        {imagePreview && <img src={imagePreview} alt={altText} />}
      </Stack>
    </Stack>
  );
};

export default CtaPreview;
