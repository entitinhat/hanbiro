import React, { Suspense, useEffect } from 'react';

import { Box, SxProps } from '@mui/material';

//third-party
import { useForm } from 'react-hook-form';

import { MENU_PRODUCT_PRODUCT } from '@base/config/menus';
import { useWriteForm } from '@base/hooks/forms/useWriteForm';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import * as keyNames from '@product/product/config/keyNames';
import WriteFields from '../WriteFields';
import { finalizeParams } from './payload';
import { useProductMutation } from '@product/product/hooks/useProductMutation';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import { Item } from '@product/item/types/item';
import { useProductGeneralSetting } from '@settings/preferences/hooks/product/useProductGeneralSetting';

interface WriteFormProps {
  sx?: SxProps;
  onChange?: (params: any) => void;
  onValid?: (isValid: boolean) => void;
  isSubmit?: boolean;
  onSaving?: (flag: boolean) => void;
  onSuccess?: () => void;
  withItem?: Item;
}

const WriteForm = (props: WriteFormProps) => {
  const { sx, onChange, onValid, isSubmit = false, onSaving, onSuccess, withItem } = props;

  const menuApi = MENU_PRODUCT_PRODUCT;
  const { defaultValues, fields, loading, getParams } = useWriteForm({ menu: menuApi });

  // react-hook
  const {
    handleSubmit,
    trigger,
    watch,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      ...defaultValues,
      [keyNames.KEY_PRODUCT_ACTIVE]: true
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  // console.log('defaultValues Create Product', defaultValues);
  // create mutation
  const { listQueryKey } = useListQueryKeys(MENU_PRODUCT_PRODUCT);
  const { mCreate } = useProductMutation(listQueryKey);

  //==============================================Get format product from settings==========================================
  const keyName = 'default_supply_method';
  //get data
  const params = {
    key: keyName,
    menu: 'product'
  };
  const { data, isLoading } = useProductGeneralSetting(params);
  const { data: canBeSoldSettingData } = useProductGeneralSetting({
    key: 'can_be_sold',
    menu: 'product'
  });
  useEffect(() => {
    if (data) {
      setValue('type', data.value);
    }
  }, [data]);

  useEffect(() => {
    if(canBeSoldSettingData){
      setValue('canBeSold', canBeSoldSettingData?.value == 'true' ? true : false );
    }
  },[canBeSoldSettingData])
  //========================================================================================================================
  // items values
  useEffect(() => {
    if (withItem && !isSubmit) {
      const prodAttribute = watch('attributes');

      const itemAttribute = withItem.attributes;

      setValue('attributes', {
        ...prodAttribute,
        attributes: itemAttribute
      });
      trigger();
    }

    // setValue('items', withItem || null);
    // console.log('withItem -------------------------- TEST', withItem);
    // console.log('withItem -------------------------- TEST', watch());
  }, [JSON.stringify(withItem), isSubmit]);

  // on valid change
  useEffect(() => {
    onValid && onValid(isValid);
  }, [isValid]);

  // form values change
  watch((data: any) => {
    onChange && onChange(data);
  });

  // submit form
  const onSubmit = (formData: any) => {
    let configParams = getParams(formData);
    if (withItem) {
      configParams.items = withItem;
    }
    const newParams = finalizeParams(configParams);

    onSaving && onSaving(true);
    mCreate.mutate(
      { product: newParams },
      {
        onMutate() {
          console.log('...mCreate.onMutate...');
          onSaving && onSaving(true);
        },
        onSuccess(data: any, variables: any, context: any) {
          console.log('...mCreate.onSuccess...');
          onSaving && onSaving(false);
          onSuccess && onSuccess();
        },
        onError(error: any, variables: any, context: any) {
          onSaving && onSaving(false);
        }
      }
    );
  };

  // when submit error, call this
  const onError = (errors: any, e: any) => {};

  // listen event submit
  useEffect(() => {
    if (isSubmit) {
      handleSubmit((data) => onSubmit(data), onError)();
    }
  }, [isSubmit]);

  //======================== Debug ========================//
  console.log('form values', watch()); //get form values when inputing
  //console.log('form errors', errors); //get form values when inputing
  // console.log('form isValid', isValid); //get form values when inputing
  //console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//
  return (
    <Box sx={sx}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        {loading && <LoadingCircular loading={loading} />}
        <Suspense fallback={<LoadingCircular loading={loading} />}>
          <WriteFields watch={watch} control={control} errors={errors} fields={fields} menuApi={menuApi} />
        </Suspense>
      </form>
    </Box>
  );
};

export default WriteForm;
