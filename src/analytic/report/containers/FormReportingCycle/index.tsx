import { includes, keys, padStart, range } from 'lodash';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { ERepeatUnit } from '@analytic/main/types/enum';
import { repeatUnitOptions, weekDayOptions } from '@analytic/main/config/options';
import { Box, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import MuiTimePicker from '@base/components/@hanbiro/Date/TimePicker';
import { useTranslation } from 'react-i18next';
interface ReportingCycleProps {
  value?: any;
  onChange?: (v: any) => void;
}

const ReportingCycle: React.FC<ReportingCycleProps> = (props: ReportingCycleProps) => {
  const { onChange, value } = props;
  const { t } = useTranslation();
  const { frequency: iFrequency, monthAt: iMonthAt, dayAt: iDayAt, timeAt: iTimeAt } = value ?? {};

  const defaultFrequency = !!iFrequency
    ? {
        value: iFrequency,
        label: repeatUnitOptions[iFrequency]
      }
    : {
        value: ERepeatUnit.REPEAT_UNIT_MONTHLY,
        label: repeatUnitOptions[ERepeatUnit.REPEAT_UNIT_MONTHLY]
      };

  const [frequency, setFrequency] = useState<any>(defaultFrequency.value);
  const [monthAt, setMonthAt] = useState<number>(iMonthAt ?? 1);
  const [dayAt, setDayAt] = useState<number>(iDayAt ?? 1);
  const [timeAt, setTimeAt] = useState<string>(iTimeAt ?? dayjs().format('HH:mm'));

  const dayOptions = range(1, 32).map((k, i) => ({ label: padStart(k.toString(), 2, '0'), value: k }));
  const monthOptions = range(1, 13).map((k, i) => ({ label: padStart(k.toString(), 2, '0'), value: k }));

  useEffect(() => {
    let oValue: any = {
      frequency: frequency,
      timeAt
    };
    if (includes([ERepeatUnit.REPEAT_UNIT_WEEKLY, ERepeatUnit.REPEAT_UNIT_MONTHLY], frequency)) {
      oValue = { ...oValue, dayAt };
    } else if (frequency === ERepeatUnit.REPEAT_UNIT_YEARLY) {
      oValue = { ...oValue, monthAt, dayAt };
    }
    onChange && onChange(oValue);
  }, [frequency, timeAt, dayAt, monthAt]);

  return (
    <>
      <Typography sx={{ color: orange[500] }} mb={5}>
        {t('ncrm_dashboard_report_form_msg_report_generate_base_on_schedule')}
      </Typography>
      <Grid container sx={{ alignItems: 'center' }}>
        <Grid item xs={2}>
          <Typography>{t('ncrm_common_requency')}: </Typography>
        </Grid>
        <Grid item xs={10}>
          <FormControl sx={{ width: 150 }}>
            <Select value={frequency} fullWidth onChange={(e: any, v: any) => setFrequency(v.props.value)}>
              {keys(repeatUnitOptions).map((k: any, idx: number) => (
                <MenuItem key={idx} value={k}>
                  {t(repeatUnitOptions[k])}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container sx={{ alignItems: 'start', pt: 2 }}>
        <Grid item xs={2}>
          <Typography mt={1}>{t('ncrm_common_every')}: </Typography>
        </Grid>
        <Grid item xs={10} sx={{ display: 'flex', flexDirection: frequency === ERepeatUnit.REPEAT_UNIT_WEEKLY ? 'column' : 'row' }}>
          {frequency === ERepeatUnit.REPEAT_UNIT_WEEKLY && (
            <FormControl sx={{ mb: 1 }}>
              <RadioGroup row value={dayAt} onChange={(e: any, v: any) => setDayAt(parseInt(v))}>
                {keys(weekDayOptions).map((k: any, i: number) => (
                  <FormControlLabel
                    key={i}
                    control={<Radio />}
                    label={t(weekDayOptions[k])}
                    value={parseInt(k)}
                    sx={{ mr: 1, span: { padding: '5px' } }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}
          {includes([ERepeatUnit.REPEAT_UNIT_YEARLY, ERepeatUnit.REPEAT_UNIT_MONTHLY], frequency) && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {frequency === ERepeatUnit.REPEAT_UNIT_YEARLY && (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '150px' }}>
                    <FormControl fullWidth>
                      <InputLabel id="select-day-label">Month</InputLabel>
                      <Select value={monthAt} onChange={(e: any, v: any) => setMonthAt(v.props.value)} fullWidth label="Month">
                        {monthOptions.map((k: any, idx: number) => (
                          <MenuItem key={idx} value={k.value}>
                            {k.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Typography mx={1}>/</Typography>
                  </Box>
                </Box>
              )}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '150px' }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-day-label">Day</InputLabel>
                    <Select
                      labelId="select-day-label"
                      value={dayAt ?? 1}
                      onChange={(e: any, v: any) => setDayAt(v.props.value)}
                      fullWidth
                      label="Day"
                    >
                      {dayOptions.map((k: any, idx: number) => (
                        <MenuItem key={idx} value={k.value}>
                          {k.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Typography mx={1}>|</Typography>
                </Box>
              </Box>
            </Box>
          )}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <MuiTimePicker value={timeAt} onChange={(v: any) => setTimeAt(v)} label="Time" />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ReportingCycle;
