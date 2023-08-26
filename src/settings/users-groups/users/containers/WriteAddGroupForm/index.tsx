import React, { Suspense, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import validators from '@base/utils/validation/fieldValidator';
import { Box, Button, Grid, Stack, TextField, useTheme } from '@mui/material';
import MiModal from '@base/components/@hanbiro/MiModal';
// import * as keyNames from '@directory/users/config/keyNames';
import WriteField from '@base/containers/WriteField';
import { useGroupMembershipMutation } from '@settings/users-groups/groups/hooks/useGroupMembershipMutation';
import { useOrg } from '@base/hooks/iam/useOrg';
import GroupAutocomplete from '@settings/users-groups/groups/containers/GroupAutocomplete';
import { GROUP_ASSIGN_USER_MODAL_SAVE, GROUP_ASSIGN_USER_MODAL_TITLE, GROUP_AUTOCOMPLETE_PLACEHOLDER } from '../../config/constants';
import { useTranslation } from 'react-i18next';

interface WriteAddGroupFormProps {
  isOpen: boolean;
  onClose: () => void;
  menuSource?: string;
  menuSourceId?: string;
  onReload?: () => void;
}

const WriteAddGroupForm = (props: WriteAddGroupFormProps) => {
  const { isOpen, onClose, menuSourceId, onReload } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  //state

  //react-hook
  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {},
    criteriaMode: 'firstError',
    mode: 'onChange'
  });
  //create mutation
  const { mCreate } = useGroupMembershipMutation();
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
  const onSubmit = useCallback(({ formData }: any) => {
    mCreate.mutate({
      input: {
        memberId: menuSourceId,
        memberType: 'USER',
        orgId: orgId,
        groupId: formData.id
      }
    });
  }, []);
  // console.log('isValid', isValid);
  useEffect(() => {
    if (mCreate.isSuccess) {
      onReload && onReload();
      onClose && onClose();
    }
  }, [mCreate.isSuccess]);

  const MainFields = useMemo(() => {
    return (
      <Box sx={{ p: 2.5 }}>
        <Grid container spacing={2} alignItems="center">
          <WriteField
            item={{
              keyName: 'id',
              Component: GroupAutocomplete,
              columns: 1,
              componentProps: {
                placeholder: t(GROUP_AUTOCOMPLETE_PLACEHOLDER)
              },
              languageKey: 'Groups',
              section: 0,
              tooltipShow: false,
              validate: {
                required: validators.required
              }
            }}
            control={control}
            errors={errors}
          />
        </Grid>
      </Box>
    );
  }, [isValid]);
  //buttons
  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" variant="outlined" color="secondary" onClick={handleClose}>
              {t('ncrm_common_btn_cancel')}
            </Button>
            <Button
              size="small"
              disabled={!isValid}
              variant="contained"
              sx={{
                '&.Mui-disabled': {
                  backgroundColor: theme.palette.primary.main
                }
              }}
              color="primary"
              onClick={() => {
                handleSubmit((data) => onSubmit({ formData: data }))();
              }}
            >
              {t(GROUP_ASSIGN_USER_MODAL_SAVE)}
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
        title={t(GROUP_ASSIGN_USER_MODAL_TITLE) as string}
        isOpen={isOpen} //writeOption.isOpenWrite
        size="md"
        fullScreen={false}
        onClose={handleClose}
        footer={Footer}
      >
        {isOpen && <form onSubmit={handleSubmit(onSubmit, onError)}>{MainFields}</form>}
      </MiModal>
    </Suspense>
  );
};

export default WriteAddGroupForm;
