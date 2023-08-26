import React from 'react';

import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import { Box, FormControl } from '@mui/material';
import LinearProgressWithLabel from '@opportunity/components/LinearProgressWithLabel';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import LeadSettingSelect from '@lead/containers/SettingSelect';
import { WRITE_TYPE_REFERRER } from '@settings/preferences/config/lead/constants';

interface EditProps extends CommonEditProps {
  value: any | null;
  onChange: (nValue: any) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;

  const handleOnChange = (newValue: any) => {
    onChange && onChange(newValue);
  };

  return (
    <FormControl fullWidth>
      <LeadSettingSelect value={value} onChange={handleOnChange} settingKey={WRITE_TYPE_REFERRER} />
    </FormControl>
  );
};

export default Edit;
