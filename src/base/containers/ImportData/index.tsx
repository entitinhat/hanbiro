import { SvgIcons } from '@base/assets/icons/svg-icons';
import LoadingButton from '@base/components/@extended/LoadingButton';
import SingleFileUpload from '@base/components/@hanbiro/Dropzone/SingleFile';
import MiModal from '@base/components/@hanbiro/MiModal';
import * as importComponents from '@base/containers/ImportData/config/components';
import * as keyNames from '@base/containers/ImportData/config/keyNames';
import WriteField from '@base/containers/WriteField';
import { useGetImport } from '@base/hooks/export-import/useGetImport';
import { useGetOperation } from '@base/hooks/export-import/useGetOperation';
import { useImportMutation } from '@base/hooks/export-import/useImportMutation';
import { useStorageDownloadMutation, useStorageUploadMutation } from '@base/hooks/forms/useFileUploadMutation';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { convertDateTimeServerToClient, getFileIcon, humanFileSize } from '@base/utils/helpers';
import { DeleteOutlined } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  styled,
  Theme,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CustomizedProgressBars from '../ExportData/CustomizedProgressBars';
import MapFieldsImport from './MapFieldsImport';
import { CHARACTER_ENCODINGS, FILE_DELIMITER } from '@base/containers/ImportData/config/constant';
import saveAs from 'file-saver';
import { useGetSampleFile } from '@base/hooks/export-import/useGetSampleFile';
import { useCheckImportMutation } from '@base/hooks/export-import/useCheckImportMutation';
import { ReactEditable8 } from '@base/components/@hanbiro/ReactTable8';
import { ColumnDef } from '@tanstack/react-table';

const STEPS = ['Configure', 'Map Fields', 'Preview'];

const formDefaultValues: any = {
  // fileImport: null,
  [keyNames.KEY_NAME_IMPORT_CHARACTER_ENCODING]: CHARACTER_ENCODINGS[0],
  [keyNames.KEY_NAME_IMPORT_FILE_DELIMITER]: FILE_DELIMITER[0],
  [keyNames.KEY_NAME_IMPORT_FIELDS_AFTER_MAP]: [],
  [keyNames.KEY_NAME_IMPORT_FIELDS_FILE_TYPE]: ''
};

interface ImportDataProps {
  menu?: string;
  isOpen: boolean;
  onClose: () => void;
  onReload?: () => void;
}

const PreviewContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  '& .MuiAccordion-root': {
    // border: 'none !important',
    border: ` 1px solid !important`,
    borderRadius: 4,
    borderColor: `${theme.palette.divider} !important`,
    '& .MuiAccordionSummary-root': {
      backgroundColor: 'transparent !important',
      // flexDirection: 'row !important',
      '& .MuiAccordionSummary-content': {
        // marginLeft: 0
      }
      // '& .MuiAccordionSummary-expandIconWrapper': {
      //   display: 'none'
      // }
    },
    '& .MuiAccordionDetails-root': {
      border: 'none !important',
      padding: 8,
      paddingTop: 0
    },
    '& .Mui-expanded': {
      color: `${theme.palette.primary.main} !important`
    }
  }
}));

