import { useCallback, useMemo } from 'react';

import { Box, Button, Grid, InputLabel, Select, Stack, Switch, TextField, useTheme } from '@mui/material';

import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import LoadingButton from '@base/components/@extended/LoadingButton';
import { Controller, useForm } from 'react-hook-form';
import * as keyNames from '@settings/preferences/config/lead/keyNames';
import WriteField from '@base/containers/WriteField';
import validators from '@base/utils/validation/fieldValidator';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';

interface Props {
  value?: any;
  isOpen: boolean;
  onClose: any;
}

const WritePage = (props: Props) => {
  const { isOpen, onClose, value } = props;

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

  const onSubmit = useCallback(({ formData }: any) => {
    //waiting for API
    // const configParams = getParams(formData); //generate api params by fields
    // configParams.isPublish = isPublish;
    // const newParams: any = finalizeParams(configParams);
    // console.log('newParams', newParams);
    // mutationAdd(newParams);
    onClose && onClose(formData);
  }, []);

  const fields: any[] = [
    {
      keyName: keyNames.KEY_SALES_TEAM_MEMBER_USER,
      columns: 1,
      Component: UserAutoComplete,
      languageKey: 'User',
      componentProps: {
        single: true
      },
      validate: {
        required: validators.required
      }
    },
    {
      keyName: keyNames.KEY_SALES_TEAM_MEMBER_ROLE,
      columns: 1,
      Component: Select,
      languageKey: 'Marketing/Sales Role',
      validate: {
        required: validators.required
      }
    },
    {
      keyName: keyNames.KEY_SALES_TEAM_MEMBER_ACTIVE,
      columns: 1,
      Component: Switch,
      languageKey: 'Active',
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
              size="small"
              loading={false}
              variant="contained"
              loadingPosition="start"
              startIcon={<></>}
              onClick={() => {
                handleSubmit((data) => onSubmit({ formData: data }))();
              }}
              disabled={false}
            >
              <SpanLang keyLang={`ncrm_common_btn_save`} textOnly />
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    );
  }, []);

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
        <Box sx={{ p: 2, width: '500px' }}>
          <Grid container spacing={2} alignItems="center">
            {MainFields}
          </Grid>
        </Box>
      </form>
    </MiModal>
  );
};

export default WritePage;
