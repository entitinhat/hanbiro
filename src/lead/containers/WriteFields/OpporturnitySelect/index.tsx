import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import {
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
} from '@mui/material';

import SpanLang from '@base/components/@hanbiro/SpanLang';
import ExistingOpportunityTable from './ExistingOpportunityTable'

interface OpporturnitySelectProps {
  onChange: (val: any) => void;
}

const OpporturnitySelect = (props: OpporturnitySelectProps) => {
  const { onChange } = props;
  const { t } = useTranslation();

  const [ opportunityType, setOpportunityType ] = useState<string>('createNew')
  const [selectedOppoturnity, setSelectedOppoturnity] = useState<any>();

  useEffect(() => {
    if(opportunityType == 'createNew'){
      onChange && onChange(null)
    } else {
      onChange && onChange(selectedOppoturnity || '')
    }
  },[opportunityType, selectedOppoturnity])


  return ( <>
    <FormControl sx={{ mr: 'auto', pt: 2 }}>
      <RadioGroup
        value={opportunityType}
        onChange={(e: any, v: any) => {
          setOpportunityType(v);
        }}
        // row
      >
        <FormControlLabel control={<Radio />} value={'createNew'} label={<SpanLang keyLang='ncrm_sales_lead_qualify_create_new' />} />
        <FormControlLabel control={<Radio />} value={'chooseExisting'} label={<SpanLang keyLang='ncrm_sales_lead_qualify_chooose_exist' />} />
      </RadioGroup>
    </FormControl>
    {opportunityType == 'chooseExisting' && <ExistingOpportunityTable onChecked={(val: any) => setSelectedOppoturnity(_.isArray(val) ? val[0] : val)} /> }
    </>);
};

export default OpporturnitySelect;
