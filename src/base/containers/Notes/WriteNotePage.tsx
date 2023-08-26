import { useCallback, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { Box, Button, Grid, Stack, useTheme } from '@mui/material';

import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import LoadingButton from '@base/components/@extended/LoadingButton';
import { MENU_SOURCE } from '@base/config/menus';
import { NoteForm } from '@base/types/note';
import WriteField from '@base/containers/WriteField';
import validators from '@base/utils/validation/fieldValidator';
import useNoteMutation from '@base/hooks/notes/useNoteMutation';
import * as baseComponents from '@base/config/write-field/components';
import useDevice from '@base/hooks/useDevice';
import { queryClient } from '@base/config/queryClient';
import { queryKeys } from '@base/config/queryKeys';

interface Props {
  value?: any;
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  source: string;
  sourceId: string;
  isEdit?: boolean;
  refetch?: () => void;
}

const WritePage = (props: Props) => {
  const { isOpen, onClose, value, sourceId, source, isEdit, id, refetch } = props;
  const { mAddNote, mUpdateNote } = useNoteMutation(sourceId);
  const theme = useTheme();
  const { t } = useTranslation();
  const { isMobile } = useDevice();
  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: value,
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  const onSubmit = useCallback(({ formData }: any) => {
    if (isEdit) {
      const note: NoteForm = {
        id: id,
        source: {
          menu: source,
          id: sourceId
        },
        content: formData.content
      };
      mUpdateNote.mutate({ note: note });
    } else {
      const note: NoteForm = {
        source: {
          menu: source,
          id: sourceId
        },
        content: formData.content
      };
      mAddNote.mutate({ note: note });
    }
  }, []);

  useEffect(() => {
    if (mAddNote.isSuccess || mUpdateNote.isSuccess) {
      // queryClient.refetchQueries({ queryKey: [queryKeys.notes, sourceId] });
      refetch && refetch();
      onClose && onClose();
    }
  }, [mAddNote, mUpdateNote]);

  const fields: any[] = [
    {
      keyName: 'content',
      columns: 1,
      Component: baseComponents.TuiEditor,
      languageKey: 'Content',
      componentProps: {
        autoComplete: 'off',
        fullWidth: true,
        placeholder: 'Add a note'
      },
      validate: {
        required: validators.required
      },
      hideTitle: true,
      value: value
    }
  ];

  const MainFields = useMemo(() => {
    return (
      <>
        {fields?.map((_item, _index) => {
          return <WriteField key={_item.keyName} item={_item} control={control} errors={errors} />;
        })}
      </>
    );
  }, [fields, errors, control]);

  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" variant="outlined" color="secondary" onClick={onClose}>
              <SpanLang keyLang="ncrm_common_btn_cancel" textOnly />
            </Button>
            <LoadingButton
              loading={false}
              variant="contained"
              loadingPosition="start"
              startIcon={<></>}
              onClick={() => {
                handleSubmit((data) => onSubmit({ formData: data }))();
              }}
              disabled={false}
            >
              <SpanLang keyLang={isEdit ? `ncrm_common_btn_update` : `ncrm_common_btn_save`} textOnly />
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    );
  }, []);

  return (
    <MiModal
      title={<SpanLang keyLang={isEdit ? `Update Note` : `Add Note`} />}
      isOpen={isOpen}
      size="md"
      fullScreen={false}
      onClose={onClose}
      footer={Footer}
      anchor={'right'}
    >
      <form>
        <Box sx={{ p: 2, width: isMobile ? '100vw' : '600px' }}>
          <Grid container spacing={2} alignItems="center">
            {MainFields}
          </Grid>
        </Box>
      </form>
    </MiModal>
  );
};

export default WritePage;
