import { useCallback, useMemo } from 'react';

import { Box, Button, Grid, InputLabel, Select, Stack, TextField, useTheme } from '@mui/material';

import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import LoadingButton from '@base/components/@extended/LoadingButton';
import { Controller, useForm } from 'react-hook-form';
import * as keyNames from '@settings/preferences/config/lead/keyNames';
import WriteField from '@base/containers/WriteField';
import validators from '@base/utils/validation/fieldValidator';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import WebsiteInput from '@base/components/@hanbiro/WebsiteInput';
import ProductAutoComplete from '@product/product/containers/ProductAutoComplete';
import LookUp from '@base/containers/LookUp';
import { useGetModuleProcesses } from '@process/hooks/useModule';

interface Props {
  isOpen: boolean;
  onClose: any;
  onAdd?: (newItem: any) => void;
}

const WritePage = (props: Props) => {
  const { isOpen, onClose, onAdd } = props;

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
    defaultValues: {
      [keyNames.KEY_SALES_TEAM_PRODUCTS_PRODUCT]: null,
      [keyNames.KEY_SALES_TEAM_PRODUCTS_OPPRTUNITY]: null
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  //submit form
  const onSubmit = (formData: any) => {
    onAdd && onAdd(formData);
  };

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  const fields: any[] = [
    {
      keyName: keyNames.KEY_SALES_TEAM_PRODUCTS_PRODUCT,
      columns: 1,
      Component: ProductAutoComplete,
      languageKey: 'Product',
      componentProps: {
        single: true
      },
      validate: {
        required: validators.required
      }
    },
    {
      keyName: keyNames.KEY_SALES_TEAM_PRODUCTS_OPPRTUNITY,
      columns: 1,
      Component: LookUp,
      componentProps: {
        single: true,
        fetchList: useGetModuleProcesses,
        fieldValue: 'id',
        fieldLabel: 'name',
        extraParams: { module: 'MODULE_TICKET' },
        isSearch: false
      },
      languageKey: 'Opportunity Process',
      validate: {
        required: validators.required
      }
    }
  ];

  //render fields
  const MainFields = useMemo(() => {
    return (
      <>
        {fields?.map((_item, _index) => {
          return <WriteField key={_item.keyName} item={_item} control={control} errors={errors} />;
        })}
      </>
    );
  }, [fields, errors, control]);

  //render footer
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
              variant="contained"
              disabled={!isValid}
              onClick={() => {
                handleSubmit((data) => onSubmit(data), onError)();
              }}
              //loading={false}
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
      title={<SpanLang keyLang={`Add Product`} />}
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
