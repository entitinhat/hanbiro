import React, { Suspense, useEffect, useMemo, useState } from 'react';

//material
import { Button, Divider, Grid, Stack, Step, StepLabel, Stepper, useTheme } from '@mui/material';

//project
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { ButtonOption } from '@base/types/extended';
import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';
import ProductWriteForm from '@product/product/containers/WriteForm';
import ItemWriteForm from '@product/item/containers/WriteForm';
import { KEY_PRODUCT_ATTRIBUTE, KEY_PRODUCT_USE_ATTR } from '@product/product/config/keyNames';
import { generateUUID } from '@base/utils/helpers';
import { Item } from '@product/item/types/item';
import { Product } from '@product/product/types/product';
import WriteStepper from '@base/components/@hanbiro/WriteStepper';
import { queryClient } from '@base/config/queryClient';
import { queryKeys } from '@product/product/config/queryKeys';

interface WritePageProps {
  isOpen: boolean;
  fullScreen?: boolean;
  showCategory?: boolean;
  showCanvas?: boolean;
  onReload?: () => void;
  onGoView?: (id: string) => void;
  onClose: () => void;
  onSuccess?: (val: any) => void;
}

const steps = ['ncrm_product_form_step_product', 'ncrm_product_form_step_item', 'ncrm_product_form_step_items'];

const WritePage = (props: WritePageProps) => {
  const { isOpen, fullScreen, showCategory, showCanvas, onReload, onClose, onSuccess, onGoView } = props;

  const theme = useTheme();

  // state
  const [activeStep, setActiveStep] = useState<number>(0);
  const [product, setProduct] = useState<Product>();
  const [productIsValid, setProductIsValid] = useState<boolean>(true);
  const [productSubmit, setProductSubmit] = useState<boolean>(false);
  const [itemsSubmit, setItemsSubmit] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [itemStep, setItemStep] = useState<number>(0);
  const [itemIsValid, setItemIsValid] = useState<boolean>(true);
  const [itemData, setItemData] = useState<Item>();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep >= 1 && itemStep == 0) {
      setItemStep(itemStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    if (activeStep >= 1 && itemStep >= 1) {
      setItemStep(itemStep - 1);
    }
  };

  const handleNextItem = () => {
    setItemStep(itemStep + 1);
  };

  const handleBackItem = () => {
    setItemStep(itemStep - 1);
  };

  // close
  const handleClose = () => {
    onClose();
    queryClient.refetchQueries({ queryKey: [queryKeys.listProduct] });
  };

  const handleSave = () => {
    setItemsSubmit(true);
  };

  // buttons
  const Footer = useMemo(() => {
    // console.log('...isSaving...', itemIsValid);
    const options: ButtonOption[] = [
      {
        isMain: true,
        label: activeStep === 0 ? 'ncrm_common_btn_next' : 'ncrm_common_btn_save',
        color: 'primary',
        onClick: activeStep === 0 ? handleNext : handleSave,
        disabled: isSaving || !productIsValid,
        isLoading: isSaving
      },
      {
        isMain: false,
        label: 'ncrm_product_form_text_save_create_later',
        color: 'secondary',
        onClick: () => {
          setItemData(undefined);
          setProductSubmit(true);
        },
        disabled: isSaving || !productIsValid,
        isLoading: isSaving
      }
    ];

    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          {/* Back product step */}
          {activeStep >= 1 && itemStep == 0 && (
            <Button size="small" color="secondary" onClick={handleBack}>
              <SpanLang keyLang={'ncrm_common_btn_back'} textOnly />
            </Button>
          )}
          {/* Back item step */}
          {activeStep >= 1 && itemStep >= 1 && (
            <Button size="small" color="secondary" onClick={handleBack}>
              <SpanLang keyLang={'ncrm_common_btn_back'} textOnly />
            </Button>
          )}
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" variant="outlined" color="secondary" onClick={handleClose}>
              <SpanLang keyLang={'ncrm_common_btn_cancel'} textOnly />
            </Button>
            {/* Group product step */}
            {activeStep == 0 && <ButtonSplit buttons={options} />}
            {/* Next item step */}
            {activeStep >= 1 && itemStep == 0 && (
              <Button size="small" variant="contained" onClick={handleNext}>
                <SpanLang keyLang={'ncrm_common_btn_next'} textOnly />
              </Button>
            )}
            {/* Save item step */}
            {activeStep >= 1 && itemStep >= 1 && (
              <Button size="small" disabled={!itemIsValid || !productIsValid} variant="contained" onClick={handleSave}>
                <SpanLang keyLang={'ncrm_common_btn_save'} textOnly />
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
    );
  }, [activeStep, productIsValid, isSaving, itemStep, itemIsValid]);

  //======================== Debug ========================//
  // console.log('form values', watch()); //get form values when inputing
  //console.log('form errors', errors); //get form values when inputing
  //console.log('form isValid', isValid); //get form values when inputing
  //console.log('form fields', fields); //All fields from pagelayout
  // console.log('product Create', itemIsValid);
  // console.log('item productSubmit', productSubmit);
  //======================== End Debug ========================//

  return (
    <MiModal
      title={<SpanLang keyLang={`ncrm_product_create_product`} />}
      isOpen={isOpen}
      size={itemStep >= 1 ? 'lg' : 'md'}
      fullScreen={false}
      onClose={handleClose}
      footer={Footer}
    >
      <WriteStepper activeStep={activeStep} steps={steps} />

      {activeStep >= 0 && (
        <Suspense fallback={<></>}>
          <ProductWriteForm
            sx={{
              display: activeStep == 0 ? 'block' : 'none'
            }}
            onChange={(formData: any) => {
              // console.log('change item Product---------------------------------------');
              setProduct(formData);
            }}
            onValid={(isValid: boolean) => setProductIsValid(isValid)}
            isSubmit={productSubmit}
            onSaving={setIsSaving}
            onSuccess={handleClose}
            withItem={itemData}
          />
        </Suspense>
      )}
      {activeStep >= 1 && (
        <Suspense fallback={<></>}>
          <Divider />
          <ItemWriteForm
            onSaving={(isFinished: boolean) => {
              if (isFinished) {
                setProductSubmit(true);
              }
            }}
            isSubmit={itemsSubmit}
            step={itemStep}
            prodData={{
              ...product,
              [KEY_PRODUCT_ATTRIBUTE]: product?.[KEY_PRODUCT_ATTRIBUTE]?.[KEY_PRODUCT_ATTRIBUTE] || [],
              [KEY_PRODUCT_USE_ATTR]: product?.[KEY_PRODUCT_ATTRIBUTE]?.[KEY_PRODUCT_USE_ATTR] || false
              // ['id']: generateUUID()
            }}
            withProd={true}
            onChange={(formData: Item) => {
              setItemData(formData);
            }}
            onValid={(isValid: boolean) => setItemIsValid(isValid)}
            // TODO: onChange Attribute in item write form
          />
        </Suspense>
      )}
    </MiModal>
  );
};

export default WritePage;
