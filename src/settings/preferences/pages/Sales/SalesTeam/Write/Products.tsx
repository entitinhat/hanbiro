import { useEffect, useMemo } from 'react';

//third-party
import _ from 'lodash';
import { Box, Button, Grid, Stack, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

//project base
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import LoadingButton from '@base/components/@extended/LoadingButton';
import * as keyNames from '@settings/preferences/config/sales/keyNames';
import WriteField from '@base/containers/WriteField';
import validators from '@base/utils/validation/fieldValidator';
import LookUp from '@base/containers/LookUp';

//related menu
import { useGetModuleProcesses } from '@process/hooks/useModule';
import ProductAutoComplete from '@product/product/containers/ProductAutoComplete';
import { useSalesTeamProductCreate } from '@settings/preferences/hooks/sales/useSalesTeamProduct';

interface Props {
  teamId: string;
  isOpen: boolean;
  onClose: any;
  onAdd?: (newItem: any) => void;
}

const WritePage = (props: Props) => {
  const { teamId, isOpen, onClose, onAdd } = props;

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
      [keyNames.KEY_SALES_TEAM_PRODUCTS_PROCESS]: null
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  //hooks
  const mProductCreate: any = useSalesTeamProductCreate();

  //create success
  useEffect(() => {
    if (mProductCreate.isSuccess) {
      const newProduct = mProductCreate.variables.product;
      onAdd && onAdd(newProduct);
      reset();
      onClose();
    }
  }, [mProductCreate.isSuccess]);

  //submit form
  const onSubmit = (formData: any) => {
    const params = {
      id: teamId,
      product: {
        product: { id: formData.product.id, name: formData.product.name },
        process: { id: formData.process.id, name: formData.process.name }
      }
    };
    mProductCreate.mutate(params);
    //onAdd && onAdd(formData);
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
      keyName: keyNames.KEY_SALES_TEAM_PRODUCTS_PROCESS,
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
              disabled={!isValid || mProductCreate.isLoading}
              onClick={() => {
                handleSubmit((data) => onSubmit(data), onError)();
              }}
              loading={mProductCreate.isLoading}
            >
              <SpanLang keyLang={`ncrm_common_btn_save`} textOnly />
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [isValid, mProductCreate.isLoading]);

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
