import React, { Suspense, useEffect, useMemo, useState } from 'react';

import { Box, Step, StepLabel, Stepper, SxProps, useMediaQuery, useTheme } from '@mui/material';
import validators from '@base/utils/validation/fieldValidator';
//third-party
import { Controller, useForm } from 'react-hook-form';

import { MENU_PRODUCT_ITEM } from '@base/config/menus';
import { useWriteForm } from '@base/hooks/forms/useWriteForm';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';

import { Product } from '@product/product/types/product';
import { useItemMutation } from '@product/item/hooks/useItemMutation';
import * as keyNames from '@product/item/config/keyNames';
import WriteFields from '../WriteFields';
import { finalizeParams, generateProductItems } from './payload';
import WriteFieldsStep2 from '../WriteFieldsStep2';
import { ProductItem } from '@product/item/types/item';
import { KEY_PRODUCT_ATTRIBUTE, KEY_PRODUCT_BASE_UNIT, KEY_PRODUCT_DESCRIPTION, KEY_PRODUCT_ITEMS } from '@product/product/config/keyNames';
import { BaseUnit, UnitValue } from '@product/unit/types/unit';
import { Attribute, AttributeValue } from '@product/attribute/types/attribute';
import {
  PRODUCT_ITEM_TYPE_OPTIONS,
  PRODUCT_ITEM_TYPE_ENUM_PREPAID,
  PRODUCT_ITEM_TYPE_ENUM_COMPOSITE,
  PRODUCT_ITEM_TYPE_ENUM_GENERAL,
  PRODUCT_ITEM_INVENTORY_TYPE_OPTIONS,
  PRODUCT_TYPE_PURCHASE
} from '@product/main/config/constants';
import { Currency } from '@base/types/common';
import { useRecoilValue } from 'recoil';
import { defaultCurrencySelector } from '@base/store/selectors/app';
import WriteFieldsStep2Mobile from '../WriteFieldsStep2Mobile';
import useDevice from '@base/hooks/useDevice';
import WriteStepper from '@base/components/@hanbiro/WriteStepper';
import { useUpdateItemImages } from '@product/item/hooks/useUpdateItemImages';
import { useProductSKUSetting } from '@settings/preferences/hooks/product/useProductSKUSetting';
import { useProductGeneralSetting } from '@settings/preferences/hooks/product/useProductGeneralSetting';

interface WriteFormProps {
  sx?: SxProps;
  onChange?: (params: any) => void;
  onValid?: (isValid: boolean) => void;
  isSubmit?: boolean;
  onSaving?: (flag: boolean) => void;
  onSuccess?: () => void;
  step: number;
  prodData?: Product;
  withProd?: boolean;
  fromProd?: boolean;
}

const steps = ['ncrm_product_form_step_general', 'ncrm_product_form_step_items'];

