import React, { Suspense, useEffect, useMemo, useState } from 'react';

//third-party
import { useForm } from 'react-hook-form';

//project
import WriteFields from '@settings/digital/cta/containers/WriteFields';
import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { ButtonOption } from '@base/types/extended';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import useAWSS3Mutation from '@base/hooks/aws/useAWSS3Mutation';
import { useWriteForm } from '@base/hooks/forms/useWriteForm';

//menu
import * as keyNames from '@settings/digital/cta/config/keyNames';
import * as constants from '@settings/digital/cta/config/constants';

import { Customer } from '@customer/types/interface';

//material
import { Button, Grid, Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

//local
import { finalizeParams } from './payload';
import { useCtaMutations } from '../../hooks/useCtaMutations';
import { isString } from 'lodash';
import { convertImageToBase64, convertUrlToBase64, convertUrlToBlob } from '@base/utils/helpers';
import { t } from 'i18next';

interface WriteModalProps {
  isOpen: boolean;
  fullScreen?: boolean;
  showCategory?: boolean;
  showCanvas?: boolean;
  menuApi: string;
  type?: any; //customer type
  account?: Customer;
  onReload?: () => void;
  onGoView?: (id: string, category: string) => void;
  onClose: () => void;
  onSuccess?: (val: any) => void;
}

const WriteModal = (props: WriteModalProps) => {
  const { isOpen, fullScreen, showCategory, showCanvas, menuApi, type, account, onReload, onClose, onSuccess, onGoView } = props;
  const { defaultValues, fields, loading, getParams } = useWriteForm({ menu: props.menuApi });

  //state
  const [formParams, setFormParams] = useState<any>({});
  const queryClient = useQueryClient();

  // more default values
  const customDefaultValues = {
    ...defaultValues,
    type: constants.SETTING_CTA_TYPES[0],
    imgUrl: null,
    imgSize: {
      width: 300,
      height: 300
    },
    imgAlt: '',
    name: '',
    language: 'en',
    linkType: constants.SETTING_CTA_LINK_TYPES[0],
    externalSiteName: '',
    linkUrl: {
      link: '',
      openNewWindow: false
    },
    contentType: constants.SETTING_CTA_CONTENT_TYPES[0],
    description: '',
    txtValue: 'BUTTON',
    txtBgColor: '#1890ff',
    txtColor: '#ffffff',
    txtFontSize: 11,
    txtFontWeight: constants.SETTING_CTA_TEXT_FONT_WEIGHT_OPTIONS[0],
    txtRounded: 20
  };

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
    defaultValues: customDefaultValues,
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  //upload image
  const { mUpload } = useAWSS3Mutation();

  //create mutation
  const { mCreate } = useCtaMutations();

  // check success
  useEffect(() => {
    if (mCreate.isSuccess) {
      reset();
      onClose();
      onReload && onReload();
    }
  }, [mCreate.isSuccess]);

  // upload success
  // useEffect(() => {
  //   if (mUpload.isSuccess) {
  //     const nFormParams = { ...formParams };
  //     nFormParams.cta.imgUrl = mUpload?.data?.key ?? '';
  //     mCreate.mutate(nFormParams);
  //   }
  // }, [mUpload.isSuccess]);

  // submit form
  const onSubmit = (formData: any) => {
    let configParams = getParams(formData);

    if (formData?.type?.value === constants.SETTING_CTA_TYPE_IMAGE && formData?.imgUrl !== '') {
      if (formData.imgUrl && !isString(formData.imgUrl.image)) {
        // for BLOCK STORAGE
        convertImageToBase64(formData.imgUrl.image).then((data: any) => {
          configParams.imgUrl = data;
          let defaultParams = finalizeParams(configParams);
          console.log('defaultParams1', defaultParams);
          mCreate.mutate(defaultParams);
        });
      } else {
        // for S3
        // convertUrlToBlob(formData.imgUrl.image).then(function (blob: any) {
        //   // here the image is a blob
        //   var blob1 = new Blob([blob], { type: 'image/*' });
        //   const uploadFile = new File([blob1], formData.imgUrl.image);
        //   mUpload.mutate(uploadFile);
        // });
        // for BLOCK STORAGE
        convertUrlToBase64(formData.imgUrl.image, function (data: any) {
          configParams.imgUrl = data;
          let defaultParams = finalizeParams(configParams);
          console.log('defaultParams2', defaultParams);
          mCreate.mutate(defaultParams);
        });
      }
    } else {
      // for save to api
      let defaultParams = finalizeParams(configParams);
      mCreate.mutate(defaultParams);
    }
  };

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //close
  const handleClose = () => {
    onClose();
  };

  //buttons
  const Footer = useMemo(() => {
    const options: ButtonOption[] = [
      {
        isMain: true,
        label: t('ncrm_generalsetting_cta_btn_finish_stage_enable'),
        color: 'primary',
        onClick: () => {
          handleSubmit((data) => onSubmit({ ...data, stage: constants.SETTING_CTA_STAGE_ENABLE }), onError)();
        },
        disabled: mCreate.isLoading || !isValid,
        isLoading: mCreate.isLoading || mUpload.isLoading
      },
      {
        isMain: false,
        label: t('ncrm_generalsetting_cta_btn_finish_stage_disable'),
        color: 'secondary',
        onClick: () => {
          handleSubmit((data) => onSubmit({ ...data, stage: constants.SETTING_CTA_STAGE_DISABLE }), onError)();
        },
        disabled: mCreate.isLoading || !isValid,
        isLoading: mCreate.isLoading || mUpload.isLoading
      }
    ];

    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" variant="outlined" color="secondary" onClick={handleClose}>
              <SpanLang keyLang={'ncrm_common_btn_cancel'} />
            </Button>
            <ButtonSplit buttons={options} />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [mCreate.isLoading, isValid]);

  //======================== Debug ========================//
  // console.log('form values', watch()); //get form values when inputing
  //console.log('form errors', errors); //get form values when inputing
  //console.log('form isValid', isValid); //get form values when inputing
  //console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  return (
    <MiModal
      title={<SpanLang keyLang={'ncrm_generalsetting_create_cta'} />}
      isOpen={isOpen}
      size="md"
      fullScreen={false}
      onClose={handleClose}
      footer={Footer}
    >
      {isOpen && (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {loading && <LoadingCircular loading={loading} />}
          <Suspense fallback={<LoadingCircular loading={loading} />}>
            <WriteFields watch={watch} control={control} errors={errors} setValue={setValue} fields={fields} menuApi={menuApi} />
          </Suspense>
        </form>
      )}
    </MiModal>
  );
};

export default WriteModal;
