import { WEEK_DAYS } from '@base/config/constant';
import { MenuItem, Select, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
interface FirstDayOfWeekProps {
  value: any;
  onChange: (params: any) => void;
}
const FirstDayOfWeek = (props: FirstDayOfWeekProps) => {
  const { value, onChange, ...attrs } = props;
  const { t } = useTranslation();

  return (
    <>
      <Typography color="secondary" mb={1}>
        {t('ncrm_generalsetting_first_day_of_week')}
      </Typography>
      <Select className="wd-150-f" sx={{ width: '150px' }} value={value} onChange={onChange} {...attrs}>
        {WEEK_DAYS.map((opt: { value: number; label: string }, idx: number) => (
          <MenuItem value={opt.value} key={idx}>
            {t(opt.label)}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default FirstDayOfWeek;
