import React from 'react';

import { FormControlLabel, Checkbox } from '@mui/material';

import { CommonEditProps } from '../Common/interface';
import { useTranslation } from 'react-i18next';

interface EditProps extends CommonEditProps {
  label?: string;
  value: boolean;
  onChange: (checked: boolean) => void;
}

const Edit = (props: EditProps) => {
  const { value, label, onChange } = props;
  const { t } = useTranslation()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.checked);
  };

  return <FormControlLabel control={<Checkbox size="small" sx={{my: 2 , ml: 2, p: 0}} checked={value} onChange={handleChange} />} label={t(label || '')} />;
};

export default Edit;
