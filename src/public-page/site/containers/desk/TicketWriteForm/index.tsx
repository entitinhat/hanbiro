import React, { useEffect, useMemo, useState } from 'react';

//third-party
import { Controller, useForm } from 'react-hook-form';

//material
import { Box, Button, Grid, InputLabel, Stack, TextField, useTheme } from '@mui/material';

//project
import useAWSS3Mutation from '@base/hooks/aws/useAWSS3Mutation';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import LoadingButton from '@base/components/@extended/LoadingButton';
import TuiEditor from '@base/components/@hanbiro/TuiEditor';
import { MultiFileUpload } from '@base/components/@hanbiro/FileUpload';
import CodeGenerator from '@base/containers/CodeGenerator';

//menu
import * as keyNames from '@desk/ticket/config/keyNames';
import { useSiteTicketCreate } from '@public-page/site/hooks/useSiteMutations';
import ProductCategory from '@desk/ticket/containers/ProductCategory';

//local
import { finalizeParams } from './payload';

interface WriteProps {
  isOpen: boolean;
  ticketCustomer: any;
  token: string;
  onReload?: () => void;
  onClose: () => void;
}

const TicketWriteForm = (props: WriteProps) => {
  const { isOpen, token, ticketCustomer, onReload, onClose } = props;
  const theme = useTheme();
  //state
  const [curFileIndex, setCurFileIndex] = useState<number>(-1);
  const [lastUploadedFileIndex, setLastUploadedFileIndex] = useState<number>(-1);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  //react-hook
  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      [keyNames.KEY_TICKET_CODE]: '',
      [keyNames.KEY_TICKET_SUBJECT]: '',
      [keyNames.KEY_TICKET_CONTENT]: '',
      [keyNames.KEY_TICKET_CATEGORY]: null,
      [keyNames.KEY_TICKET_ATTACHMENT]: []
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  //hooks
  const mCreate = useSiteTicketCreate();
  const { mUpload } = useAWSS3Mutation();

  //check success
  useEffect(() => {
    if (mCreate.isSuccess) {
      // refecth data
      onReload && onReload();
      onClose && onClose();
    }
  }, [mCreate.isSuccess]);

  useEffect(() => {
    // console.log('<<< completed useEffect >>>', mUpload);
    if (mUpload.isSuccess) {
      const newUploadedFiles = [...uploadedFiles];
      const selectedFiles: any = getValues()[keyNames.KEY_TICKET_ATTACHMENT];
      const newUpload = {
        objectId: mUpload.data.id, //upload id
        objectUrl: mUpload.data.url, //download url
        name: selectedFiles[curFileIndex].name,
        size: selectedFiles[curFileIndex].size,
        contentType: selectedFiles[curFileIndex].type
      };
      newUploadedFiles.push(newUpload);
      setUploadedFiles(newUploadedFiles);
      //next file uploading
      setLastUploadedFileIndex(curFileIndex);
    }
  }, [mUpload.isSuccess]);

  //submit form
  const onSubmit = (formData: any) => {
    //upload files
    const uploadFiles = formData[keyNames.KEY_TICKET_ATTACHMENT];
    if (uploadFiles.length > 0) {
      if (curFileIndex === -1) {
        setCurFileIndex(lastUploadedFileIndex === -1 ? 0 : lastUploadedFileIndex + 1);
      }
    } else {
      const params = finalizeParams(formData, ticketCustomer);
      mCreate.mutate({ ticket: params, token });
    }
  };

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    // console.log('error', errors, e);
  };

  /** =============================== UPLOAD HANDLER =========================== */

  //upload current file
  useEffect(() => {
    //// console.log('curFileIndex', curFileIndex);
    const selectedFiles = getValues()[keyNames.KEY_TICKET_ATTACHMENT];
    if (curFileIndex !== -1) {
      mUpload.mutate(selectedFiles[curFileIndex]);
    }
  }, [curFileIndex]);

  //next file - last file
  useEffect(() => {
    if (lastUploadedFileIndex === -1) {
      return;
    }
    const formData = getValues();
    const selectedFiles = getValues()[keyNames.KEY_TICKET_ATTACHMENT];
    const isLastFile = lastUploadedFileIndex === selectedFiles.length - 1;
    if (isLastFile) {
      setCurFileIndex(-1);
      //start save to db
      const params: any = {
        ...finalizeParams(formData, ticketCustomer),
        attachedFiles: uploadedFiles
      };
      mCreate.mutate({ ticket: params, token });
    } else {
      //next uploaded
      const nextFileIndex = curFileIndex + 1;
      setCurFileIndex(nextFileIndex);
    }
  }, [lastUploadedFileIndex]);

  /** =============================== END UPLOAD HANDLER =========================== */

  const renderFields = () => {
    return (
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} lg={12} sx={{ display: 'none' }}>
          <Controller
            name={keyNames.KEY_TICKET_CODE}
            control={control}
            render={({ field: { value, onChange } }: any) => (
              <CodeGenerator isPublic={true} token={token} menu="ticket" value={value} onChange={onChange} />
            )}
          />
        </Grid>
        <Grid item xs={12} lg={12}>
          <InputLabel sx={{ display: 'flex' }}>
            <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Subject'} />
            <Box component="span" sx={{ ml: '5px', color: 'error.main' }}>
              *
            </Box>
          </InputLabel>
          <Controller
            name={keyNames.KEY_TICKET_SUBJECT}
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }: any) => <TextField fullWidth value={value} onChange={onChange} />}
          />
        </Grid>
        <Grid item xs={12} lg={12}>
          <InputLabel sx={{ display: 'flex' }}>
            <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Product'} />
            <Box component="span" sx={{ ml: '5px', color: 'error.main' }}>
              *
            </Box>
          </InputLabel>
          <Controller
            name={keyNames.KEY_TICKET_CATEGORY}
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }: any) => (
              <ProductCategory hideProductLabel={true} isPublic={true} value={value} onChange={onChange} />
            )}
          />
        </Grid>
        <Grid item xs={12} lg={12}>
          <InputLabel sx={{ display: 'flex' }}>
            <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Content'} />
            <Box component="span" sx={{ ml: '5px', color: 'error.main' }}>
              *
            </Box>
          </InputLabel>
          <Controller
            name={keyNames.KEY_TICKET_CONTENT}
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }: any) => <TuiEditor value={value} onChange={onChange} />}
          />
        </Grid>
        <Grid item xs={12} lg={12}>
          <InputLabel sx={{ display: 'flex' }}>
            <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Attached Files'} />
          </InputLabel>
          <Controller
            name={keyNames.KEY_TICKET_ATTACHMENT}
            control={control}
            //rules={{ required: true }}
            render={({ field: { value, onChange } }: any) => <MultiFileUpload value={value} onChange={onChange} />}
          />
        </Grid>
      </Grid>
    );
  };

  //buttons
  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" color="secondary" variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              color="success"
              loading={mCreate.isLoading}
              loadingPosition="start"
              startIcon={<></>}
              disabled={mCreate.isLoading || !isValid}
              onClick={() => {
                handleSubmit((data) => onSubmit(data), onError)();
              }}
            >
              Create
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [mCreate.isLoading, isValid]);

  console.log('form values', watch()); //get form values when inputing

  return (
    <MiModal title={<SpanLang keyLang={'New Ticket'} />} isOpen={isOpen} size="md" fullScreen={false} onClose={onClose} footer={Footer}>
      {isOpen && (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <React.Suspense fallback={<></>}>
            <Box sx={{ p: 2.5 }}>{renderFields()}</Box>
          </React.Suspense>
        </form>
      )}
    </MiModal>
  );
};

export default TicketWriteForm;
