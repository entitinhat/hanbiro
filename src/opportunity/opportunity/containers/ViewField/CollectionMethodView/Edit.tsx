import React from 'react';

import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import { Box } from '@mui/material';

import LeadSettingSelect from '@lead/containers/SettingSelect';
import { WRITE_TYPE_COLLECTION } from '@settings/preferences/config/lead/constants';
import CollectionMethodAutoComplete from '@lead/containers/CollectionMethodAutoComplete';

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
    <Box sx={{ width: '100%' }}>
      <LeadSettingSelect value={value} onChange={handleOnChange} settingKey={WRITE_TYPE_COLLECTION} />
    </Box>
  );
};

export default Edit;
