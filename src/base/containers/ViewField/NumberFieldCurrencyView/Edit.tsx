import React from 'react';

import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import { Box } from '@mui/material';
import LinearProgressWithLabel from '@opportunity/components/LinearProgressWithLabel';
import NumberFieldCurrency from '@base/components/@hanbiro/NumberFieldCurrency';

// interface valueInterface {
//   moneyValue: number | string | undefined,
//   currency: string,
//   fCurrency: any
// }

interface EditProps extends CommonEditProps {
  value: any;
  onChange: (nValue: any) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;

  const onMoneyChange = (newValue: any) => {
    onChange && onChange({ ...value, moneyValue: newValue });
  };
  const onChangeCurrency = (newValue: any) => {
    onChange && onChange({ ...value, currency: newValue?.code, fCurrency: { ...newValue } });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <NumberFieldCurrency
        onChange={onMoneyChange}
        value={value?.moneyValue}
        onChageCurrency={onChangeCurrency}
        currencyValue={value?.fCurrency}
        {...componentProps}
      />
    </Box>
  );
};

export default Edit;
