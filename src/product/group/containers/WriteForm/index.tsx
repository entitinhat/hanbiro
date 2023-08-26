import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

// mui import
import LoadingButton from '@mui/lab/LoadingButton';
import { Save } from '@mui/icons-material';
import { Box, Button, Grid, InputLabel, Stack, TextField, Typography, useTheme } from '@mui/material';

// project import
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import validators from '@base/utils/validation/fieldValidator';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';

// menu import
import { useProductGroupMutation } from '@product/group/hooks/useProductGroupMutation';
import ProductGroupAutoComplete from '@product/group/containers/ProductGroupAutoComplete';
import { ProductGroup } from '@product/group/types/group';
import { queryKeys } from '@product/group/config/queryKeys';
import { useTranslation } from 'react-i18next';
import { queryClient } from '@base/config/queryClient';

interface WriteFormProps {
  fullScreen?: boolean;
  data?: ProductGroup; // for edit
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (params: any) => void;
  isRefetch?: boolean;
}

const WriteForm = (props: WriteFormProps) => {
  const { onClose, onSuccess, data, isOpen, fullScreen = false, isRefetch } = props;

  const theme = useTheme();
  const { t } = useTranslation();

  // hook form
  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    control,
    // trigger,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      name: '',
      parent: undefined, // --> category/folder
      description: ''
    } as any,
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  // init data for Edit
  useEffect(() => {
    if (data) {
      if (data?.name) {
        setValue('name', data?.name ?? '', { shouldValidate: true });
      }
      if (data?.parent) {
        setValue('parent', data?.parent, { shouldValidate: true });
      }
      if (data?.description) {
        setValue('description', data?.description ?? '');
      }
    } else {
      reset();
    }
  }, [data]);

  // mutation definition
  // const { listQueryKey } = useListQueryKeys('');
  const { mCreate, mUpdate } = useProductGroupMutation([queryKeys.listProductGroups]);

  // check create success
  useEffect(() => {
    if (mCreate.isSuccess) {
      onSuccess && onSuccess({ ...mCreate.variables.group, id: mCreate.data.id });
      queryClient.refetchQueries({ queryKey: [queryKeys.listProductGroups] });
      onClose && onClose();
    }
  }, [mCreate.isSuccess]);

  // check create success
  useEffect(() => {
    if (mUpdate.isSuccess) {
      onSuccess && onSuccess({ ...mUpdate.variables.group });
      queryClient.refetchQueries({ queryKey: [queryKeys.listProductGroups] });
      onClose && onClose();
    }
  }, [mUpdate.isSuccess]);

  // submit form
  const onSubmit = (formData: any) => {
    const newParams: any = {
      name: formData.name
    };
    if (formData.parent) {
      newParams.parent = {
        id: formData.parent.id,
        name: formData.parent.name
      };
    }
    if (data?.id) {
      newParams.id = data?.id;
      mUpdate.mutate({ group: newParams });
    } else {
      mCreate.mutate({ group: newParams });
    }
  };

  // when submit error, call this
  const onError = (errors: any, e: any) => {
    // console.log('error', errors, e);
  };

  const handleClose = () => {
    onClose();
  };

  // form fields
  const renderFields = () => {
    return (
      <Box sx={{ p: 2.5 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel sx={{ display: 'flex' }}>
                <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={`ncrm_common_product_group_name`} />
                <Box component="span" sx={{ ml: '5px', color: 'error.main' }}>
                  *
                </Box>
              </InputLabel>
              <Controller
                name={'name'}
                control={control}
                rules={{ required: 'name_is_required' }}
                render={({ field: { value, onChange } }: any) => {
                  return <TextField type="text" value={value} onChange={onChange} />;
                }}
              />
              {errors?.['name'] && (
                <Typography variant="h6" sx={{ color: 'error.main' }}>
                  {(errors?.name?.message as string) || ''}
                </Typography>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel sx={{ display: 'flex' }}>
                <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={`ncrm_common_product_parent_group`} />
              </InputLabel>
              <Controller
                name={'parent'}
                control={control}
                render={({ field: { value, onChange } }: any) => {
                  return <ProductGroupAutoComplete value={value} onChange={onChange} isRefetch={isRefetch} />;
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel sx={{ display: 'flex' }}>
                <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={`ncrm_common_description`} />
              </InputLabel>
              <Controller
                name={'description'}
                control={control}
                render={({ field: { value, onChange } }: any) => {
                  return <TextField multiline rows={3} value={value} onChange={onChange} />;
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  };

  // render footer
  const renderFooter = () => {
    return (
      <Grid container justifyContent="end" alignItems="center">
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              {t('ncrm_common_btn_cancel')}
            </Button>
            <LoadingButton
              disabled={!isValid}
              size="small"
              color="primary"
              onClick={() => {
                handleSubmit((data) => onSubmit(data), onError)();
              }}
              loading={mCreate.isLoading || mUpdate.isLoading}
              loadingPosition="start"
              startIcon={<></>}
              variant="contained"
            >
              {t('ncrm_common_btn_save')}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    );
  };

  //======================== Debug ========================//
  // console.log('[Group]form values', watch()); //get form values when inputing
  //// console.log('form values', getValues()); //get form values when inputing
  //// console.log('form errors', errors);
  //// console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  return (
    <MiModal
      title={<SpanLang keyLang={`ncrm_common_new_product_group`} />}
      isOpen={isOpen}
      size="sm"
      fullScreen={false}
      onClose={handleClose}
      footer={renderFooter()}
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} className="form">
        {renderFields()}
      </form>
    </MiModal>
  );
};

export default WriteForm;