const ImportDataModal = (props: ImportDataProps) => {
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
  const [importStep, setImportStep] = useState<number>(0);
  const [curFile, setCurFile] = useState<any>(null);
  const [fileType, setFileType] = useState<string>('');
  const [fieldsOfMenu, setFieldsOfMenu] = useState<any>([]);
  const [fieldsFileImport, setFieldsFileImport] = useState<any>([]);
  const [idUpload, setIdUpload] = useState<string>('');
  const [idImport, setIdImport] = useState<string>('');
  const [importProgress, setImportProgress] = useState<number>(0);
  const [sampleFileType, setSampleFileType] = useState<string>('');
  const [checkImportData, setCheckImportData] = useState<any>(null);
  // hooks
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();
  const { t } = useTranslation();
  const theme = useTheme();
  const validExts = ['csv', 'xls', 'xlsx'];

  // get import
  const params = {
    import: {
      menu,
      type: 'import',
      fileType: fileType,
      fileId: idUpload
    }
  };
  const getImport = useGetImport(params, {
    enabled: idUpload !== ''
  });

  const {
    data: sampleFileData,
    refetch,
    isSuccess
  } = useGetSampleFile(
    {
      sampleFile: {
        menu,
        fileType: sampleFileType
      }
    },
    {
      enabled: !!sampleFileType,
      onSuccess: (sampleFileData: any) => {
        const link = document.createElement('a');
        link.href = `https://desk.jiki.me:8443/v1/blockstorage/download?filename=${sampleFileData.fileId}&module=longrunning&attachment=import_${menu}_sample.${sampleFileData.fileType}`;
        link.click();
      },
      staleTime: 0
    }
  );

  useEffect(() => {
    if (sampleFileType !== '') {
      refetch();
    }
  }, [sampleFileType]);

  useEffect(() => {
    if (getImport.isSuccess) {
      setFieldsOfMenu(getImport.data.fields);
      setFieldsFileImport(getImport.data.fileHeaders);
    }
  }, [getImport.isSuccess]);

  // Upload file import
  const mStorageUpLoad: any = useStorageUploadMutation<BaseMutationResponse>({
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Upload File Import failed: ' + JSON.parse(error).message);
    },
    onSuccess: (data: any) => {
      setIdUpload(data?.data[0]);
    }
  });

  // mutation create import
  const mCreateImport: any = useImportMutation();

  // get progress import
  const getProgressImport = useGetOperation(idImport, {
    enabled: !!idImport,
    refetchInterval: importProgress < 100 ? 500 : false
  });

  useEffect(() => {
    if (getProgressImport.isSuccess && !getProgressImport.isFetching) {
      setImportProgress(getProgressImport.data.progressPercent);
    }
  }, [getProgressImport.isFetching]);

  useEffect(() => {
    if (mCreateImport.isSuccess) {
      setIdImport(mCreateImport.data.operationId);
      setImportStep((prev) => prev + 1);
    }
  }, [mCreateImport.isSuccess]);

  useEffect(() => {
    if (curFile) {
      const fileFormData = new FormData();
      fileFormData.append('files', curFile);
      fileFormData.append('module', 'longrunning');
      const aFileType = curFile.name.split('.');
      setFileType(aFileType.length > 0 ? aFileType[aFileType.length - 1] : 'csv');
      mStorageUpLoad.mutate(fileFormData);
    }
  }, [curFile]);

  // handler
  const handleFileChange = (files: any) => {
    if (files.length > 0) {
      const nameArr = files[0].name.split('.');
      const ext = nameArr.length > 1 ? nameArr[nameArr.length - 1] : undefined;
      console.log(nameArr);
      if (validExts.includes(ext)) {
        setCurFile(files[0]);
        setValue(keyNames.KEY_NAME_IMPORT_FIELDS_FILE_TYPE, ext);
      } else {
        setCurFile(null);
        enqueueErrorBar('Invalid file format!');
      }
    }
  };

  // Handle Modal buttons
  const handleNext = () => {
    setImportStep((prev) => prev + 1);
  };

  const mCheckImport = useCheckImportMutation();

  const onCheckImportSubmit = (data: any) => {
    // console.log(data);

    // console.log('data import: ', {
    //   menu,
    //   type: 'import',
    //   fileType: fileType,
    //   fileId: idUpload,
    //   fields: customFormData(data)
    // });

    mCheckImport.mutate(
      {
        import: {
          menu,
          type: 'import',
          fileType: fileType,
          fileId: idUpload,
          fields: customFormData(data)
        }
      },
      {
        onSuccess: (data: any) => {
          setCheckImportData(data);
          setImportStep((prev: number) => prev + 1);
        }
      }
    );
  };

  const handleSecondStepNext = () => {
    handleSubmit((data) => onCheckImportSubmit(data))();
  };

  const handleBack = () => {
    setImportStep((prev) => prev - 1);
  };

  const handleClose = () => {
    setImportStep(0);
    reset();
    onClose();
  };

  const handleDeleteFileImport = () => {
    setCurFile(null);
    setIdUpload('');
  };

  const customFormData = (data: any) => {
    if (data[keyNames.KEY_NAME_IMPORT_FIELDS_AFTER_MAP]) {
      const nFormData = data[keyNames.KEY_NAME_IMPORT_FIELDS_AFTER_MAP]
        .filter((item: any) => item.labelTo !== '')
        .map((item: any) => {
          const nItem = { ...item };
          delete nItem.languageKey;
          return nItem;
        });
      return nFormData;
    }
  };

  const onSubmit = async (data: any) => {
    const importVal = {
      menu,
      type: 'import',
      fileId: idUpload,
      fields: customFormData(data),
      fileType: data[keyNames.KEY_NAME_IMPORT_FIELDS_FILE_TYPE]
    };
    mCreateImport.mutate({ import: importVal });
  };

  const handleImport = () => {
    handleSubmit((data) => onSubmit(data))();
  };

  //render icon or image
  const renderFileIcon = () => {
    const icon: any = getFileIcon(curFile.name);
    return <SvgIcons type={icon} />;
  };

  //step tabs
  const renderImportSteps = () => {
    return (
      <Grid container>
        <Grid item xs={2} lg={2}></Grid>
        <Grid item xs={8} lg={8}>
          <Stepper activeStep={importStep} sx={{ mt: 1, mb: 3 }}>
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

  // download sample
  const handleDownloadSample = (ext: string) => {
    if (ext === sampleFileType) {
      refetch();
    } else {
      setSampleFileType(ext);
    }
  };

  // render step
  const renderConfigureStep = () => {
    return (
      <>
        <Typography sx={{ my: 2 }}>
          Download a{' '}
          <Typography
            sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            color="primary"
            component="a"
            onClick={() => handleDownloadSample('csv')}
          >
            sample csv file
          </Typography>{' '}
          or{' '}
          <Typography
            sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            color="primary"
            component="a"
            onClick={() => handleDownloadSample('xlsx')}
          >
            sample xlsx file
          </Typography>{' '}
          and compare it to your import file to ensure you have the file perfect for the import.
        </Typography>

        {/* File Name */}
        <Grid container rowSpacing={4} sx={{ mt: 2, px: 6 }}>
          <Grid item xs={4}>
            <Typography sx={{ fontWeight: 500, color: theme.palette.grey[600] }}>
              File Name
              <Box component="span" sx={{ color: 'red' }}>
                *
              </Box>
            </Typography>
          </Grid>

          <Grid item xs={8}>
            <Box width="100%">
              {curFile ? (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  flexWrap="nowrap"
                  flexGrow={1}
                  sx={{ height: '60px', p: 1, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}
                >
                  {mStorageUpLoad.isLoading && <CircularProgress size={30} />}
                  {mStorageUpLoad.isSuccess && (
                    <>
                      <Box sx={{ marginRight: '5px', height: '100%', '& > svg': { height: '100%' } }}>{renderFileIcon()}</Box>
                      <Box sx={{ overFlow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginLeft: '10px', flex: 1 }}>
                        {curFile.name}
                        <Box
                          sx={{ overFlow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#6c757d ', fontSize: '80%' }}
                        >
                          <>
                            ({humanFileSize(curFile.size || 1)}){' '}
                            {convertDateTimeServerToClient({ date: curFile.lastModifiedDate, isTime: true })}
                          </>
                        </Box>
                      </Box>

                      <Tooltip title="Remove" placement="right">
                        <IconButton onClick={handleDeleteFileImport}>
                          <DeleteOutlined fontSize="small" color="error" />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </Stack>
              ) : (
                <SingleFileUpload
                  sx={{ '& > div': { display: 'flex', height: '60px' } }}
                  file={null}
                  simplePlaceholder
                  setFieldValue={(type: string, files: any) => {
                    handleFileChange(files);
                  }}
                />
              )}

              <Typography sx={{ mt: 1, textAlign: 'center', fontSize: '12px', color: theme.palette.grey[500] }}>
                File Format: CSV or XLS or XLSX
              </Typography>
            </Box>
          </Grid>

          {/* Character Encoding */}
          <Grid item xs={4}>
            <Typography sx={{ fontWeight: 500, color: theme.palette.grey[600] }}>
              Character Encoding
              <Box component="span" sx={{ color: 'red' }}>
                *
              </Box>
            </Typography>
          </Grid>

          <Grid item xs={8}>
            <WriteField
              item={{
                hideTitle: true,
                keyName: keyNames.KEY_NAME_IMPORT_CHARACTER_ENCODING,
                Component: importComponents.SelectBox,
                columns: 1,
                componentProps: {
                  options: CHARACTER_ENCODINGS
                },
                languageKey: 'Character Encoding',
                section: 0,
                tooltipShow: false,
                validate: {}
              }}
              control={control}
              errors={errors}
            />
          </Grid>

          {/* File Delimiter */}
          <Grid item xs={4}>
            <Typography sx={{ fontWeight: 500, color: theme.palette.grey[600] }}>
              File Delimiter
              <Box component="span" sx={{ color: 'red' }}>
                *
              </Box>
            </Typography>
          </Grid>

          <Grid item xs={8}>
            <WriteField
              item={{
                hideTitle: true,
                keyName: keyNames.KEY_NAME_IMPORT_FILE_DELIMITER,
                Component: importComponents.SelectBox,
                columns: 1,
                componentProps: {
                  options: FILE_DELIMITER
                },
                languageKey: 'File Delimiter',
                section: 0,
                tooltipShow: false,
                validate: {}
              }}
              control={control}
              errors={errors}
            />
          </Grid>
        </Grid>
      </>
    );
  };
  const renderMapFieldsStep = () => {
    return (
      <>
        <Box sx={{ py: 2, display: 'inline-block' }}>
          {`Your Selected File: `}
          <Chip sx={{ ml: 1 }} label={curFile?.name} />
        </Box>

        <Typography sx={{ pb: 2 }}>The best match to each field on the selected file have been auto-selected.</Typography>

        <Typography sx={{ pb: 2, fontSize: '16px', fontWeight: 500 }}>Map Fields Details</Typography>
        <Box sx={{ px: 6 }}>
          <MapFieldsImport
            fieldsMenu={fieldsOfMenu}
            fieldsImport={fieldsFileImport}
            setValue={(name: string, value: any) => setValue(name, value)}
            getValues={getValues}
          />
        </Box>
      </>
    );
  };

  const renderPreviewStep = () => {
    // ---------------allowed---------------
    const recordsAllowed = checkImportData?.allowed?.count;

    const editableAllowedColumn: Partial<ColumnDef<any>> = {
      cell: ({ getValue, row: { index }, column: { id }, table }) => {
        //console.log('table', table);
        //console.log('column id', id);
        const initialValue = getValue();

        // We need to keep and update the state of the cell normally
        const [value, setValue] = React.useState(initialValue || '');

        // When the input is blurred, we'll call our table meta's updateData function
        const onBlur = () => {
          table.options.meta?.updateCellData(index, id, value);
        };

        // If the initialValue is changed external, sync it up with our state
        React.useEffect(() => {
          setValue(initialValue || '');
        }, [initialValue]);

        return <>{initialValue}</>;
      }
    };

    const allowedColumns = checkImportData?.allowed?.header?.values?.map((v: string, i: number) => ({
      accessorKey: v,
      header: () => <span>{t(v)}</span>
    }));

    const allowedItems =
      checkImportData?.allowed?.records?.map((v: any) => {
        let item = {};

        v.values?.forEach((val: string, i: number) => {
          item = { ...item, [checkImportData?.allowed?.header?.values?.[i]]: val };
        });

        return item;
      }) || [];

    // ----------------skiped----------------

    const recordsSkipped = checkImportData?.skiped?.count;

    const editableSkippedColumn: Partial<ColumnDef<any>> = {
      cell: ({ getValue, row: { index }, column: { id }, table }) => {
        const initialValue = getValue();

        // We need to keep and update the state of the cell normally
        const [value, setValue] = React.useState(initialValue || '');

        // When the input is blurred, we'll call our table meta's updateData function
        const onBlur = () => {
          table.options.meta?.updateCellData(index, id, value);
        };

        // If the initialValue is changed external, sync it up with our state
        React.useEffect(() => {
          setValue(initialValue || '');
        }, [initialValue]);

        return <>{initialValue}</>;
      }
    };

    const skippedColumns = checkImportData?.skiped?.header?.values?.map((v: string, i: number) => ({
      accessorKey: v,
      header: () => <span>{t(v)}</span>
    }));

    const skippedItems =
      checkImportData?.skiped?.records?.map((v: any) => {
        let item = {};

        v.values?.forEach((val: string, i: number) => {
          item = { ...item, [checkImportData?.allowed?.header?.values?.[i]]: val };
        });

        return item;
      }) || [];

    // ----------------unmap----------------
    const unmapFields = checkImportData?.unmap?.length;
    return (
      <Stack pt={2} justifyContent="center" width="100%" height="100%">
        <PreviewContainer>
          <Accordion sx={{ mb: 1 }}>
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
              <Stack direction="row" spacing={1.25} alignItems="center">
                <Stack>
                  <Typography variant="subtitle1" color="textPrimary" sx={{ textTransform: 'capitalize' }}>
                    Records that are ready to be imported {`(${recordsAllowed})`}
                  </Typography>
                </Stack>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <ReactEditable8
                editableColumn={editableAllowedColumn}
                columns={allowedColumns}
                data={[...allowedItems]}
                setData={(newData: any) => {
                  console.log(newData);
                }}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ mb: 1 }}>
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
              <Stack direction="row" spacing={1.25} alignItems="center">
                <Stack>
                  <Typography variant="subtitle1" color="textPrimary" sx={{ textTransform: 'capitalize' }}>
                    No. of records skipped {`(${recordsSkipped})`}
                  </Typography>
                </Stack>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <ReactEditable8
                editableColumn={editableSkippedColumn}
                columns={skippedColumns}
                data={[...skippedItems]}
                setData={(newData: any) => {
                  console.log(newData);
                }}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
              <Stack direction="row" spacing={1.25} alignItems="center">
                <Stack>
                  <Typography variant="subtitle1" color="textPrimary" sx={{ textTransform: 'capitalize' }}>
                    Unmapped Fields {`(${unmapFields})`}
                  </Typography>
                </Stack>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Stack p={2} spacing={2}>
                {checkImportData?.unmap?.map((v: any) => (
                  <Stack direction="row" key={v.keyName}>
                    <Typography>{v.label}</Typography>
                    <Typography>{v.labelTo}</Typography>
                  </Stack>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </PreviewContainer>
      </Stack>
    );
  };

  const renderProgress = () => {
    return (
      <Box sx={{ p: 10, position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)' }}>
        <CustomizedProgressBars type="import" progress={importProgress} label="Importing..." />
      </Box>
    );
  };
  // footer
  const Footer = useMemo(() => {
    const fieldsAfterMap = watch(keyNames.KEY_NAME_IMPORT_FIELDS_AFTER_MAP);
    const recordsReady = fieldsAfterMap.filter((item: any) => item.labelTo !== '').length;
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          {importStep > 0 && (
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
            {importStep + 1 < 3 && STEPS.length - 1 && (
              <Button size="small" variant="contained" onClick={importStep + 1 == 2 ? handleSecondStepNext : handleNext} disabled={!curFile}>
                {t('ncrm_common_btn_next')}
              </Button>
            )}
            {importStep + 1 >= 3 && (
              <LoadingButton
                variant="contained"
                onClick={handleImport}
                loading={mCreateImport.isLoading}
                disabled={mCreateImport.isLoading || importStep > 2 || recordsReady === 0}
              >
                {t('ncrm_common_import')}
              </LoadingButton>
            )}
          </Stack>
        </Grid>
      </Grid>
    );
  }, [importStep, curFile]);

  return (
    <MiModal title={t('ncrm_common_import') as string} isOpen={isOpen} size="sm" fullScreen={false} onClose={handleClose} footer={Footer}>
      <Box
        sx={{ p: 2.5, display: 'flex', flexDirection: 'column', minHeight: '465px', maxHeight: 'calc(100vh - 310px)', overflowY: 'auto' }}
      >
        {renderImportSteps()}
        <Box sx={{ flexGrow: 1, position: 'relative' }}>
          {importStep === 0 && renderConfigureStep()}
          {importStep === 1 && renderMapFieldsStep()}
          {importStep === 2 && renderPreviewStep()}
          {importStep === 3 && renderProgress()}
        </Box>
      </Box>
    </MiModal>
  );
};

export default ImportDataModal;

// map fields
