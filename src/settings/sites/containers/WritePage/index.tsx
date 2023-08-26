import React, { useMemo, useState } from 'react';
import validators from '@base/utils/validation/fieldValidator';
//material
import { Box, Button, Grid, Stack, Step, StepLabel, Stepper, TextField, useTheme } from '@mui/material';
import * as keyNames from '@settings/sites/config/key-names';
//project
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { ButtonOption } from '@base/types/extended';
import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';

import WriteField from '@base/containers/WriteField';
import { useForm } from 'react-hook-form';
import SelectBoxCustom from '@base/components/@hanbiro/SelectBoxCustom';
import { SITE_TYPE_OPTIONS_ENUM } from '@settings/sites/config/constants';
import ProductAutoComplete from '@product/product/containers/ProductAutoComplete';
import { useFormDefaultValues } from './utils';

interface WritePageProps {
  isOpen: boolean;
  fullScreen?: boolean;
  showCategory?: boolean;
  showCanvas?: boolean;
  onReload?: () => void;
  onGoView?: (id: string) => void;
  onClose: () => void;
  onSuccess?: (val: any) => void;
  title?: string;
  group: string;
}

const steps = ['Properties', 'Select a Template', 'Design'];

const WritePage = (props: WritePageProps) => {
  const { isOpen, fullScreen, showCategory, showCanvas, onReload, onClose, onSuccess, onGoView, title, group } = props;

  const theme = useTheme();

  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    //getValues,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: useFormDefaultValues(group),
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  // state
  const [activeStep, setActiveStep] = useState<number>(0);
  const [product, setProduct] = useState<any>(null);
  const [productIsValid, setProductIsValid] = useState<boolean>(true);
  const [productSubmit, setProductSubmit] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  // close
  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {};

  // buttons
  const Footer = useMemo(() => {
    const options: ButtonOption[] = [
      {
        isMain: true,
        label: activeStep <= steps.length - 2 ? 'Next' : 'Save',
        color: 'primary',
        onClick: activeStep <= steps.length - 2 ? handleNext : handleSave,
        disabled: isSaving || !productIsValid,
        isLoading: isSaving
      },
      {
        isMain: false,
        label: 'Save and Create Items later',
        color: 'secondary',
        onClick: () => {
          setProductSubmit(true);
        },
        disabled: isSaving || !productIsValid,
        isLoading: isSaving
      }
    ];

    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          {activeStep > 0 && (
            <Button size="small" color="secondary" onClick={handleBack}>
              Back
            </Button>
          )}
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" color="secondary" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <ButtonSplit buttons={options} />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [activeStep, productIsValid, isSaving]);
  const renderForm = () => {
    return (
      <Box
        className="scroll-box"
        sx={{
          // height: 'calc(100vh - 100px)',
          padding: '15px'
        }}
      >
        <Grid container rowSpacing={2} alignItems="center">
          {activeStep == 0 && (
            <>
              <WriteField
                item={{
                  keyName: keyNames.KEY_SITE_NAME,
                  Component: TextField,
                  columns: 1,
                  componentProps: {},
                  languageKey: 'Name',
                  section: 0,
                  tooltipShow: false,
                  validate: {
                    required: validators.required
                  }
                }}
                control={control}
                errors={errors}
              />

              {/* Normal type */}
              <WriteField
                item={{
                  keyName: keyNames.KEY_MENU_SITE_TYPE,
                  Component: SelectBoxCustom,
                  columns: 1,
                  componentProps: {
                    options: SITE_TYPE_OPTIONS_ENUM
                  },
                  languageKey: 'Template Type',
                  section: 0,
                  tooltipShow: false,
                  validate: {
                    required: validators.required
                  }
                }}
                control={control}
                errors={errors}
              />

              <WriteField
                item={{
                  keyName: keyNames.KEY_MENU_SITE_PRODUCT,
                  Component: ProductAutoComplete,
                  columns: 1,
                  componentProps: {},
                  languageKey: 'Product',
                  section: 0,
                  tooltipShow: false,
                  validate: {}
                }}
                control={control}
                errors={errors}
              />
              <WriteField
                item={{
                  keyName: keyNames.KEY_MENU_SITE_DESCRIPTION,
                  Component: TextField,
                  columns: 1,
                  componentProps: {
                    fullWidth: true,
                    autoComplete: 'off',
                    multiline: true,
                    rows: 4
                  },
                  languageKey: 'Description',
                  section: 0,
                  tooltipShow: false,
                  validate: {}
                }}
                control={control}
                errors={errors}
              />
            </>
          )}
          {activeStep == 1 && <React.Fragment>{`Developing`}</React.Fragment>}
          {activeStep == 2 && (
            <React.Fragment>
              <WriteField
                item={{
                  keyName: keyNames.KEY_MENU_SITE_SUBJECT,
                  Component: TextField,
                  columns: 1,
                  componentProps: {},
                  languageKey: 'Description',
                  section: 0,
                  tooltipShow: false,
                  validate: {
                    required: validators.required
                  }
                }}
                control={control}
                errors={errors}
              />
              {/* <WriteField
                item={{
                  keyName: keyNames.KEY_MENU_SITE_DESIGN,
                  Component: GrapesTS,
                  columns: 1,
                  componentProps: {
                    isFullScreen: fullScreen,
                    height: 'calc(100vh - 70px)',
                    storageId: 'site-gts',
                    templateType: 'call'
                  },
                  languageKey: 'Description',
                  section: 0,
                  tooltipShow: false,
                  validate: {
                    required: validators.required
                  }
                }}
                control={control}
                errors={errors}
              /> */}
            </React.Fragment>
          )}
        </Grid>
      </Box>
    );
  };
  //======================== Debug ========================//
  // console.log('form values', watch()); //get form values when inputing
  //console.log('form errors', errors); //get form values when inputing
  //console.log('form isValid', isValid); //get form values when inputing
  //console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  return (
    <MiModal
      title={<SpanLang keyLang={title ?? 'Create'} />}
      isOpen={isOpen}
      size="md"
      fullScreen={false}
      onClose={handleClose}
      footer={Footer}
    >
      <Stepper
        activeStep={activeStep}
        nonLinear={true}
        connector={<></>}
        sx={{
          justifyContent: 'space-around'
        }}
      >
        {steps.map((label: string, index: number) => (
          <Step
            key={label}
            sx={{
              p: 1,
              display: 'flex',
              flex: 1,
              backgroundColor:
                activeStep > index
                  ? theme.palette.success.main
                  : activeStep === index
                  ? theme.palette.primary.main
                  : theme.palette.secondary[400]
            }}
            completed={activeStep > index}
          >
            <StepLabel
              sx={{
                '.MuiSvgIcon-root': {
                  border: `2px solid`,
                  borderColor: theme.palette.common.white,
                  borderRadius: `15px`
                },
                '.MuiStepIcon-text': {
                  fontWeight: `bolder`
                },
                '.MuiStepLabel-label': {
                  color: `${theme.palette.common.white} !important`,
                  fontWeight: `bolder`
                }
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {renderForm()}
    </MiModal>
  );
};

export default WritePage;
