import React, { useMemo, useState, ReactNode, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import SpanLang from '@base/components/@hanbiro/SpanLang';
import LoadingButton from '@base/components/@extended/LoadingButton';
import MiModal from '@base/components/@hanbiro/MiModal';

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  Tabs,
  Tab,
  Grid,
  Stack,
} from '@mui/material';

import UserAutoComplete from '@sign-in/containers/UserAutoComplete';

interface AssignOpportunityProps {
    onChange?: (val: any) => void;
}


const AssignOpportunity = (props: AssignOpportunityProps) => {
    const { onChange } = props;

    const [ assignOpportunityTo, setAssignOpportunityTo ] = useState<string>('salesPerson')
    const [ assiggTo, setAssignTo ] = useState<any>()

    useEffect(() => {
        if(assignOpportunityTo == 'salesPerson'){
            onChange && onChange('salesPerson')
        } else {
            onChange && onChange({ group: { id: assiggTo?.id, name: assiggTo?.name } })
        }
    }, [assignOpportunityTo, assiggTo])

    return <FormControl sx={{ mr: 'auto', pt: 2, width: '100%' }}>
              <RadioGroup
                value={assignOpportunityTo}
                onChange={(e: any, v: any) => {
                  setAssignOpportunityTo(v);
                }}
              >
                <FormControlLabel control={<Radio />} value={'salesPerson'} label={'Sales Person'} />

                <Grid container sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                  <Grid item xs={3}>
                    <FormControlLabel control={<Radio />} value={'salesTeam'} label={'Sales Team'} /> 
                  </Grid>
                  <Grid item xs={9}>
                    {assignOpportunityTo == 'salesTeam' && <UserAutoComplete single={true} value={assiggTo} onChange={(val: any) => setAssignTo(val)} /> }
                  </Grid>
                </Grid>

              </RadioGroup>
            </FormControl>
}

export default AssignOpportunity;