import { useCallback, useEffect, useState } from 'react';

// mui import
import { Box, Grid, Stack, Switch, Typography } from '@mui/material';

import { Repeat } from '@base/components/@hanbiro/RepeatTime';
import { useTranslation } from 'react-i18next';
import { MONTHS, RECURRENCES, RECURRENCE_TYPE, RECURRENCE_TYPE_LABEL, weekLabel } from '@base/components/@hanbiro/RepeatTime/configs';
import { LabelValue } from '@base/types/app';
import { daysInMonth, getStrToReDays, getWeekOfMonth } from '@base/components/@hanbiro/RepeatTime/utils';
import { CommonViewProps } from '../Common/interface';

interface ViewProps extends CommonViewProps {
  value: Repeat;
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value: scheduleValue } = props;
  console.log(`~~~~ RepeatValue`, scheduleValue);
  const renderRecurrenceType = useCallback(() => {
    const item = RECURRENCES.find((v: LabelValue) => v.value == scheduleValue.type);
    return t(item?.label ?? '');
  }, [scheduleValue]);

  const renderRecurrenceEvery = useCallback(() => {
    const unit = RECURRENCE_TYPE_LABEL[scheduleValue.type];
    const everyNrString = scheduleValue.everyNr ?? '';
    return everyNrString ? everyNrString + ' ' + t(unit) : null;
  }, [scheduleValue]);

  const renderWeekdayOptions = useCallback(() => {
    const DAY_OPTIONS: LabelValue[] = getStrToReDays(scheduleValue.weekdays);

    return (
      <Box sx={{ display: 'flex', flexWarp: 'warp', width: '100%' }}>
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
  const RenderDetailString = () => {
    const typeString = renderRecurrenceType() ?? '';
    const everyNrString = renderRecurrenceEvery() ? '/' + renderRecurrenceEvery() : '';
    let renderOptionsString = '';
    // switch (scheduleValue?.type) {
    //   case RECURRENCE_TYPE.daily: {

    //     break;
    //   }
    //   default:
    //     break;
    // }
    const DAY_OPTIONS: LabelValue[] = getStrToReDays(scheduleValue.weekdays);
    console.log(`~~~~DAY_OPTION`, DAY_OPTIONS, scheduleValue);
    renderOptionsString =
      `${DAY_OPTIONS.length > 0 ? '/Every ' : ''}` +
      DAY_OPTIONS.map((i: LabelValue) => {
        if (i.extra) return t(i.label);
      }).join(' ');
    let extraOpts: string[] = [];
    if (scheduleValue?.yearlyWeek) extraOpts.push(`, ${t(weekLabel[scheduleValue?.yearlyWeek])} ${t('ncrm_common_week')}`);
    if (scheduleValue?.yearlyWeekMonth) extraOpts.push(`, ${t(MONTHS[scheduleValue?.yearlyWeekMonth].label)}`);
    return (
      <Typography
        sx={{ wordBreak: 'break-word', display: 'flex', alignItems: 'center' }}
      >{`${typeString}${everyNrString}${renderOptionsString}${extraOpts.join('')}`}</Typography>
    );
  };
  return (
    <Grid container sx={{ width: '100%' }}>
      <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <Switch checked={scheduleValue.use} />
      </Grid>

      {/* {!scheduleValue.use && <label>{t('ncrm_common_not_use')}</label>} */}
      {scheduleValue.use && (
        <Grid item xs={9} sx={{ display: 'flex', alignItems: 'center' }}>
          {RenderDetailString()}
        </Grid>
      )}
    </Grid>
  );
};

export default View;
