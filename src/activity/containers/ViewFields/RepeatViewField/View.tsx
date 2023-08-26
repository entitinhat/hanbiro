import { ChangeEvent, useCallback, useEffect, useState } from 'react';

// mui import
import { Box, Grid, Stack, Switch, Typography } from '@mui/material';

import { Repeat } from '@base/components/@hanbiro/RepeatTime';
import { useTranslation } from 'react-i18next';
import { MONTHS, RECURRENCES, RECURRENCE_TYPE } from '@base/components/@hanbiro/RepeatTime/configs';
import { LabelValue } from '@base/types/app';
import { daysInMonth, getStrToReDays, getWeekOfMonth } from '@base/components/@hanbiro/RepeatTime/utils';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';

interface ViewProps extends CommonViewProps {
  value: Repeat;
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value: scheduleValue } = props;

  const renderRecurrenceType = useCallback(() => {
    const item = RECURRENCES.find((v: LabelValue) => v.value == scheduleValue.type);
    return <Typography>{t(item?.label ?? '')}</Typography>;
  }, [scheduleValue]);

  const renderRecurrenceTime = useCallback(() => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1.25} direction={'row'}>
            <Typography color="secondary">Start Time</Typography>
            <Typography>{scheduleValue.startTime}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1.25} direction={'row'}>
            <Typography color="secondary">End Time</Typography>
            <Typography>{scheduleValue.endTime}</Typography>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [scheduleValue]);

  const renderRecurrenceEvery = useCallback(() => {
    return <Typography>{scheduleValue.everyNr}</Typography>;
  }, [scheduleValue]);

  const renderWeekdayOptions = useCallback(() => {
    const DAY_OPTIONS: LabelValue[] = getStrToReDays(scheduleValue.weekdays);

    return (
      <Box sx={{ display: 'flex', flexWarp: 'warp' }}>
        {DAY_OPTIONS?.map((_option: LabelValue, _index: number) => {
          return (
            _option.extra && (
              <Box key={_index} sx={{ mr: 1, textTransform: 'capitalize' }} className="tx-capitalize mg-r-10">
                <Typography>{t(_option.label ?? '')}</Typography>
              </Box>
            )
          );
        })}
      </Box>
    );
  }, [scheduleValue]);

  const renderMonthlyRecurrence = useCallback(() => {
    const dayOptions: LabelValue[] = daysInMonth(new Date().getMonth() + 1);
    const weekOptions: LabelValue[] = getWeekOfMonth(new Date());
    const monthlyWeek = weekOptions.find((_ele: any) => _ele.value === scheduleValue.monthlyWeek);
    const monthlyDay = dayOptions.find((_ele: any) => _ele.value === scheduleValue.monthlyDay);

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', mt: '10px' }} className="d-flex align-items-center mg-t-10">
        {scheduleValue.monthlyOption === 'week' && (
          <>
            <Typography sx={{ whiteSpace: 'nowarp' }} className="tx-nowrap">
              {t('ncrm_common_the_week')}
            </Typography>
            <Typography sx={{ mr: 1, ml: 1 }} className="mg-x-10">
              {monthlyWeek?.label}
            </Typography>
            {renderWeekdayOptions()}
          </>
        )}
        {scheduleValue.monthlyOption === 'day' && (
          <>
            <Typography sx={{ whiteSpace: 'nowarp' }} className="tx-nowrap">
              {t('ncrm_common_the_day')}
            </Typography>
            <Typography sx={{ mr: 1, ml: 1 }} className="mg-x-10">
              {monthlyDay?.label}
            </Typography>
          </>
        )}
        {scheduleValue.monthlyOption === 'last' && (
          <Typography sx={{ whiteSpace: 'nowarp' }} className="tx-nowrap">
            {t('ncrm_common_the_last_day')}
          </Typography>
        )}
      </Box>
    );
  }, [scheduleValue]);

  const renderYearlyRecurrence = useCallback(() => {
    const dayOptions: LabelValue[] = daysInMonth(new Date().getMonth() + 1);
    const weekOptions: LabelValue[] = getWeekOfMonth(new Date());
    const yearlyWeekMonth = MONTHS.find((_ele: any) => _ele.value === scheduleValue.yearlyWeekMonth);
    const yearlyWeek = weekOptions.find((_ele: any) => _ele.value === scheduleValue.yearlyWeek);
    const yearlyDayMonth = MONTHS.find((_ele: any) => _ele.value === scheduleValue.yearlyDayMonth);
    const yearlyDay = dayOptions.find((_ele: any) => _ele.value === scheduleValue.yearlyDay);

    return (
      <Box sx={{ display: 'flex', direction: 'column', mt: 1 }} className="d-flex flex-column mg-t-10">
        {scheduleValue.yearlyOption === 'week' && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }} className="d-flex align-items-center">
              <Typography sx={{ whiteSpace: 'nowarp' }} className="tx-nowrap">
                {t('ncrm_common_the_week')}
              </Typography>
              <Typography sx={{ mr: 1, ml: 1 }} className="mg-x-10">
                {yearlyWeekMonth?.label}
              </Typography>
              <Typography sx={{ mr: 1 }} className="mg-r-10">
                {yearlyWeek?.label}
              </Typography>
            </Box>
            <Box className="mg-l-20">{renderWeekdayOptions()}</Box>
          </>
        )}
        {scheduleValue.yearlyOption === 'day' && (
          <Box sx={{ display: 'flex', alignItems: 'center' }} className="d-flex align-items-center">
            <Typography sx={{ whiteSpace: 'nowarp' }} className="tx-nowrap">
              {t('ncrm_common_the_day')}
            </Typography>
            <Typography sx={{ mr: 1, ml: 1 }} className="mg-x-10">
              {yearlyDayMonth?.label}
            </Typography>
            <Typography sx={{ mr: 1 }} className="mg-r-10">
              {yearlyDay?.label}
            </Typography>
          </Box>
        )}
      </Box>
    );
  }, [scheduleValue]);

  const onChangeUse = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    //call api to update use = false
  };
  return (
    <Box sx={{ display: 'flex', flex: 1 }}>
      <Switch value={scheduleValue.use} onChange={onChangeUse} />
      
    </Box>
  );
};

export default View;
