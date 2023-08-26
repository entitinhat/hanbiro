import React, { useEffect, useMemo, useState } from 'react';

//third-party
import { Controller, useForm } from 'react-hook-form';

//material
import { Box, Button, Grid, InputLabel, Stack, useTheme } from '@mui/material';

//project
import useAWSS3Mutation from '@base/hooks/aws/useAWSS3Mutation';
import { TICKET_COMMENT_DISPLAY_PUBLIC, TICKET_COMMENT_KIND_NEW } from '@desk/ticket/config/constants';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import LoadingButton from '@base/components/@extended/LoadingButton';
import TuiEditor from '@base/components/@hanbiro/TuiEditor';
import { MultiFileUpload } from '@base/components/@hanbiro/FileUpload';

//menu
import * as keyNames from '@desk/ticket/config/keyNames';
import { useSiteTicketCommentCreate } from '@public-page/site/hooks/useSiteMutations';

interface WriteProps {
  isOpen: boolean;
  ticketId: string;
  ticketName: string;
  parentId?: string;
  onReload?: () => void;
  onClose: () => void;
}

const FeedbackWriteForm = (props: WriteProps) => {
  const { isOpen, ticketId, ticketName, parentId, onReload, onClose } = props;
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
      [keyNames.KEY_TICKET_REPLY_MESSAGE]: '',
      [keyNames.KEY_TICKET_REPLY_FILE]: []
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  //hooks
  const mAdd = useSiteTicketCommentCreate();
  const { mUpload } = useAWSS3Mutation();

  //check success
  useEffect(() => {
    if (mAdd.isSuccess) {
      // refecth data
      onReload && onReload();
      onClose && onClose();
    }
  }, [mAdd.isSuccess]);

  useEffect(() => {
    // console.log('<<< completed useEffect >>>', mUpload);
    if (mUpload.isSuccess) {
      const newUploadedFiles = [...uploadedFiles];
      const selectedFiles: any = getValues()[keyNames.KEY_TICKET_REPLY_FILE];
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
    const uploadFiles = formData[keyNames.KEY_TICKET_REPLY_FILE];
    if (uploadFiles.length > 0) {
      if (curFileIndex === -1) {
        setCurFileIndex(lastUploadedFileIndex === -1 ? 0 : lastUploadedFileIndex + 1);
      }
    } else {
      const params = {
        comment: {
          ticket: { id: ticketId, name: ticketName },
          parent: { id: parentId, name: '' },
          kind: TICKET_COMMENT_KIND_NEW,
          comment: {
            content: formData[keyNames.KEY_TICKET_REPLY_MESSAGE],
            display: TICKET_COMMENT_DISPLAY_PUBLIC
          }
        }
      };
      mAdd.mutate(params);
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
    const selectedFiles = getValues()[keyNames.KEY_TICKET_REPLY_FILE];
    if (curFileIndex !== -1) {
      mUpload.mutate(selectedFiles[curFileIndex]);
    }
  }, [curFileIndex]);

  //next file - last file
  useEffect(() => {
    if (lastUploadedFileIndex === -1) {
      return;
    }
    const selectedFiles = getValues()[keyNames.KEY_TICKET_REPLY_FILE];
    const isLastFile = lastUploadedFileIndex === selectedFiles.length - 1;
    if (isLastFile) {
      setCurFileIndex(-1);
      //start save to db
      const params = {
        comment: {
          ticket: { id: ticketId, name: ticketName },
          parent: { id: parentId, name: '' },
          kind: TICKET_COMMENT_KIND_NEW,
          comment: {
            content: getValues()[keyNames.KEY_TICKET_REPLY_MESSAGE],
            display: TICKET_COMMENT_DISPLAY_PUBLIC,
            attachedFiles: uploadedFiles
          }
        }
      };
      mAdd.mutate(params);
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
        <Grid item xs={12} lg={12}>
          <InputLabel sx={{ display: 'flex' }}>
            <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Comment'} />
            <Box component="span" sx={{ ml: '5px', color: 'error.main' }}>
              *
            </Box>
          </InputLabel>
          <Controller
            name={keyNames.KEY_TICKET_REPLY_MESSAGE}
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
            name={keyNames.KEY_TICKET_REPLY_FILE}
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
              color="primary"
              loading={mAdd.isLoading}
              loadingPosition="start"
              startIcon={<></>}
              disabled={mAdd.isLoading || !isValid}
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
  }, [mAdd.isLoading, isValid]);

  console.log('form values', watch()); //get form values when inputing

  return (
    <MiModal title={<SpanLang keyLang={'New comment'} />} isOpen={isOpen} size="md" fullScreen={false} onClose={onClose} footer={Footer}>
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

export default FeedbackWriteForm;
