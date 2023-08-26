import { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { Box, Button, Grid, Stack, Switch, TextField, useTheme } from '@mui/material';

import { generateUUID } from '@base/utils/helpers';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import LoadingButton from '@base/components/@extended/LoadingButton';
import WriteField from '@base/containers/WriteField';
import validators from '@base/utils/validation/fieldValidator';
import useDevice from '@base/hooks/useDevice';
import useSnackBar from '@base/hooks/useSnackBar';
import { useMenuSettingUpdate } from '@settings/general/hooks/useMenuSetting';
import { WRITE_TYPE_PAIN_POINT } from '@settings/preferences/config/lead/constants';

import { useLeadMutation } from '@lead/hooks/useLeadMutation';
import * as keyNames from '@lead/config/keyNames';

interface Props {
  value?: any;
  listIndentify?: any;
  isOpen: boolean;
  onClose: any;
  id: string;
}

const WritePage = (props: Props) => {
  const { isOpen, onClose, value =[], id, listIndentify } = props;

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
    defaultValues: {
      name: '',
      isActive: false
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  const { mUpdateLead } = useLeadMutation();
  const mSettingUpdate = useMenuSettingUpdate();
  const { enqueueSuccessBar } = useSnackBar();
  

  const onSubmit = useCallback(({ formData }: any) => {
    const nId = generateUUID()
    let params: any;
    params = {
      menu: 'sales',
      key: WRITE_TYPE_PAIN_POINT,
      value: JSON.stringify([...listIndentify, { id: nId, name: formData.name }])
    };

    mSettingUpdate.mutate(
      { menuSetting: params },
      {
        onSuccess: (res: any) => {
          enqueueSuccessBar('Add item successfully!');
        }
      }
    );

    if(formData.isActive){
      mUpdateLead.mutate({ 
        lead: { 
          [keyNames.KEY_LEAD_PAIN_POINT]: [...value, { id: nId, name: formData?.name }],
          id: id
      }});
    }
    
    onClose && onClose({...formData, value: { id: nId, name: formData?.name }});
  }, []);

  const fields: any[] = [
    {
      keyName: 'name',
      columns: 1,
      Component: TextField,
      languageKey: 'Name',
      componentProps: {
        autoComplete: 'off',
        fullWidth: true
      },
      validate: {
        required: validators.required
      },
      section: 0,
      tooltipShow: false
    },
    {
      keyName: 'isActive',
      columns: 1,
      Component: Switch,
      languageKey: 'Active',
      componentProps: {},
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
      title={<SpanLang keyLang={`Add Pain Point`} />}
      isOpen={isOpen}
      size="md"
      fullScreen={false}
      onClose={onClose}
      footer={Footer}
      anchor={'right'}
    >
      <form>
        <Box sx={{ p: 2, width: isMobile ? '100vw' : '500px' }}>
          <Grid container spacing={2} alignItems="center">
            {MainFields}
          </Grid>
        </Box>
      </form>
    </MiModal>
  );
};

export default WritePage;
