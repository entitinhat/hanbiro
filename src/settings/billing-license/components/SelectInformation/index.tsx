// import React
import React, { useState } from 'react';

// import MUI components
import { FormControl, Select, MenuItem, SelectChangeEvent, useTheme } from '@mui/material';
import { TableData } from '@settings/billing-license/types/tableData';
import { dummyData } from '@settings/billing-license/containers/Contact';
import SelectBox from '@base/components/@hanbiro/SelectBox';
import { OptionValue } from '@base/types/common';

const SelectInformation = (props: any) => {
  const { handleAdd } = props;
  const [option, setOption] = React.useState('');
  const theme = useTheme();
  const [value, setValue] = useState<OptionValue | undefined>(undefined);

  // handle click when choosing a option from select option
  const handleChange = (val: OptionValue) => {
    handleAdd && handleAdd(dummyData.find((v: any) => v?.id === val?.keyName));
    setValue(val);
  };

  return (
    <>
      <SelectBox options={dummyData.map((v: any) => ({ keyName: v?.id, languageKey: v?.name }))} onChange={handleChange} value={value} />
    </>
  );
};

export default SelectInformation;
