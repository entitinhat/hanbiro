import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import validators from '@base/utils/validation/fieldValidator';
//config

import { Box, Button, Grid, Stack, TextField, useTheme } from '@mui/material';

import MiModal from '@base/components/@hanbiro/MiModal';

import WriteField from '@base/containers/WriteField';

import { getParams } from './payload';
import { useGroupMutation } from '../../hooks/useGroupMutation';
import { useOrg } from '@base/hooks/iam/useOrg';

import * as keyNames from '@settings/users-groups/groups/config/keyNames';
import {
  GROUP_WRITE_LANGUAGE_KEY_DESCRIPTION,
  GROUP_WRITE_LANGUAGE_KEY_NAME,
  GROUP_WRITE_LANGUAGE_KEY_URL,
  GROUP_WRITE_PLACEHOLDER_DESCRIPTION,
  GROUP_WRITE_PLACEHOLDER_NAME,
  GROUP_WRITE_PLACEHOLDER_URL,
  GROUP_WRITE_TITLE_FORM
} from '../../config/constants';
import { useTranslation } from 'react-i18next';

// import { finalizeParams } from './payload';

interface WriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReload?: () => void;
}

const WriteModal = (props: WriteModalProps) => {
  const { isOpen, onClose, onReload } = props;
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
      urlName: '',
      description: ''
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });
  //create mutation
  const { mCreate } = useGroupMutation();

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };
  const orgId = useOrg().id;
  //close
  const handleClose = () => {
    onClose();
  };

  //submit form
  const onSubmit = useCallback(({ formData }: any) => {
    const configParams = getParams(formData, orgId); //generate api params by fields
    // console.log('formData', configParams);
    mCreate.mutate(configParams);
  }, []);
  // console.log('isValid', isValid);
  useEffect(() => {
    if (mCreate.isSuccess) {
      onReload && onReload();
      onClose && onClose();
    }
  }, [mCreate.isSuccess]);

  const MainFields = () => {
    return (
      <Box sx={{ p: 2.5 }}>
        <Grid container spacing={2} alignItems="center">
          <WriteField
            item={{
              keyName: keyNames.KEY_GROUPS_NAME,
              Component: TextField,
              columns: 1,
              componentProps: {
                placeholder: t(GROUP_WRITE_PLACEHOLDER_NAME)
              },
              languageKey: GROUP_WRITE_LANGUAGE_KEY_NAME,
              section: 0,
              tooltipShow: false,
              validate: {
                required: validators.required
              }
            }}
            control={control}
            errors={errors}
          />

          <WriteField
            item={{
              keyName: keyNames.KEY_GROUPS_URL,
              Component: TextField,
              columns: 1,
              componentProps: {
                placeholder: t(GROUP_WRITE_PLACEHOLDER_URL)
              },
              languageKey: GROUP_WRITE_LANGUAGE_KEY_URL,
              section: 0,
              tooltipShow: false,
              validate: {
                required: validators.required,
                maxLength: (values: string) => validators.maxLength(values, 63)
              }
            }}
            control={control}
            errors={errors}
          />
          <WriteField
            item={{
              keyName: keyNames.KEY_GROUPS_DESCRIPTION,
              Component: TextField,
              columns: 1,
              componentProps: {
                fullWidth: true,
                autoComplete: 'off',
                multiline: true,
                rows: 4,
                placeholder: t(GROUP_WRITE_PLACEHOLDER_DESCRIPTION)
              },
              languageKey: GROUP_WRITE_LANGUAGE_KEY_DESCRIPTION,
              section: 0,
              tooltipShow: false
              // validate: {
              //   required: validators.required
              // }
            }}
            control={control}
            errors={errors}
          />
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
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              sx={{
                '&.Mui-disabled': {
                  backgroundColor: theme.palette.primary.main
                }
              }}
              disabled={!isValid}
              color="primary"
              onClick={() => {
                handleSubmit((data) => onSubmit({ formData: data }))();
              }}
            >
              Create
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
        title={t(GROUP_WRITE_TITLE_FORM) as string}
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
