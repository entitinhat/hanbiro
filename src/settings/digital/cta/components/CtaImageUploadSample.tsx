import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React, { useEffect, useRef, useState } from 'react';
import { t } from 'i18next';

import image1 from '@base/assets/images/cta/cta-sample-1.png';
import image2 from '@base/assets/images/cta/cta-sample-2.png';
import image3 from '@base/assets/images/cta/cta-sample-3.png';
import image4 from '@base/assets/images/cta/cta-sample-4.png';
import image5 from '@base/assets/images/cta/cta-sample-5.png';
import image6 from '@base/assets/images/cta/cta-sample-6.png';
import { Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import CtaImageUpload from './CtaImageUpload';

const SAMPLE_IMAGES = [
  { name: 'cta-sample-1', image: image1 },
  { name: 'cta-sample-2', image: image2 },
  { name: 'cta-sample-3', image: image3 },
  { name: 'cta-sample-4', image: image4 },
  { name: 'cta-sample-5', image: image5 },
  { name: 'cta-sample-6', image: image6 }
];

interface CtaImageUploadSampleProps {
  value?: any;
  onChange?: (value: any) => void;
  errors?: any;
  imageData?: any;
}

const CtaImageUploadSample = (props: CtaImageUploadSampleProps) => {
  const { value, onChange, errors, imageData } = props;
  const theme = useTheme();

  // state
  const [showButtonSample, setShowButtonSample] = useState<boolean>(true);
  const [curValue, setCurValue] = useState<any>({ name: '', image: null }); //{name: '', image: FILE}
  const [activeItem, setActiveItem] = useState<any>(null);
  const fileRef = useRef<any>(null);

  // init
  useEffect(() => {
    if (value) {
      if (value?.name !== curValue.name) {
        setCurValue(value);
      }
    } else {
      setCurValue({ name: '', image: null });
    }
  }, [value]);

  // files select
  const handleFileChange = (files: any) => {
    if (files.length > 0) {
      const newValue = { name: files[0].name, image: files[0] };
      setCurValue(newValue);
      // callback
      onChange && onChange(newValue);
    } else {
      // console.log('...cancleUpload...');
    }
  };

  // sample select
  const handleSampleChange = (item: any) => {
    if (JSON.stringify(item) != JSON.stringify(curValue)) {
      setCurValue(item);
      setActiveItem(item.name);

      // callback
      onChange && onChange(item);
    }
  };

  return (
    <>
      <Stack direction="row">
        <Button
          size="small"
          sx={{ mr: 2 }}
          variant={showButtonSample ? 'outlined' : 'contained'}
          onClick={() => {
            setShowButtonSample(false);
          }}
        >
          <CloudUploadIcon sx={{ mr: 0.5 }} />
          {t('ncrm_generalsetting_cta_image_upload')}
        </Button>
        <Button
          size="small"
          color="info"
          variant={showButtonSample ? 'contained' : 'outlined'}
          onClick={() => {
            setShowButtonSample(true);
          }}
        >
          {t('ncrm_generalsetting_cta_image_sample')}
        </Button>
      </Stack>
      {showButtonSample && (
        <Box
          className="scroll-box"
          sx={{ mt: '10px!important', p: '10px', height: '100%', border: `1px solid ${theme.palette.divider}`, borderRadius: 1 }}
        >
          <Typography sx={{ mb: 2 }}>{t('ncrm_generalsetting_cta_image_sample_list')}</Typography>
          <Grid container spacing={1}>
            {SAMPLE_IMAGES.map((item: any, index: number) => (
              <React.Suspense key={index} fallback={<></>}>
                <ImageSampleItem item={item} onChange={handleSampleChange} activeItem={activeItem} />
                {/* <Grid item xs={12} md={6} lg={4}>
                  <Box
                    key={index}
                    sx={{
                      position: 'relative',
                      mr: '0.3125rem',
                      mb: '0.3125rem',
                      p: 0,
                      cursor: 'pointer',
                      borderRadius: 0,
                      '& img': {
                        width: '100%'
                      }
                    }}
                  >
                    <CheckCircleIcon
                      color="success"
                    
                    />
                    <img
                      src={item.image}
                      alt={item.name}
                      onClick={(e: any) => {
                        handleSampleChange(item);
                      }}
                    />
                  </Box>
                </Grid> */}
              </React.Suspense>
            ))}
          </Grid>
        </Box>
      )}

      {!showButtonSample && (
        <CtaImageUpload
          value={null}
          // value={value}
          errors={errors}
          onChange={(files: any) => {
            handleFileChange(files);
          }}
        />
      )}
    </>
  );
};

export default CtaImageUploadSample;

// image sample component
interface IamgeSampleItemProps {
  item: any;
  onChange?: (data: any) => void;
  activeItem?: any;
}

const ImageSampleItem = (props: IamgeSampleItemProps) => {
  const { item, onChange, activeItem } = props;

  const handleChangeImageSample = (data: any) => {
    // callback
    onChange && onChange(data);
  };

  return (
    <Grid item xs={12} md={6} lg={4} display="flex" alignItems="center">
      <Box
        key={item.name}
        sx={{
          position: 'relative',
          mr: '5px',
          mb: '5px',
          p: 0,
          cursor: 'pointer',
          borderRadius: 0,
          '& img': {
            width: '100%'
          }
        }}
      >
        <CheckCircleIcon
          color="success"
          sx={{
            position: 'absolute',
            display: item.name === activeItem ? 'block' : 'none',
            top: 0,
            left: 0,
            transform: 'translate(-40%, -40%)'
          }}
        />
        <img src={item.image} alt={item.name} onClick={() => handleChangeImageSample(item)} />
      </Box>
    </Grid>
  );
};
