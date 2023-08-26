import React, { useMemo, useState } from 'react';

//material
import { Button, Grid, Stack } from '@mui/material';
import { Save } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';

//project
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import WriteForm from '@product/item/containers/WriteForm';

interface WritePageProps {
  isOpen: boolean;
  fullScreen?: boolean;
  showCanvas?: boolean;
  onReload?: () => void;
  onGoView?: (id: string) => void;
  onClose: () => void;
  onSuccess?: (val: any) => void;
  prodData?: any;
  fromProd?: boolean;
}

const WritePage = (props: WritePageProps) => {
  const { isOpen, fullScreen, showCanvas, onReload, onClose, onSuccess, onGoView, prodData, fromProd = false } = props;

  // state
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  // close
  const handleClose = () => {
    onClose();
  };

  // change step
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  // change step
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSave = () => {
    setIsSubmit(true);
  };

  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          {activeStep > 0 && (
            <Button size="small" color="secondary" onClick={handleBack}>
              <SpanLang keyLang="ncrm_common_btn_back" textOnly />
            </Button>
          )}
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" variant="outlined" color="secondary" onClick={handleClose}>
              <SpanLang keyLang="ncrm_common_btn_cancel" textOnly />
            </Button>
            <LoadingButton
              size="small"
              loading={isSaving}
              variant="contained"
              loadingPosition="start"
              startIcon={<></>}
              onClick={activeStep >= 1 ? handleSave : handleNext}
              disabled={!isValid}
            >
              <SpanLang keyLang={activeStep >= 1 ? 'ncrm_common_btn_save' : 'ncrm_common_btn_next'} textOnly />
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [activeStep, isValid, isSaving]);

  return (
    <MiModal
      title={<SpanLang keyLang={`ncrm_product_create_item`} />}
      isOpen={isOpen}
      size={activeStep >= 1 ? 'lg' : 'md'}
      fullScreen={false}
      onClose={handleClose}
      footer={Footer}
    >
      <WriteForm
        step={activeStep}
        onValid={(isValid: boolean) => setIsValid(isValid)}
        onSaving={setIsSaving}
        isSubmit={isSubmit}
        withProd={false}
        prodData={prodData}
        fromProd={fromProd}
        onSuccess={() => {
          onReload && onReload();
          handleClose();
        }}
      />
    </MiModal>
  );
};

export default WritePage;
