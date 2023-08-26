import { useCallback, useEffect, useMemo } from 'react';

import { Box, Button, Grid, InputLabel, Select, Stack, Switch, TextField, useTheme } from '@mui/material';

import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import LoadingButton from '@base/components/@extended/LoadingButton';
import { Controller, useForm } from 'react-hook-form';
import * as keyNames from '@settings/preferences/config/lead/keyNames';
import WriteField from '@base/containers/WriteField';
import validators from '@base/utils/validation/fieldValidator';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import { useSalesTeamMemberCreate } from '@settings/preferences/hooks/sales/useSalesTeamMember';
import DataSourceSelect from '@base/containers/DataSourceSelect';

interface Props {
  teamId?: string;
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
    defaultValues: { name: '', website: '' },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  //hooks
  const mMemberCreate: any = useSalesTeamMemberCreate();

  //create success
  useEffect(() => {
    if (mMemberCreate.isSuccess) {
      const newMember = mMemberCreate.variables.member;
      onAdd && onAdd(newMember);
      reset();
      onClose();
    }
  }, [mMemberCreate.isSuccess]);

  //submit form
  const onSubmit = (formData: any) => {
    //console.log('formData', formData);
    const params = {
      id: teamId,
      member: {
        [keyNames.KEY_SALES_TEAM_MEMBER_USER]: {
          user: { id: formData[keyNames.KEY_SALES_TEAM_MEMBER_USER].id, name: formData[keyNames.KEY_SALES_TEAM_MEMBER_USER].name }
        },
        [keyNames.KEY_SALES_TEAM_MEMBER_ROLE]: {
          id: formData[keyNames.KEY_SALES_TEAM_MEMBER_ROLE].keyName,
          name: formData[keyNames.KEY_SALES_TEAM_MEMBER_ROLE].languageKey
        },
        [keyNames.KEY_SALES_TEAM_MEMBER_ACTIVE]: formData[keyNames.KEY_SALES_TEAM_MEMBER_ACTIVE] || false
      }
    };
    mMemberCreate.mutate(params);
  };

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //field config
  const fields: any[] = [
    {
      keyName: keyNames.KEY_SALES_TEAM_MEMBER_USER,
      columns: 1,
      Component: UserAutoComplete,
      languageKey: 'User',
      componentProps: {
        single: true
      },
      validate: {
        required: validators.required
      }
    },
    {
      keyName: keyNames.KEY_SALES_TEAM_MEMBER_ROLE,
      columns: 1,
      Component: DataSourceSelect,
      componentProps: {
        single: true,
        sourceKey: 'sales_role',
        sourceType: 'field',
        keyOptionValue: 'keyName',
        keyOptionLabel: 'languageKey'
      },
      languageKey: 'Marketing/Sales Role',
      validate: {
        required: validators.required
      }
    },
    {
      keyName: keyNames.KEY_SALES_TEAM_MEMBER_ACTIVE,
      columns: 1,
      Component: Switch,
      languageKey: 'Active'
    }
  ];

  //render fields
  const MainFields = useMemo(() => {
    return (
      <>
        {fields?.map((_item, _index) => {
          // Group WriteFields
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
            <Button variant="outlined" color="secondary" onClick={onClose}>
              <SpanLang keyLang="ncrm_common_btn_cancel" textOnly />
            </Button>
            <LoadingButton
              variant="contained"
              onClick={() => {
                handleSubmit((data) => onSubmit(data), onError)();
              }}
              disabled={!isValid || mMemberCreate.isLoading}
              loading={mMemberCreate.isLoading}
            >
              <SpanLang keyLang={`ncrm_common_btn_save`} textOnly />
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [isValid, mMemberCreate.isLoading]);

  //======================== Debug ========================//
  // console.log('form values', watch()); //get form values when inputing
  // console.log('form errors', errors); //get form values when inputing
  // console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  return (
    <MiModal
      title={<SpanLang keyLang={`Add Competitor`} />}
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
