import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

import {
  Box,
  Button,
  Grid,
  Stack,
} from '@mui/material';

import SpanLang from '@base/components/@hanbiro/SpanLang';
import LoadingButton from '@base/components/@extended/LoadingButton';
import MiModal from '@base/components/@hanbiro/MiModal';
import WriteField from '@base/containers/WriteField';
import { SET_TIMEOUT } from '@base/config/constant';
import { MENU_LEAD } from '@base/config/menus';
import { queryClient } from '@base/config/queryClient';

import * as keyNames from '@lead/config/keyNames';
import { useLeadMutation } from '@lead/hooks/useLeadMutation';
import { useLeadsMutation } from '@lead/hooks/useLeadsMutation';
import { queryKeys } from '@lead/config/queryKeys';

import ConvertType from '../WriteFields/ConvertType';
import OpporturnitySelect from '../WriteFields/OpporturnitySelect';
import AssignOpportunity from '../WriteFields/AssignOpportunity';

interface LeadQualifyProps {
  isOpen?: boolean;
  onCancel?: any;
  onClose: any;
  leadId: string[] | string; // update single Lead or multi Lead
  leadData: any;
  updateSingleLead?: boolean;
  onReload?: any;
}

const LeadQualify = (props: LeadQualifyProps) => {
  const { isOpen = false, onClose, leadId, leadData, updateSingleLead = false, onCancel, onReload } = props;
  const { mQualifyLead } = useLeadMutation();
  const { mQualifyLeads } = useLeadsMutation();
  const navigate = useNavigate();

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
      customterCategory: 'account',
      customer: null,
      opportunity: null,
      // assignTo: '',
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  const leadsQualify = !updateSingleLead && leadData?.filter((item: any) => leadId.includes(item?.id));
  
  const onSubmit = useCallback(({ formData }: any) => {
    console.log('formDataContact', formData);
    const params: any = {
      lead: updateSingleLead && { id: leadData?.id, title: leadData?.title },
      leads: !updateSingleLead && leadsQualify?.map((_ele: any) => ({ id: _ele?.id, title: _ele?.title })),
      customerCategory: formData?.convertTo?.customerCategory,
      customer: formData?.convertTo?.customer ? { id: formData?.convertTo?.customer?.id, name: formData?.convertTo?.customer?.name } : null,
      opportunity: formData?.opportunity ? { id: formData?.opportunity?.id, name: formData?.opportunity?.title } : null
    };

    if(updateSingleLead){
      delete params.leads
    } else if (!updateSingleLead) {
      delete params.lead
    }
    console.log('paramsConvertLead', params);
    //api update 
    if(updateSingleLead){
      mQualifyLead.mutate(params);
    } else if(!updateSingleLead){
      mQualifyLeads.mutate(params);
    }
  }, []);

  const handleClose = () => {
    reset && reset();
    onClose && onClose()
  }

  useEffect(() => {
    if(mQualifyLead.isSuccess || mQualifyLeads.isSuccess){
      reset && reset();
      onClose && onClose()
      onCancel && onCancel()
      onReload && onReload()
      if(mQualifyLead.isSuccess){
        // Navigate
        setTimeout(() => {
          queryClient.refetchQueries({ queryKey: [queryKeys.leadsGet]});
          navigate(`/${MENU_LEAD}`, { replace: true });
        }, SET_TIMEOUT);
      }
    }
  }, [mQualifyLead.isSuccess, mQualifyLeads.isSuccess])

  const fields: any[] = [
    {
      keyName: keyNames.KEY_LEAD_QUALIFY_CONVERT_TO,
      columns: 1,
      Component: ConvertType,
      languageKey: 'ncrm_sales_lead_qualify_convert_to',
      componentProps: {},
      // hideTitle: true
    },
    {
      keyName: keyNames.KEY_LEAD_QUALIFY_OPPORTUNITY,
      columns: 1,
      Component: OpporturnitySelect,
      languageKey: 'ncrm_sales_lead_qualify_opportunity',
      componentProps: {}
    },
    {
      keyName: keyNames.KEY_LEAD_QUALIFY_ASSIGN_TO,
      columns: 1,
      Component: AssignOpportunity,
      languageKey: 'ncrm_sales_lead_qualify_assign_opportunity_to',
      componentProps: {
        isMultiple: true,
        haveExtension: false
      }
    },
  ];

  const MainFields = useMemo(() => {
    return (
      <>
        {fields?.map((_item, _index) => {
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
            <Button size="small" variant="outlined" color="secondary" onClick={handleClose}>
              <SpanLang keyLang="ncrm_common_btn_cancel" textOnly />
            </Button>
            <LoadingButton
              loading={false}
              variant="contained"
              loadingPosition="start"
              startIcon={<></>}
              onClick={() => {
                handleSubmit((data) => onSubmit({ formData: data }))();
              }}
              disabled={!isValid}
            >
              <SpanLang keyLang={`ncrm_common_btn_save`} textOnly />
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [isValid]);

  //======================== Debug ========================//
  console.log('form values', watch()); //get form values when inputing
  // console.log('form errors', errors); //get form values when inputing
  // console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  return (
    <MiModal
      title={<SpanLang keyLang={`ncrm_general_lead_convert_lead`} />}
      isOpen={isOpen}
      size="md"
      fullScreen={false}
      onClose={onClose}
      footer={Footer}
      anchor={'right'}
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
}

  
export default LeadQualify;