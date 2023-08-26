import { useCallback, useEffect, useMemo, useState } from 'react';

//project
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import LoadingButton from '@base/components/@extended/LoadingButton';
import * as keyNames from '@settings/preferences/config/lead/keyNames';
import WriteField from '@base/containers/WriteField';
import validators from '@base/utils/validation/fieldValidator';
import { useMenuSettingUpdate } from '@settings/general/hooks/useMenuSetting';
import { generateUUID } from '@base/utils/helpers';
import ChildrenWriteField from '@settings/preferences/components/ChildrenWriteField';
import { WRITE_TYPE_COLLECTION } from '@settings/preferences/config/lead/constants';
import useSnackBar from '@base/hooks/useSnackBar';
import useDevice from '@base/hooks/useDevice';

//material-ui
import { Box, Button, Grid, Stack, TextField, useTheme } from '@mui/material';

//third-party
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

interface Props {
  value?: any;
  isOpen: boolean;
  onClose: any;
  settingKey?: string;
  header?: string;
}

const WritePage = (props: Props) => {
  const { isOpen, onClose, value, settingKey, header } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const { isMobile } = useDevice();
  // const [is]
  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: { name: '', children: [] },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });
  const [isMutating, setIsMutating] = useState<boolean>(false);
  //mutation
  const mSettingUpdate = useMenuSettingUpdate();
  const { enqueueSuccessBar } = useSnackBar();

  const onSubmit = useCallback(({ formData }: any) => {
    setIsMutating(true);
    let params: any;
    if (formData?.children?.length > 0) {
      params = {
        menu: 'sales',
        key: settingKey,
        value: JSON.stringify([...value, { id: generateUUID(), name: formData.name, children: formData.children }])
      };
      console.log('params', params);
      mSettingUpdate.mutate({ menuSetting: params });
    } else {
      params = {
        menu: 'sales',
        key: settingKey,
        value: JSON.stringify([...value, { id: generateUUID(), name: formData.name }])
      };

      mSettingUpdate.mutate(
        { menuSetting: params },
        {
          onSuccess: (res: any) => {
            enqueueSuccessBar('Add item successfully!');
          }
        }
      );
    }
  }, []);

  useEffect(() => {
    setIsMutating(false);
    if (mSettingUpdate.isSuccess) {
      onClose && onClose();
    }
  }, [mSettingUpdate.isSuccess]);

  const fields: any = {
    default: [
      {
        keyName: keyNames.KEY_SALES_SETTING_NAME,
        columns: 1,
        Component: TextField,
        languageKey: 'Name',
        componentProps: {
          autoComplete: 'off',
          fullWidth: true
        },
        validate: {
          required: validators.required
        }
      }
    ],
    collectionMethod: [
      {
        keyName: keyNames.KEY_SALES_SETTING_NAME,
        columns: 1,
        Component: TextField,
        languageKey: 'Name',
        componentProps: {
          autoComplete: 'off',
          fullWidth: true
        },
        validate: {
          required: validators.required
        }
      },
      {
        keyName: keyNames.KEY_SALES_SETTING_CHILDREN,
        columns: 1,
        Component: ChildrenWriteField,
        languageKey: 'Sub item',
        componentProps: {},
        validate: {}
      }
    ]
  };

  const MainFields = useMemo(() => {
    if (settingKey === WRITE_TYPE_COLLECTION)
      return (
        <>
          {fields.collectionMethod?.map((_item: any, _index: number) => {
            return <WriteField key={_item.keyName} item={_item} control={control} errors={errors} />;
          })}
        </>
      );
    return (
      <>
        {fields.default?.map((_item: any, _index: number) => {
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
              loading={isMutating}
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
      title={<SpanLang keyLang={`Add ${header}`} />}
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
