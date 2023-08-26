import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { Box, Button, Grid, Stack, TextField, useTheme } from '@mui/material';

import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import LoadingButton from '@base/components/@extended/LoadingButton';
import WriteField from '@base/containers/WriteField';
import validators from '@base/utils/validation/fieldValidator';
import WebsiteInput from '@base/components/@hanbiro/WebsiteInput';

import * as keyNames from '@lead/config/keyNames';
import { useLeadMutation } from '@lead/hooks/useLeadMutation';

interface Props {
  value?: any;
  isOpen: boolean;
  onClose: any;
  id: string;
}

const WritePage = (props: Props) => {
  const { isOpen, onClose, value, id } = props;

  const theme = useTheme();
  const { t } = useTranslation();

  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: { name: '', website: '' },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });
  const { mLeadCreateCompetitor } = useLeadMutation();

  const onSubmit = useCallback(({ formData }: any) => {
    mLeadCreateCompetitor.mutate({ 
      competitor: { 
        ...formData, 
        website: { 
          ...formData?.website, 
          label: formData?.website?.label?.label 
        }, 
       },
       id: id });
    onClose && onClose(formData);
  }, []);

  const fields: any[] = [
    {
      keyName: keyNames.KEY_LEAD_COMPEPITOR_NAME,
      columns: 1,
      Component: TextField,
      languageKey: 'opportunity_competitor_field_basic_name',
      componentProps: {
        autoComplete: 'off',
        fullWidth: true
      },
      validate: {
        required: validators.required
      }
    },
    {
      keyName: keyNames.KEY_LEAD_COMPEPITOR_WEBSITE,
      columns: 1,
      Component: WebsiteInput,
      languageKey: 'opportunity_competitor_field_basic_website',
      componentProps: {
        fullWidth: true
      },
      validate: {
        required: validators.required
      }
    }
  ];

  const MainFields = useMemo(() => {
    return (
      <>
        {fields?.map((_item, _index) => {
          // Group WriteFields

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
              disabled={!isValid}
            >
              <SpanLang keyLang={`ncrm_common_btn_save`} textOnly />
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [isValid]);

  //======================== Debug ========================//
  // console.log('form values', watch()); //get form values when inputing
  // console.log('form errors', errors); //get form values when inputing
  // console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  return (
    <MiModal
      title={<SpanLang keyLang={`Add Competitor`} />}
      isOpen={isOpen}
      size="md"
      fullScreen={false}
      onClose={onClose}
      footer={Footer}
      anchor={'right'}
    >
      <form>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            {MainFields}
          </Grid>
        </Box>
      </form>
    </MiModal>
  );
};

export default WritePage;
