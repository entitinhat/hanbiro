import { repeatUnitOptions, weekDayOptions } from '@analytic/main/config/options';
import { ERepeatUnit } from '@analytic/main/types/enum';
import { Box, Chip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
interface ViewProps {
  value: any;
}

const getShortNameOfDay = (day: number) => {
  const lastNumber = parseInt(day.toString().slice(-1));
  if ([1, 2, 3].includes(lastNumber)) {
    return {
      1: 'st',
      2: 'nd',
      3: 'rd'
    }[lastNumber];
  }
  return 'th';
};

const View: React.FC<ViewProps> = (props: ViewProps) => {
  const { value } = props;
  const { t } = useTranslation()
  const theme = useTheme();
  if (!value) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <Box sx={{ width: 50, borderBottom: '1px dashed ' + theme.palette.grey[400] }}></Box>
      </Box>
    );
  }

  const { frequency, dayAt, monthAt, timeAt } = value ?? {};

  const frequencyStr = repeatUnitOptions[frequency];

  const getEvery = (): string => {
    if (frequency === ERepeatUnit.REPEAT_UNIT_DAILY) {
      return timeAt;
    } else if (frequency === ERepeatUnit.REPEAT_UNIT_WEEKLY) {
      return `${t(weekDayOptions[dayAt])} ${timeAt}`;
    } else if (frequency === ERepeatUnit.REPEAT_UNIT_MONTHLY) {
      return `${dayAt}${getShortNameOfDay(dayAt)} ${timeAt}`;
    } else if (frequency === ERepeatUnit.REPEAT_UNIT_YEARLY) {
      return `${monthAt}/${dayAt}${getShortNameOfDay(dayAt)} ${timeAt}`;
    }
    return '';
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip label={t(frequencyStr)} color="success" />
      <Typography mx={2}>{t('ncrm_common_every')}: </Typography>
      <Chip label={getEvery()} color="success" />
    </Box>
  );
};

export default View;
