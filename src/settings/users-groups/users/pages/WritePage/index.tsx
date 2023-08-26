import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import validators from '@base/utils/validation/fieldValidator';

//config

import { Box, Button, Grid, Stack, TextField, useTheme } from '@mui/material';
import MiModal from '@base/components/@hanbiro/MiModal';
import WriteField from '@base/containers/WriteField';
import { getParams } from './payload';
import { useUserMutation } from '../../hooks/useUserMutation';
import { useOrg } from '@base/hooks/iam/useOrg';
import * as keyNames from '@settings/users-groups/users/config/keyNames';
import { WRITE_FIELDS_MAX_LENGTH } from '@base/config/constant';
import UserPhones from '../../containers/UserPhones/Write';
import UserEmails from '../../containers/UserEmails/Write';
import { useTranslation } from 'react-i18next';
import {
  USER_WRITE_LANGUAGE_KEY_DISPLAY_NAME,
  USER_WRITE_LANGUAGE_KEY_FULL_NAME,
  USER_WRITE_LANGUAGE_KEY_URL,
  USER_WRITE_PLACEHOLDER_DISPLAY_NAME,
  USER_WRITE_PLACEHOLDER_FULL_NAME,
  USER_WRITE_PLACEHOLDER_URL,
  USER_WRITE_TITLE_FORM
} from '../../config/constants';

interface WriteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WriteModal = (props: WriteModalProps) => {
  const { isOpen, onClose } = props;
  const theme = useTheme();
  //state
  const [isReset, setIsReset] = useState(false);
  const { t } = useTranslation();
  //react-hook
  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      displayName: '',
      fullName: '',
      urlName: '',
      emails: [],
      phones: []
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });
  //create mutation\
  const { mCreate } = useUserMutation();
  const { id: orgId } = useOrg();

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //close
  const handleClose = () => {
    onClose();
  };

  //submit form
  const onSubmit = useCallback((formData: any) => {
    // console.log('Users Groups USER FormData WritePage', formData);
    mCreate.mutate(getParams(formData, orgId));
  }, []);

  useEffect(() => {
    if (mCreate.isSuccess) onClose && onClose();
  }, [mCreate.isSuccess]);

  const MainFields = () => {
    return (
      <Box sx={{ p: 2.5 }}>
        <Grid container spacing={2} alignItems="center">
          <WriteField
            item={{
              keyName: keyNames.KEY_USER_DISPLAY_NAME,
              Component: TextField,
              columns: 1,
              componentProps: {
                placeholder: t(USER_WRITE_PLACEHOLDER_DISPLAY_NAME)
              },
              languageKey: USER_WRITE_LANGUAGE_KEY_DISPLAY_NAME,
              section: 0,
              tooltipShow: false,
              validate: {
                required: validators.required,
                maxLength: (values: string) => validators.maxLength(values, WRITE_FIELDS_MAX_LENGTH[keyNames.KEY_USER_DISPLAY_NAME])
              }
            }}
            control={control}
            errors={errors}
          />
          <WriteField
            item={{
              keyName: keyNames.KEY_USER_FULLNAME,
              Component: TextField,
              columns: 1,
              componentProps: {
                placeholder: t(USER_WRITE_PLACEHOLDER_FULL_NAME)
              },
              languageKey: USER_WRITE_LANGUAGE_KEY_FULL_NAME,
              section: 0,
              tooltipShow: false,
              validate: {
                required: validators.required,
                maxLength: (values: string) => validators.maxLength(values, WRITE_FIELDS_MAX_LENGTH[keyNames.KEY_USER_FULLNAME])
              }
            }}
            control={control}
            errors={errors}
          />
          <WriteField
            item={{
              keyName: keyNames.KEY_USER_URL_NAME,
              Component: TextField,
              columns: 1,
              componentProps: {
                placeholder: t(USER_WRITE_PLACEHOLDER_URL)
              },
              languageKey: USER_WRITE_LANGUAGE_KEY_URL,
              section: 0,
              tooltipShow: false,
              validate: {
                required: validators.required,
                maxLength: (values: string) => validators.maxLength(values, WRITE_FIELDS_MAX_LENGTH[keyNames.KEY_USER_URL_NAME])
              }
            }}
            control={control}
            errors={errors}
          />
          <Grid container flexWrap="nowrap" sx={{ p: '16px' }}>
            <WriteField
              item={{
                keyName: keyNames.KEY_USER_EMAIL,
                Component: UserEmails,
                columns: 2,
                componentProps: { mode: 'write' },
                section: 0,
                tooltipShow: false,
                validate: {
                  // emails: validators.emails
                }
              }}
              control={control}
              errors={errors}
            />
            <WriteField
              item={{
                keyName: keyNames.KEY_USER_PHONE,
                Component: UserPhones,
                columns: 2,
                componentProps: { mode: 'write' },
                section: 0,
                tooltipShow: false,
                validate: {
                  // phones: validators.phones
                }
              }}
              control={control}
              errors={errors}
            />
          </Grid>
        </Grid>
      </Box>
    );
  };
  //buttons
  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" color="secondary" variant="outlined" onClick={handleClose}>
              {t('ncrm_common_btn_cancle')}
            </Button>
            <Button
              size="small"
              variant="contained"
              sx={{
                '&.Mui-disabled': {
                  backgroundColor: theme.palette.primary.main
                }
              }}
              color="primary"
              onClick={() => {
                handleSubmit((data) => onSubmit(data), onError)();
              }}
              disabled={!isValid}
            >
              {t('ncrm_common_btn_save')}
            </Button>
            {/* <ButtonSplit buttons={options} /> */}
          </Stack>
        </Grid>
      </Grid>
    );
  }, [isValid]);

  //======================== Debug ========================//
  // console.log('form values', watch()); //get form values when inputing
  //console.log('form errors', errors); //get form values when inputing
  //console.log('form isValid', isValid); //get form values when inputing
  //console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  return (
    <Suspense fallback={<></>}>
      <MiModal
        title={t(USER_WRITE_TITLE_FORM) as string}
        isOpen={isOpen} //writeOption.isOpenWrite
        size="md"
        fullScreen={false}
        onClose={handleClose}
        footer={Footer}
      >
        {isOpen && <form onSubmit={handleSubmit(onSubmit, onError)}>{MainFields()}</form>}
      </MiModal>
    </Suspense>
  );
};

export default WriteModal;
