import LoadingButton from '@base/components/@extended/LoadingButton';
import DatePicker from '@base/components/@hanbiro/Date/DatePicker';
import MiModal from '@base/components/@hanbiro/MiModal';
import * as exportComponents from '@base/containers/ExportData/config/components';
import * as keyNames from '@base/containers/ExportData/config/keyNames';
import WriteField from '@base/containers/WriteField';
import { useExportMutation } from '@base/hooks/export-import/useExportMutation';
import { useGetOperation } from '@base/hooks/export-import/useGetOperation';
import { useStorageDownloadMutation } from '@base/hooks/forms/useFileUploadMutation';
import { LabelValueData } from '@base/types/app';
import { BaseMutationResponse } from '@base/types/response';
import { Box, Button, Divider, Grid, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CustomizedProgressBars from './CustomizedProgressBars';
import { SELECT_DATA, FORMAT_FILE_OPTIONS } from '@base/containers/ExportData/config/constants';

const STEPS = ['Select Options', 'Map Fields', 'Download File Export'];

const formDefaultValues: any = {
  // [keyNames.KEY_NAME_EXPORT_SELECT_MODULE]: 'customer',
  [keyNames.KEY_NAME_EXPORT_SELECT_DATA]: SELECT_DATA[0],
  [keyNames.KEY_NAME_EXPORT_SELECT_FORMAT_FILE]: FORMAT_FILE_OPTIONS[0],
  [keyNames.KEY_NAME_EXPORT_CUSTOM_FIELDS]: []
};

interface ExportDataProps {
  menu?: string;
  isOpen: boolean;
  onClose: () => void;
  onReload?: () => void;
}

const ExportDataModal = (props: ExportDataProps) => {
  const { menu, isOpen, onClose, onReload } = props;
  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: formDefaultValues,
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  // state
  const [exportStep, setExportStep] = useState<number>(0);
  const [addTemplate, setAddTemplate] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());
  const [idExport, setIdExport] = useState<string>('');
  const [exportProgress, setExportProgress] = useState<number>(0);
  console.log('🚀 ~ file: index.tsx:80 ~ ExportDataModal ~ exportProgress', exportProgress);
  const [fileData, setFileData] = useState<any>('');

  // hooks
  const { t } = useTranslation();
  const mCreateExport: any = useExportMutation();
  const mDownloadExportFile: any = useStorageDownloadMutation<BaseMutationResponse>();

  const getProgressExport = useGetOperation(idExport, {
    enabled: !!idExport,
    refetchInterval: exportProgress < 100 ? 500 : false
  });

  useEffect(() => {
    if (getProgressExport.isSuccess && !getProgressExport.isFetching) {
      if (getProgressExport.data.progressPercent >= 100) {
        setFileData(getProgressExport.data);
      }
      setExportProgress(getProgressExport.data.progressPercent);
    }
  }, [getProgressExport.isFetching]);

  // handler
  const handleNext = () => {
    setExportStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setExportStep((prev) => prev - 1);
  };

  const handleClose = () => {
    reset();
    setExportStep(0);
    onClose();
  };

  const handleDownloadFileExport = () => {
    handleDownloadFile(fileData.fileId, fileData.fileType);
  };

  function handleDownloadFile(fileName: string, ext: string, module: string = 'longrunning') {
    const link = document.createElement('a');
    link.download = `export_${menu}.${ext}`;
    link.href = `https://desk.jiki.me:8443/v1/blockstorage/download?filename=${fileName}&module=${module}&attachment=export_${menu}.${ext}`;
    link.click();
  }

  const handleStartChange = (date: Date) => {
    setStartDate(date);
    const dateSelected: LabelValueData = {
      ...getValues(keyNames.KEY_NAME_EXPORT_SELECT_DATA),
      data: { start: dayjs(date).format(), end: dayjs(endDate).format() }
    };
    setValue(keyNames.KEY_NAME_EXPORT_SELECT_DATA, dateSelected);
  };

  const handleEndChange = (date: Date) => {
    setEndDate(date);
    const dateSelected: LabelValueData = {
      ...getValues(keyNames.KEY_NAME_EXPORT_SELECT_DATA),
      data: { start: dayjs(startDate).format(), end: dayjs(date).format() }
    };
    setValue(keyNames.KEY_NAME_EXPORT_SELECT_DATA, dateSelected);
  };

  const customFormData = (formData: any) => {
    if (formData[keyNames.KEY_NAME_EXPORT_CUSTOM_FIELDS]) {
      const nFormData = formData[keyNames.KEY_NAME_EXPORT_CUSTOM_FIELDS].map((item: any) => {
        const nItem = { ...item };
        if (nItem.languageKey) {
          nItem.label = nItem.languageKey;
          if (!nItem.labelTo) {
            nItem.labelTo = nItem.languageKey;
          }
          delete nItem.languageKey;
          return nItem;
        } else {
          if (!nItem.labelTo) {
            nItem.labelTo = nItem.label;
          }
          delete nItem.languageKey;
          return nItem;
        }
      });
      return nFormData;
    }
  };

  const onSubmit = async (formData: any) => {
    const exportVal =
      formData[keyNames.KEY_NAME_EXPORT_SELECT_DATA].value === 'all'
        ? {
            menu,
            type: 'export',
            fields: customFormData(formData),
            fileType: formData[keyNames.KEY_NAME_EXPORT_SELECT_FORMAT_FILE].value,
            allData: true
          }
        : {
            menu,
            type: 'export',
            fields: customFormData(formData),
            fileType: formData[keyNames.KEY_NAME_EXPORT_SELECT_FORMAT_FILE].value,
            allData: false,
            startDate: formData[keyNames.KEY_NAME_EXPORT_SELECT_DATA].data.start,
            endDate: formData[keyNames.KEY_NAME_EXPORT_SELECT_DATA].data.end
          };
    mCreateExport.mutate(
      { export: exportVal },
      {
        onSuccess: (data: any, variables: any, context: any) => {
          console.log('export data: ', data);
          setIdExport(data.operationId);
          setExportStep((prev) => prev + 1);
        }
      }
    );
  };

  const handleExport = () => {
    handleSubmit((data) => {
      onSubmit(data);
    })();
    setExportProgress(0);
  };

  //step tabs
  const renderExportSteps = () => {
    return (
      <Grid container>
        <Grid item xs={2} lg={2}></Grid>
        <Grid item xs={8} lg={8}>
          <Stepper activeStep={exportStep} sx={{ mt: 1, mb: 3 }}>
            {STEPS.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Grid>
        <Grid item xs={2} lg={2}></Grid>
      </Grid>
    );
  };

  const renderSelectOptionStep = () => {
    return (
      <Grid container rowSpacing={2}>
        <Grid item mb={2}>
          <Typography>You can export your data from Vora App in CSV or XLS format</Typography>
        </Grid>

        <Divider flexItem sx={{ width: '100%' }} />

        <WriteField
          item={{
            keyName: keyNames.KEY_NAME_EXPORT_SELECT_DATA,
            Component: exportComponents.RadioGroup,
            columns: 1,
            componentProps: {
              options: SELECT_DATA,
              isVertical: true
            },
            languageKey: 'Select Data',
            section: 0,
            tooltipShow: false,
            validate: {}
          }}
          control={control}
          errors={errors}
        />

        {getValues(keyNames.KEY_NAME_EXPORT_SELECT_DATA).value === 'custom' && (
          <Stack direction={'row'} width={'50%'}>
            <Box mr={3}>
              <Typography>From</Typography>
              <DatePicker
                size="small"
                value={startDate}
                onChange={(date) => {
                  handleStartChange(date ? date : new Date());
                }}
              />
            </Box>
            <Box>
              <Typography>To</Typography>
              <DatePicker
                size="small"
                value={endDate}
                onChange={(date) => {
                  handleEndChange(date ? date : new Date());
                }}
              />
            </Box>
          </Stack>
        )}

        <Grid item width={'100%'}>
          <Divider flexItem />
        </Grid>

        <WriteField
          item={{
            keyName: keyNames.KEY_NAME_EXPORT_SELECT_FORMAT_FILE,
            Component: exportComponents.RadioGroup,
            columns: 1,
            componentProps: {
              options: FORMAT_FILE_OPTIONS,
              isVertical: true
            },
            languageKey: 'Export as',
            section: 0,
            tooltipShow: false,
            validate: {}
          }}
          control={control}
          errors={errors}
        />
      </Grid>
    );
  };
  const renderCustomFieldStep = () => {
    return (
      <Grid container spacing={2}>
        <WriteField
          item={{
            keyName: keyNames.KEY_NAME_EXPORT_SELECT_TEMPLATE,
            Component: exportComponents.ExportTemplateAutocomplete,
            columns: 2,
            componentProps: {
              sx: { pl: 2 },
              options: [],
              placeholder: 'Select an Export Template',
              addLabel: 'Add New',
              onAdd: (val: boolean) => setAddTemplate(val)
            },
            languageKey: 'Fields in Export File',
            section: 0,
            tooltipShow: false,
            validate: {}
          }}
          control={control}
          errors={errors}
        />

        <Grid item width={'100%'}>
          <Divider flexItem />
        </Grid>

        <WriteField
          item={{
            keyName: keyNames.KEY_NAME_EXPORT_CUSTOM_FIELDS,
            Component: exportComponents.CustomExportFields,
            columns: 1,
            componentProps: {
              setValue: (name: string, value: any) => setValue(name, value),
              menu
            },
            languageKey: 'Or custom Fields',
            section: 0,
            tooltipShow: false,
            validate: {}
          }}
          control={control}
          errors={errors}
        />
      </Grid>
    );
  };

  const renderDownloadStep = () => {
    return (
      <Box sx={{ p: 10, position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)' }}>
        <CustomizedProgressBars onClick={handleDownloadFileExport} progress={exportProgress} label="Exporting..." />
      </Box>
    );
  };

  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          {exportStep > 0 && (
            <Button size="small" color="secondary" onClick={handleBack}>
              {t('ncrm_common_btn_back')}
            </Button>
          )}
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" variant="outlined" color="secondary" onClick={handleClose}>
              {t('ncrm_common_btn_cancel')}
            </Button>
            {exportStep + 1 < 2 && STEPS.length - 1 && (
              <Button size="small" variant="contained" onClick={handleNext}>
                {t('ncrm_common_btn_next')}
              </Button>
            )}
            {exportStep + 1 >= 2 && (
              <LoadingButton
                size="small"
                variant="contained"
                onClick={handleExport}
                loading={mCreateExport.isLoading}
                disabled={mCreateExport.isLoading || exportStep >= 2}
              >
                {t('ncrm_common_export')}
              </LoadingButton>
            )}
          </Stack>
        </Grid>
      </Grid>
    );
  }, [exportStep, mCreateExport.isLoading]);

  return (
    <MiModal title={t('ncrm_common_export') as string} isOpen={isOpen} size="sm" fullScreen={false} onClose={handleClose} footer={Footer}>
      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          flexDirection: 'column',
          border: 'none',
          minHeight: '525px',
          maxHeight: 'calc(100vh - 310px)',
          overflowY: 'auto'
        }}
      >
        {renderExportSteps()}
        <Box sx={{ flexGrow: 1, position: 'relative' }}>
          {exportStep === 0 && renderSelectOptionStep()}
          {exportStep === 1 && renderCustomFieldStep()}
          {exportStep === 2 && renderDownloadStep()}
        </Box>
      </Box>
    </MiModal>
  );
};

export default ExportDataModal;
