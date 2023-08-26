import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import validators from '@base/utils/validation/fieldValidator';
import * as keyNames from '@settings/users-groups/groups/config/keyNames';
//config

import { ListType } from '@base/types/app';
import { ButtonOption } from '@base/types/extended';
import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import RetryErrorBoundary from '@base/components/@hanbiro/Errors/RetryErrorBoundary';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import MiModal from '@base/components/@hanbiro/MiModal';
// import * as keyNames from '@directory/users/config/keyNames';
import WriteField from '@base/containers/WriteField';
import { MemberType } from '../../types/group';
import SelectBoxCustom from '@base/components/@hanbiro/SelectBoxCustom';

import GroupAutocomplete from '../GroupAutocomplete';
import { MEMBER_TYPES_OPTIONS } from '../../config/constants';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import { getParams } from './payload';

// import { getParams } from './payload';
// import { finalizeParams } from './payload';

interface WriteMembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  // menuApi: string;
  // listType: ListType;
  // category: string;
  // type: string;
  onReload?: () => void;
  // defaultValues: any; //with write form
  // fields: any[]; //with write form
  // getParams: any; //with write form
  // loading?: boolean; //with write form
  handleAddRow: (param: any) => void;
}

const WriteMembershipModal = (props: WriteMembershipModalProps) => {
  const { isOpen, onClose, onReload, handleAddRow } = props;

  //state
  const [isReset, setIsReset] = useState(false);

  //react-hook
  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      [keyNames.KEY_MEMBERSHIP_MEMBER_TYPE]: MEMBER_TYPES_OPTIONS[1]
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

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
    const newFormData = getParams(formData);
    handleAddRow(newFormData);
    handleClose();
  }, []);

  //watching
  const memberType = watch(keyNames.KEY_MEMBERSHIP_MEMBER_TYPE);

  const MainFields = useMemo(() => {
    return (
      <Box sx={{ p: 2.5 }}>
        <Grid container spacing={2} alignItems="center">
          <WriteField
            item={{
              keyName: keyNames.KEY_MEMBERSHIP_MEMBER_TYPE,
              Component: SelectBoxCustom,
              columns: 1,
              componentProps: {
                placeholder: 'Select Member Type',
                options: MEMBER_TYPES_OPTIONS
              },
              languageKey: 'Member Type',
              section: 0,
              tooltipShow: false,
              validate: {
                required: validators.required
              }
            }}
            control={control}
            errors={errors}
          />
          {memberType.value === MemberType.USER && (
            <WriteField
              item={{
                keyName: keyNames.KEY_MEMBERSHIP_MEMBER_ID,
                Component: UserAutoComplete,
                columns: 1,
                componentProps: {
                  placeholder: 'Select Users',
                  single: true
                },
                languageKey: 'Users',
                section: 0,
                tooltipShow: false,
                validate: {
                  required: validators.required
                }
              }}
              control={control}
              errors={errors}
            />
          )}
          {memberType.value === MemberType.GROUP && (
            <WriteField
              item={{
                keyName: keyNames.KEY_MEMBERSHIP_MEMBER_ID,
                Component: GroupAutocomplete,
                columns: 1,
                componentProps: {
                  placeholder: 'Select Groups'
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
          )}
        </Grid>
      </Box>
    );
  }, [memberType, isValid]);
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
              disabled={!isValid}
              color="primary"
              onClick={() => {
                handleSubmit((data) => onSubmit({ formData: data }))();
              }}
            >
              Add member
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
        title={'Add members to Group'}
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

export default WriteMembershipModal;
