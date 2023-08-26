import React, { useEffect, useMemo } from 'react';

//third-party
import { Box, Button, Grid, InputLabel, Select, Stack, TextField, Typography, useTheme } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Add, AddOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

//project base
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import LoadingButton from '@base/components/@extended/LoadingButton';
import WriteField from '@base/containers/WriteField';
import validators from '@base/utils/validation/fieldValidator';
import * as commonComponents from '@base/config/write-field/components';
import DataSourceSelect from '@base/containers/DataSourceSelect';
import { nanoid } from '@base/utils/helpers';

//menu
import * as keyNames from '@settings/preferences/config/sales/keyNames';
import EmailInput from '@settings/preferences/components/EmailInput';

//local
import Products from '../View/Products';
import Members from '../View/Members';
import useSalesTeamCreate from '@settings/preferences/hooks/sales/useSalesTeamCreate';
import { getParams } from './payload';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentItems: any;
  onRefresh: (newItems: any) => void;
  onBack?: () => void;
}

const WritePage = (props: Props) => {
  const { isOpen, onClose, onBack } = props;
  const theme = useTheme();
  const { t } = useTranslation();

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
      [keyNames.KEY_SALES_TEAM_NAME]: '',
      [keyNames.KEY_SALES_TEAM_LEADER]: null,
      [keyNames.KEY_SALES_TEAM_DESCRIPTION]: '',
      [keyNames.KEY_SALES_TEAM_EMAIL]: '',
      [keyNames.KEY_SALES_TEAM_ASSIGNMENT_RULE]: null,
      [keyNames.KEY_SALES_TEAM_PRODUCTS]: [
        {
          [keyNames.KEY_SALES_TEAM_PRODUCTS_PRODUCT]: null,
          [keyNames.KEY_SALES_TEAM_PRODUCTS_PROCESS]: null
        }
      ],
      [keyNames.KEY_SALES_TEAM_MEMBERS]: [
        {
          [keyNames.KEY_SALES_TEAM_MEMBER_USER]: null,
          [keyNames.KEY_SALES_TEAM_MEMBER_ROLE]: null,
          [keyNames.KEY_SALES_TEAM_MEMBER_ACTIVE]: true
        }
      ]
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  //save settings
  const mCreate = useSalesTeamCreate();

  //reset after success
  useEffect(() => {
    if (mCreate.isSuccess) {
      reset();
      onClose && onClose();
      onBack && onBack();
    }
  }, [mCreate.isSuccess]);

  //render field
  const fields = useMemo(() => {
    return [
      {
        keyName: keyNames.KEY_SALES_TEAM_NAME,
        columns: 1,
        Component: TextField,
        languageKey: 'Sales Team Name',
        componentProps: {
          autoComplete: 'off',
          fullWidth: true
        },
        validate: {
          required: validators.required
        }
      },
      {
        keyName: keyNames.KEY_SALES_TEAM_LEADER,
        columns: 1,
        Component: commonComponents.AssignToInput,
        languageKey: 'Team Leader',
        componentProps: {
          single: true
        },
        validate: {
          required: validators.required
        }
      },
      {
        keyName: keyNames.KEY_SALES_TEAM_DESCRIPTION,
        columns: 1,
        Component: TextField,
        languageKey: 'Description',
        componentProps: {
          fullWidth: true,
          multiline: true,
          rows: 4
        }
      },
      {
        keyName: keyNames.KEY_SALES_TEAM_EMAIL,
        columns: 2,
        Component: EmailInput,
        languageKey: 'Email Alias',
        componentProps: {
          endText: 'vora.net'
        }
      },
      {
        keyName: keyNames.KEY_SALES_TEAM_ASSIGNMENT_RULE,
        columns: 1,
        Component: DataSourceSelect,
        languageKey: 'Assignment Rule',
        componentProps: {
          single: true,
          sourceKey: 'AR_MODULE_OPPORTUNITY',
          sourceType: 'assignment_rule',
          keyOptionValue: 'id',
          keyOptionLabel: 'name'
        }
      }
    ];
  }, []);

  //submit form
  const onSubmit = (formData: any) => {
    //console.log('formData', formData);
    const params = getParams(formData);
    mCreate.mutate({ team: params });
  };

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //validate products
  const productValidate = (products: any) => {
    //console.log('productValidate', products);
    let isValid = false;
    products?.map((_ele: any) => {
      if (_ele[keyNames.KEY_SALES_TEAM_PRODUCTS_PRODUCT]) {
        isValid = true;
      }
    });
    return isValid;
  };

  //validate member
  const memberValidate = (members: any) => {
    //console.log('memberValidate', members);
    let isValid = false;
    members?.map((_ele: any) => {
      if (_ele[keyNames.KEY_SALES_TEAM_MEMBER_USER]) {
        isValid = true;
      }
    });
    return isValid;
  };

  //render footer
  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button variant="outlined" color="secondary" onClick={onClose}>
              <SpanLang keyLang="ncrm_common_btn_cancel" textOnly />
            </Button>
            <LoadingButton
              variant="contained"
              loading={mCreate.isLoading}
              onClick={() => {
                handleSubmit((data) => onSubmit(data), onError)();
              }}
              disabled={mCreate.isLoading || !isValid}
            >
              <SpanLang keyLang={`ncrm_common_btn_save`} textOnly />
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [isValid, mCreate.isLoading]);

  //console.log('form values', watch()); //get form values when inputing

  return (
    <MiModal
      title={<SpanLang keyLang={`ncrm_setting_lead_create_sales_team`} />}
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
            {fields?.map((field: any, index: number) => {
              return <WriteField key={field.keyName} item={field} control={control} errors={errors} />;
            })}
            <Grid item xs={12}>
              <Stack spacing={0.5}>
                <Stack spacing={1} direction="row" alignItems="center">
                  <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
                    <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={`Products`} />
                  </InputLabel>
                  <Typography color="error">*</Typography>
                </Stack>
                <Controller
                  name={keyNames.KEY_SALES_TEAM_PRODUCTS}
                  control={control}
                  rules={{
                    validate: productValidate
                  }}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <React.Suspense fallback={<></>}>
                        <Products value={value} onChange={onChange} isWrite />
                      </React.Suspense>
                    );
                  }}
                  defaultValue={[]}
                />
                <Stack direction="row">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ lineHeight: '1.6', fontSize: '0.725rem' }}
                    startIcon={<AddOutlined />}
                    onClick={() => {
                      const newProducts = _.cloneDeep(getValues(keyNames.KEY_SALES_TEAM_PRODUCTS) || []); //products ?? []
                      newProducts.push({
                        [keyNames.KEY_SALES_TEAM_PRODUCTS_PRODUCT]: null,
                        [keyNames.KEY_SALES_TEAM_PRODUCTS_PROCESS]: null
                      });
                      setValue(keyNames.KEY_SALES_TEAM_PRODUCTS, newProducts);
                    }}
                  >
                    {t('Add another line')}
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={0.5}>
                <Stack spacing={1} direction="row" alignItems="center">
                  <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
                    <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={`Team Members`} />
                  </InputLabel>
                  <Typography color="error">*</Typography>
                </Stack>
                <Controller
                  name={keyNames.KEY_SALES_TEAM_MEMBERS}
                  control={control}
                  rules={{
                    validate: memberValidate
                  }}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <React.Suspense fallback={<></>}>
                        <Members value={value} onChange={onChange} isWrite />
                      </React.Suspense>
                    );
                  }}
                  defaultValue={[]}
                />
                <Stack direction="row">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ lineHeight: '1.6', fontSize: '0.725rem' }}
                    startIcon={<AddOutlined />}
                    onClick={() => {
                      const newMembers = _.cloneDeep(getValues(keyNames.KEY_SALES_TEAM_MEMBERS) || []); //members ?? [];
                      newMembers.push({
                        [keyNames.KEY_SALES_TEAM_MEMBER_USER]: null,
                        [keyNames.KEY_SALES_TEAM_MEMBER_ROLE]: null,
                        [keyNames.KEY_SALES_TEAM_MEMBER_ACTIVE]: true
                      });
                      setValue(keyNames.KEY_SALES_TEAM_MEMBERS, newMembers);
                    }}
                  >
                    {t('Add another line')}
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </form>
    </MiModal>
  );
};

export default WritePage;
