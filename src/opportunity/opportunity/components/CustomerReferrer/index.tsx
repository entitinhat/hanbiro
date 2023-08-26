import DataSourceSelect from '@base/containers/DataSourceSelect';
import CustomerAutoComplete from '@customer/containers/CustomerAutoComplete';
import { Customer } from '@customer/types/interface';
import { Grid } from '@mui/material';
import { useState } from 'react';

interface ReferrerProps {
  value: Customer | undefined;
  onChange?: (newVal: any) => void;
}

const CustomerReferrer = (props: ReferrerProps) => {
  const { value, onChange } = props;
  const [type, setType] = useState<any>(null);

  return (
    <Grid container>
      <Grid item xs={12} lg={5} sx={{ pr: 1 }}>
        <DataSourceSelect
          sourceType="field"
          sourceKey="customer_category"
          single={true}
          value={type}
          onChange={(newType: any) => setType(newType)}
        />
      </Grid>
      <Grid item xs={12} lg={7}>
        <CustomerAutoComplete single={true} type={type?.keyName} value={value} onChange={(newVal: any) => onChange && onChange(newVal)} />
      </Grid>
    </Grid>
  );
};

export default CustomerReferrer;
