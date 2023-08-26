import { useCallback, useMemo } from 'react';

import { Box, Button, Grid, InputLabel, Select, Stack, TextField, useTheme } from '@mui/material';

import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import LoadingButton from '@base/components/@extended/LoadingButton';
import { Controller, useForm } from 'react-hook-form';
import * as keyNames from '@opportunity/config/keyNames';
import WriteField from '@base/containers/WriteField';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import WebsiteInput from '@base/components/@hanbiro/WebsiteInput';
import useOpportunityUpdate, { useOpportunityBulkUpdate } from '@opportunity/hooks/useOpportunityUpdate';
import fieldsConfig from './config';
import { CLOSE_TYPE_LOST } from '@opportunity/config/constants';

interface Props {
  value?: any;
  isOpen: boolean;
  onClose: any;
  menuSourceId: string;
}

const WritePage = (props: Props) => {
  const { isOpen, onClose, value, menuSourceId } = props;

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
    defaultValues: {
      [keyNames.KEY_NAME_OPPORTUNITY_CLOSE_REASON]: undefined,
      [keyNames.KEY_NAME_OPPORTUNITY_ACTUAL_REVENUE]: 0,
      [keyNames.KEY_NAME_OPPORTUNITY_CLOSE_DATE]: new Date(),
      [keyNames.KEY_NAME_OPPORTUNITY_CLOSE_COMPETITOR]: undefined,
      [keyNames.KEY_NAME_OPPORTUNITY_CLOSE_DESC]: ''
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  const mUpdate = useOpportunityUpdate();

  const onSubmit = useCallback((formData: any) => {
    reset();
    const params = {
      opportunity: {
        id: menuSourceId,
        ...formData,
        [keyNames.KEY_NAME_OPPORTUNITY_CLOSE_REASON]: {
          id: formData?.[keyNames.KEY_NAME_OPPORTUNITY_CLOSE_REASON]?.keyName,
          name: formData?.[keyNames.KEY_NAME_OPPORTUNITY_CLOSE_REASON]?.languageKey
        },
        [keyNames.KEY_NAME_OPPORTUNITY_CLOSE_DATE]: formData?.[keyNames.KEY_NAME_OPPORTUNITY_CLOSE_DATE]?.toISOString(),
        [keyNames.KEY_NAME_OPPORTUNITY_CLOSE_TYPE]: CLOSE_TYPE_LOST
      }
    };

    mUpdate.mutate(params);

    onClose && onClose();
  }, []);

  const onError = (errors: any, e: any) => {
    console.log('form error', errors, e);
  };

  const MainFields = useMemo(() => {
    return (
      <>
        {fieldsConfig?.map((_item: any) => {
          return <WriteField key={_item.keyName} item={_item} control={control} errors={errors} />;
        })}
      </>
    );
  }, [fieldsConfig, errors, control]);

  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button color="error" onClick={onClose}>
              <SpanLang keyLang="ncrm_common_btn_cancel" textOnly />
            </Button>
            <LoadingButton
              loading={false}
              variant="contained"
              loadingPosition="start"
              startIcon={<></>}
              onClick={() => {
                console.log('submite!!!');

                handleSubmit((data) => onSubmit(data), onError)();
              }}
              // disabled={mUpdate.isLoading || !isValid}
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
      title={<SpanLang keyLang={`Close Opportunity`} />}
      isOpen={isOpen}
      size="md"
      fullScreen={false}
      onClose={onClose}
      footer={Footer}
    >
      <form>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            {MainFields}
          </Grid>
        </Box>
      </form>
    </MiModal>
  );
};

export default WritePage;