const WriteForm = (props: WriteFormProps) => {
  const { sx, onChange, onValid, isSubmit = false, onSaving, onSuccess, step = 0, prodData, withProd = false, fromProd = false } = props;

  const { isMobile } = useDevice();
  const menuApi = MENU_PRODUCT_ITEM;
  const { defaultValues, fields, loading, getParams } = useWriteForm({ menu: menuApi });

  //======================================Genaral Setting ===============================================
  const { data: SKUGeneratorData } = useProductSKUSetting();
  //=================================================================================================
  // state
  const [activeStep, setActiveStep] = useState<number>(step);

  const defaultCurrency: Currency = useRecoilValue(defaultCurrencySelector);

  //get default setting
  const { data: itemTypeData } = useProductGeneralSetting({
    key: 'default_item_type',
    menu: 'product'
  });
  const { data: inventoryTypeData } = useProductGeneralSetting({
    key: 'default_inventory_type',
    menu: 'product'
  });

  // react-hook
  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    control,
    trigger,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      ...defaultValues,
      [keyNames.KEY_ITEM_PRODUCT]: prodData,
      // [keyNames.KEY_ITEM_TYPE]: PRODUCT_ITEM_TYPE_OPTIONS[0],
      [keyNames.KEY_ITEM_UNIT]: prodData?.[KEY_PRODUCT_BASE_UNIT] ?? null,
      [KEY_PRODUCT_ATTRIBUTE]: prodData?.[KEY_PRODUCT_ATTRIBUTE] ?? null,
      [KEY_PRODUCT_DESCRIPTION]: prodData?.[KEY_PRODUCT_DESCRIPTION] ?? '',
      ['withProd']: withProd || false,
      ['fromProd']: fromProd || false
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  // create mutation
  const { listQueryKey } = useListQueryKeys(MENU_PRODUCT_ITEM);
  const [images, setImages] = useState<File[]>([]);
  const [isDownloadImage, setIsDownLoad] = useState(false);
  const { mCreate } = useItemMutation(listQueryKey);

  //This hook will save image type to storage and send back image key from server
  /**
   * result: {id: string, name: string, orgName: string, type:string}[]
   */
  const { isFinished, isSaving, result } = useUpdateItemImages(images, isDownloadImage);

  const unit: BaseUnit = watch(keyNames.KEY_ITEM_UNIT);
  const attributes: Attribute[] = watch(KEY_PRODUCT_ATTRIBUTE); // attribute:{id, name, values}
  const itemType = watch(keyNames.KEY_ITEM_TYPE)?.value || '';
  const inventoryType = watch(keyNames.KEY_ITEM_INVENTORY_TYPE)?.value || '';
  const prod = watch(keyNames.KEY_ITEM_PRODUCT);

  // onChange prod
  useEffect(() => {
    if (!isSubmit) {
      setValue(keyNames.KEY_ITEM_UNIT, prod?.[KEY_PRODUCT_BASE_UNIT]);
      setValue(KEY_PRODUCT_ATTRIBUTE, prod?.[KEY_PRODUCT_ATTRIBUTE] ?? null);
      setValue(keyNames.KEY_ITEM_TYPE, PRODUCT_ITEM_TYPE_OPTIONS[0]);
    }
  }, [prod]);

  useEffect(() => {
    if (itemTypeData) {
      setValue(keyNames.KEY_ITEM_TYPE, (itemTypeData?.value && prodData?.type == PRODUCT_TYPE_PURCHASE) 
      ? itemTypeData?.value : PRODUCT_ITEM_TYPE_OPTIONS[0]);
    }
  }, [itemTypeData, prod]);

  useEffect(() => {
    if(inventoryTypeData){
      setValue(keyNames.KEY_ITEM_INVENTORY_TYPE, inventoryTypeData?.value ? inventoryTypeData?.value : PRODUCT_ITEM_INVENTORY_TYPE_OPTIONS[0]);
    }
  },[inventoryTypeData])

  // onChange itemType
  useEffect(() => {
    setValue(KEY_PRODUCT_ATTRIBUTE, itemType === PRODUCT_ITEM_TYPE_ENUM_GENERAL ? prod?.[KEY_PRODUCT_ATTRIBUTE] ?? null : null);
  }, [itemType]);

  // change step
  useEffect(() => {
    if (step != activeStep) {
      setActiveStep(step);
    }
    if (step === 1) {
      if (itemType !== PRODUCT_ITEM_TYPE_ENUM_PREPAID) {
        nextStep2();
      }
    }
  }, [step]);

  useEffect(() => {
    if (activeStep === 0 && watch(KEY_PRODUCT_ITEMS)) {
      //Trigger Validate form at current step
      trigger();
    }
  }, [activeStep]);

  useEffect(() => {
    if (isFinished) {
      const formData = watch();
      let newParams = finalizeParams(formData);
      let imageIndex = 0;
      newParams = newParams.map((item: any, index: number) => {
        let newImages = null;
        if (item.images) {
          newImages = [result[imageIndex++]];
        }
        return {
          ...item,
          images: newImages
        };
      });
      //If items are created from product write form, we will use product api to create instead of using item api
      if (withProd) {
        onSaving && onSaving(true);
        onChange && onChange(newParams);
      } else {
        onSaving && onSaving(true);
        mCreate.mutate(
          {
            items: newParams
          },
          {
            onMutate() {
              onSaving && onSaving(true);
            },
            onSuccess(data: any, variables: any, context: any) {
              onSaving && onSaving(false);
              onSuccess && onSuccess();
            },
            onError(error: any, variables: any, context: any) {
              onSaving && onSaving(false);
            }
          }
        );
      }
    }
  }, [isFinished]);

  const nextStep2 = async () => {
    // TODO: merge unit value and unit

    let skuValue: any = {};
    if (SKUGeneratorData) {
      skuValue = JSON.parse(SKUGeneratorData.value);
    }
    const unitValues = unit?.unitValues?.map((v: UnitValue) => ({ ...v, unit: { id: unit.id, name: unit.name } }));
    const items = generateProductItems(
      unitValues || [],
      attributes || [],
      prod,
      itemType,
      inventoryType,
      defaultCurrency?.code ?? '',
      skuValue
    );
    setValue(KEY_PRODUCT_ITEMS, items);
  };

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
    const newParams = finalizeParams(formData);
    if (itemType === PRODUCT_ITEM_TYPE_ENUM_GENERAL) {
      let newImages: any = [];
      newParams.forEach((item) => {
        if (item.images) {
          let itemImage = item.images[0];
          newImages.push(itemImage);
        }
      });
      if (newImages.length > 0) {
        setImages(newImages);
        setIsDownLoad(true);
        return;
      }
    }
    //If items are created from product write form, we will use product api to create instead of using item api
    if (withProd) {
      onSaving && onSaving(true);
      onChange && onChange(newParams);
    } else {
      onSaving && onSaving(true);
      mCreate.mutate(
        {
          items: newParams
        },
        {
          onMutate() {
            onSaving && onSaving(true);
          },
          onSuccess(data: any, variables: any, context: any) {
            onSaving && onSaving(false);
            onSuccess && onSuccess();
          },
          onError(error: any, variables: any, context: any) {
            onSaving && onSaving(false);
          }
        }
      );
    }
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
  // console.log('[ITEM].form values', watch()); //get form values when inputing
  // console.log('activeStepd form errors', errors); //get form values when inputing
  // console.log('activeStepd form isValid', isValid); //get form values when inputing
  // console.log('activeStepd', activeStep); //get form values when inputing
  //console.log('form fields', fields); //All fields from pagelayout
  // console.log('Prod Data items', watch(KEY_PRODUCT_ITEMS));
  // console.log('Form Item Submit', watch());
  //======================== End Debug ========================//

  const GeneralStep = useMemo(() => {
    return <WriteFields watch={watch} setValue={setValue} control={control} errors={errors} fields={fields} menuApi={menuApi} />;
  }, [fields]);

  return (
    <Box sx={sx}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        {(loading || isSaving) && <LoadingCircular loading={loading || isSaving} />}
        {!withProd && <WriteStepper activeStep={activeStep} steps={steps} />}

        {activeStep >= 0 && (
          <Suspense fallback={<LoadingCircular loading={loading} />}>
            <Box
              sx={{
                display: activeStep == 0 ? 'block' : 'none'
              }}
            >
              {GeneralStep}
            </Box>
          </Suspense>
        )}
        {activeStep >= 1 && (
          <Suspense fallback={<LoadingCircular loading={loading} />}>
            <Controller
              name={KEY_PRODUCT_ITEMS}
              control={control}
              rules={{
                validate: {
                  required: validators.required,
                  productItems: (values: any) => {
                    return validators.productItem(
                      [
                        keyNames.KEY_ITEM_NAME,
                        keyNames.KEY_ITEM_BASE_PRICE,
                        keyNames.KEY_ITEM_COST_PRICE,
                        keyNames.KEY_ITEM_PURCHASE_PRICE
                      ],
                      values
                    );
                  }
                }
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <>
                    {isMobile ? (
                      <WriteFieldsStep2Mobile
                        prodData={prod}
                        itemType={itemType}
                        inventoryType={inventoryType}
                        value={value}
                        onChange={(value: ProductItem[]) => onChange(value)}
                      />
                    ) : (
                      <WriteFieldsStep2
                        prodData={prod}
                        itemType={itemType}
                        inventoryType={inventoryType}
                        value={value}
                        onChange={(value: ProductItem[]) => onChange(value)}
                      />
                    )}
                  </>
                );
              }}
            />
          </Suspense>
        )}
      </form>
    </Box>
  );
};

export default WriteForm;
