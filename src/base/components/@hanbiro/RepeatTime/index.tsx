import React, { useCallback, ChangeEvent, useMemo } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import DatePicker from '@base/components/@hanbiro/Date/DatePicker';
import { RECURRENCES, RECURRENCE_TYPE, RECURRENCE_TYPE_LABEL, MONTHS, weekLabel } from './configs';
import { getStrToReDays, getReDaysToStr, getWeekOfMonth, daysInMonth } from './utils';
import _ from 'lodash';
import { LabelValue } from '@base/types/app';
import TimeRangePicker from '@base/components/@hanbiro/Date/TimeRangePicker';
import { useTranslation } from 'react-i18next';

export interface Repeat {
  use: boolean;
  type: string;
  startTime: string;
  endTime: string;
  everyNr: number;
  weekdays: string;
  //monthly
  monthlyOption: string; //or 'day', 'last'
  monthlyWeek: number;
  monthlyDay: number;
  //yearly
  yearlyOption: string; //or 'day'
  yearlyWeekMonth: number;
  yearlyDayMonth: number;
  yearlyWeek: number;
  yearlyDay: number;

  typeEnd: string;
  endAfterTimes: number;
  endOnTime: string;
}

interface RepeatTimeEditProps {
  value: Repeat;
  onChange: (val: Repeat) => void;
}

const RepeatTime = (props: RepeatTimeEditProps) => {
  const { value: scheduleValue, onChange } = props;
  console.log('...REPEATTIME.value...', scheduleValue);
  const { t } = useTranslation();
  const theme = useTheme();
  //value change
  const handleValueChange = (keyAttribute: keyof Repeat | 'time', newValue: any) => {
    const newScheduleValue = _.clone(scheduleValue) as any;
    if (keyAttribute === 'time') {
      newScheduleValue.startTime = newValue?.startTime || '';
      newScheduleValue.endTime = newValue?.endTime || '';
    } else {
      newScheduleValue[keyAttribute] = newValue;
    }
    //callback
    onChange && onChange(newScheduleValue);
  };

  //enable
  const handleRepeatChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...scheduleValue, use: e.currentTarget.checked });
  };

  /** ======================================== RENDER ============================================= */

  //recurrency type
  const RecurrenceType = useMemo(() => {
    return (
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="recurrence type radio"
          value={scheduleValue.type}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleValueChange('type', e.target.value)}
          name="radio-recurrence-rype"
          row
        >
          {RECURRENCES.map((_item, _index) => (
            <FormControlLabel key={_item.value} value={_item.value} control={<Radio />} label={t(_item.label)} />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }, [scheduleValue]);

  //start, end time
  const RecurrenceTime = useMemo(() => {
    return (
      <TimeRangePicker
        customLabelStart={<SpanLang keyLang={'ncrm_common_start_time'} />}
        customLabelEnd={<SpanLang keyLang={'ncrm_common_end_time'} />}
        value={{ startTime: scheduleValue.startTime, endTime: scheduleValue.endTime }}
        onChange={(newTime: any) => handleValueChange('time', newTime)}
      />
    );
  }, [scheduleValue]);

  //every number
  const RecurrenceEvery = useMemo(() => {
    //scheduleValue.type === RECURRENCE_TYPE.yearly
    const weekOptions: LabelValue[] = getWeekOfMonth(new Date());

    return (
      <>
        {scheduleValue.type !== RECURRENCE_TYPE.weekly && (
          <TextField
            size="small"
            fullWidth={false}
            type="number"
            id="recurrence-every-input"
            // disabled={data?.dateSelectedType !== 'AR_ATTRIBUTE_DATE_SELECTED_BEFORE_DATE'}
            sx={{
              ml: 1,
              minWidth: '100px',
              '& .MuiOutlinedInput-root': {
                pr: 0
              }
            }}
            InputProps={{
              inputProps: { min: 1, max: 12 },
              // endAdornment: t(RECURRENCE_TYPE_LABEL[scheduleValue.type])
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    backgroundColor: theme.palette.secondary.light,
                    color: theme.palette.text.primary,
                    padding: '20px 8px',
                    borderTopRightRadius: theme.shape.borderRadius + 'px',
                    borderBottomRightRadius: theme.shape.borderRadius + 'px'
                  }}
                >
                  <Typography color="inherit">{t(RECURRENCE_TYPE_LABEL[scheduleValue.type])}</Typography>
                </InputAdornment>
              )
            }}
            value={scheduleValue.everyNr}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (parseInt(e.target.value) <= 12 && parseInt(e.target.value) >= 1) {
                handleValueChange('everyNr', e.target.value);
              }
            }}
          />
        )}
        {scheduleValue.type === RECURRENCE_TYPE.weekly && (
          <>
            <Select
              sx={{ minWidth: '100px', pr: 0 }}
              size="small"
              displayEmpty
              inputProps={{ 'aria-label': 'repeat week monthly select', IconComponent: () => null }}
              endAdornment={
                <InputAdornment
                  position="end"
                  sx={{
                    backgroundColor: theme.palette.secondary.light,
                    color: theme.palette.text.primary,
                    padding: '20px 8px',
                    borderTopRightRadius: theme.shape.borderRadius + 'px',
                    borderBottomRightRadius: theme.shape.borderRadius + 'px'
                  }}
                >
                  <Typography color="inherit">{t(RECURRENCE_TYPE_LABEL[scheduleValue.type])}</Typography>
                </InputAdornment>
              }
              value={scheduleValue?.monthlyWeek?.toString()}
              onChange={(event: SelectChangeEvent) => {
                const selected = event.target.value as string;
                handleValueChange('monthlyWeek', selected);
              }}
            >
              {weekOptions.map((_option: any) => {
                return (
                  <MenuItem
                    key={_option.value}
                    value={_option.value}
                    //style={{ fontWeight: theme.typography.fontWeightRegular }}
                  >
                    {weekLabel[_option.value]}
                  </MenuItem>
                );
              })}
            </Select>
          </>
        )}
      </>
    );
  }, [scheduleValue]);

  //render weekdays option
  const WeekdayOptions = useMemo(() => {
    const DAY_OPTIONS: LabelValue[] = getStrToReDays(scheduleValue.weekdays);
    return (
      <FormControl component="fieldset">
        <FormGroup aria-label="recurrence day check" row>
          {DAY_OPTIONS?.map((_option: any, _index: number) => (
            <FormControlLabel
              key={_option.value}
              label={t(_option.label).slice(0, 3)}
              labelPlacement="end"
              sx={{
                ...(_index == 0 && {
                  ml: 0,
                  '& .MuiButtonBase-root': {
                    pl: 0
                  }
                })
              }}
              control={
                <Checkbox
                  key={`recurrenceDayCheck${_option.value}`}
                  checked={_option.extra}
                  onChange={(e) =>
                    handleValueChange(
                      'weekdays',
                      getReDaysToStr(
                        DAY_OPTIONS.map((x: LabelValue) => ({
                          ...x,
                          extra: x.value === _option.value ? !x.extra : x.extra
                        }))
                      )
                    )
                  }
                />
              }
            />
          ))}
        </FormGroup>
      </FormControl>
    );
  }, [scheduleValue]);

  //render monthly
  const MonthlyRecurrence = useMemo(() => {
    const dayOptions: LabelValue[] = daysInMonth(new Date().getMonth() + 1);
    const weekOptions: LabelValue[] = getWeekOfMonth(new Date());
    const dayOfWeekOptions: LabelValue[] = getStrToReDays(scheduleValue.weekdays);
    const valueDayofWeek: any = dayOfWeekOptions.find((day) => day.extra)?.value ?? null;
    return (
      <Stack marginLeft={-1.25} spacing={0.5}>
        <Stack direction={'row'} spacing={0.5} alignItems="center">
          {/* <FormControl component="fieldset">
            <RadioGroup aria-label="the week" name="recurrenceDayRadio1" row>
              <FormControlLabel
                value="week"
                control={
                  <Radio
                    id="recurrenceDayRadio1"
                    name="recurrenceDayRadio1"
                    checked={scheduleValue.monthlyOption === 'week'}
                    onChange={(e) => handleValueChange('monthlyOption', 'week')}
                  />
                }
                label={t('ncrm_common_the_week')}
              />
            </RadioGroup>
          </FormControl> */}
          <Radio
            id="recurrenceDayRadio1"
            name="recurrenceDayRadio1"
            checked={scheduleValue.monthlyOption === 'week'}
            onChange={(e) => handleValueChange('monthlyOption', 'week')}
          />
          <Select
            sx={{ minWidth: '100px' }}
            displayEmpty
            inputProps={{ 'aria-label': 'repeat week monthly select' }}
            value={scheduleValue?.monthlyWeek?.toString()}
            onChange={(event: SelectChangeEvent) => {
              const selected = event.target.value as string;
              handleValueChange('monthlyWeek', selected);
            }}
          >
            {weekOptions.map((_option: any) => {
              return (
                <MenuItem
                  key={_option.value}
                  value={_option.value}
                  //style={{ fontWeight: theme.typography.fontWeightRegular }}
                >
                  On {weekLabel[_option.value]}
                </MenuItem>
              );
            })}
          </Select>
          <Select
            sx={{ minWidth: '100px' }}
            displayEmpty
            inputProps={{ 'aria-label': 'repeat week yearly select' }}
            value={valueDayofWeek}
            onChange={(event: SelectChangeEvent) => {
              const selected = event.target.value as string;
              handleValueChange(
                'weekdays',
                getReDaysToStr(
                  dayOfWeekOptions.map((x: LabelValue) => ({
                    ...x,
                    extra: x.value === selected ? true : false
                  }))
                )
              );
            }}
          >
            {dayOfWeekOptions.map((_option: any) => {
              return (
                <MenuItem
                  key={_option.value}
                  value={_option.value}
                  //style={{ fontWeight: theme.typography.fontWeightRegular }}
                >
                  {t(_option.label)}
                </MenuItem>
              );
            })}
          </Select>
        </Stack>
        <Stack direction={'row'} spacing={0.5}>
          {/* <FormControl component="fieldset">
            <RadioGroup aria-label="the day" name="recurrenceDayRadio2" row>
              <FormControlLabel
                value="day"
                control={
                  <Radio
                    id="recurrenceDayRadio2"
                    name="recurrenceDayRadio2"
                    checked={scheduleValue.monthlyOption === 'day'}
                    onChange={(e) => handleValueChange('monthlyOption', 'day')}
                  />
                }
                label={t('ncrm_common_the_day')}
              />
            </RadioGroup>
          </FormControl> */}
          <Radio
            id="recurrenceDayRadio2"
            name="recurrenceDayRadio2"
            checked={scheduleValue.monthlyOption === 'day'}
            onChange={(e) => handleValueChange('monthlyOption', 'day')}
          />
          <Select
            sx={{ minWidth: '100px' }}
            displayEmpty
            inputProps={{ 'aria-label': 'repeat day monthly select' }}
            value={scheduleValue?.monthlyDay?.toString()}
            onChange={(event: SelectChangeEvent) => {
              const selected = event.target.value as string;
              handleValueChange('monthlyDay', selected);
            }}
          >
            {dayOptions.map((_option: any) => {
              return (
                <MenuItem
                  key={_option.value}
                  value={_option.value}
                  //style={{ fontWeight: theme.typography.fontWeightRegular }}
                >
                  On {t(_option.label)}
                </MenuItem>
              );
            })}
          </Select>
        </Stack>
        {/* <Stack direction={'row'} spacing={0.5}>
          <FormControl component="fieldset">
            <RadioGroup aria-label="the last day" name="recurrenceDayRadio3" row>
              <FormControlLabel
                value="last"
                control={
                  <Radio
                    id="recurrenceDayRadio3"
                    name="recurrenceDayRadio3"
                    checked={scheduleValue.monthlyOption === 'last'}
                    onChange={(e) => handleValueChange('monthlyOption', 'last')}
                  />
                }
                label={t('ncrm_common_the_last_day')}
              />
            </RadioGroup>
          </FormControl>
        </Stack> */}
      </Stack>
    );
  }, [scheduleValue]);

  //render yearly
  const YearlyRecurrence = useMemo(() => {
    const dayOptions: LabelValue[] = daysInMonth(scheduleValue?.yearlyDayMonth ?? 1);
    const weekOptions: LabelValue[] = getWeekOfMonth(new Date());
    const dayOfWeekOptions: LabelValue[] = getStrToReDays(scheduleValue.weekdays);
    const valueDayofWeek: any = dayOfWeekOptions.find((day) => day.extra)?.value ?? '1';

    return (
      <Stack marginLeft={-1.25} spacing={0.5}>
        <Stack direction={'row'} spacing={0.5} alignItems="center">
          {/* <FormControl component="fieldset">
            <RadioGroup aria-label="the week" name="recurrenceYearRadio1" row>
              <FormControlLabel
                value="week"
                control={
                  <Radio
                    id="recurrenceYearRadio1"
                    name="recurrenceYearRadio1"
                    checked={scheduleValue.yearlyOption === 'week'}
                    onChange={(e) => handleValueChange('yearlyOption', 'week')}
                  />
                }
                label={t('ncrm_common_the_week')}
              />
            </RadioGroup>
          </FormControl> */}
          <Radio
            id="recurrenceYearRadio1"
            name="recurrenceYearRadio1"
            checked={scheduleValue.yearlyOption === 'week'}
            onChange={(e) => handleValueChange('yearlyOption', 'week')}
          />
          <Select
            sx={{ minWidth: '100px' }}
            displayEmpty
            inputProps={{ 'aria-label': 'repeat week yearly select' }}
            value={scheduleValue?.yearlyWeek?.toString()}
            onChange={(event: SelectChangeEvent) => {
              const selected = event.target.value as string;
              handleValueChange('yearlyWeek', selected);
            }}
          >
            {weekOptions.map((_option: any) => {
              return (
                <MenuItem
                  key={_option.value}
                  value={_option.value}
                  //style={{ fontWeight: theme.typography.fontWeightRegular }}
                >
                  {t(weekLabel[_option.value])}
                </MenuItem>
              );
            })}
          </Select>
          <Select
            sx={{ minWidth: '100px' }}
            displayEmpty
            inputProps={{ 'aria-label': 'repeat week yearly select' }}
            value={valueDayofWeek}
            onChange={(event: SelectChangeEvent) => {
              const selected = event.target.value as string;

              handleValueChange(
                'weekdays',
                getReDaysToStr(
                  dayOfWeekOptions.map((x: LabelValue) => ({
                    ...x,
                    extra: x.value === selected ? true : false
                  }))
                )
              );
            }}
          >
            {dayOfWeekOptions.map((_option: any) => {
              return (
                <MenuItem
                  key={_option.value}
                  value={_option.value}
                  //style={{ fontWeight: theme.typography.fontWeightRegular }}
                >
                  {t(_option.label)}
                </MenuItem>
              );
            })}
          </Select>
          <Select
            sx={{ minWidth: '100px' }}
            displayEmpty
            inputProps={{ 'aria-label': 'repeat week month yearly select' }}
            value={scheduleValue?.yearlyWeekMonth?.toString()}
            onChange={(event: SelectChangeEvent) => {
              const selected = event.target.value as string;
              handleValueChange('yearlyWeekMonth', selected);
            }}
          >
            {MONTHS.map((_option: any) => {
              return (
                <MenuItem
                  key={_option.value}
                  value={_option.value}
                  //style={{ fontWeight: theme.typography.fontWeightRegular }}
                >
                  {t(_option.label)}
                </MenuItem>
              );
            })}
          </Select>
        </Stack>
        <Stack direction={'row'} spacing={0.5} alignItems="center">
          {/* <FormControl component="fieldset">
            <RadioGroup aria-label="the day" name="recurrenceYearRadio2" row>
              <FormControlLabel
                value="day"
                control={
                  <Radio
                    id="recurrenceYearRadio2"
                    name="recurrenceYearRadio2"
                    checked={scheduleValue.yearlyOption === 'day'}
                    onChange={(e) => handleValueChange('yearlyOption', 'day')}
                  />
                }
                label={t('ncrm_common_the_day')}
              />
            </RadioGroup>
          </FormControl> */}
          <Radio
            id="recurrenceYearRadio2"
            name="recurrenceYearRadio2"
            checked={scheduleValue.yearlyOption === 'day'}
            onChange={(e) => handleValueChange('yearlyOption', 'day')}
          />
          <Select
            sx={{ minWidth: '100px' }}
            displayEmpty
            inputProps={{ 'aria-label': 'repeat day month yearly select' }}
            value={scheduleValue?.yearlyDayMonth?.toString()}
            onChange={(event: SelectChangeEvent) => {
              const selected = event.target.value as string;
              handleValueChange('yearlyDayMonth', selected);
            }}
          >
            {MONTHS.map((_option: any) => {
              return (
                <MenuItem
                  key={_option.value}
                  value={_option.value}
                  //style={{ fontWeight: theme.typography.fontWeightRegular }}
                >
                  {t(_option.label)}
                </MenuItem>
              );
            })}
          </Select>
          <Select
            sx={{ minWidth: '100px' }}
            displayEmpty
            inputProps={{ 'aria-label': 'repeat day yearly select' }}
            value={scheduleValue?.yearlyDay?.toString()}
            onChange={(event: SelectChangeEvent) => {
              const selected = event.target.value as string;
              handleValueChange('yearlyDay', selected);
            }}
          >
            {dayOptions.map((_option: any) => {
              return (
                <MenuItem
                  key={_option.value}
                  value={_option.value}
                  //style={{ fontWeight: theme.typography.fontWeightRegular }}
                >
                  On {t(_option.label)}
                </MenuItem>
              );
            })}
          </Select>
        </Stack>
      </Stack>
    );
  }, [scheduleValue]);

  const EndsRecurrence = useMemo(() => {
    return (
      <RadioGroup
        sx={{ flexWrap: 'nowrap' }}
        value={scheduleValue.typeEnd}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleValueChange('typeEnd', e.target.value)}
        row
      >
        <FormControlLabel value="END_NERVER" control={<Radio />} label={'Never'} />
        <FormControlLabel
          value="END_AFTER_TIMES"
          control={<Radio />}
          label={
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography>After</Typography>
              <TextField
                type="number"
                size="small"
                // disabled={data?.dateSelectedType !== 'AR_ATTRIBUTE_DATE_SELECTED_BEFORE_DATE'}
                sx={{
                  ml: 1,
                  '& .MuiOutlinedInput-root': {
                    pr: 0
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        backgroundColor: theme.palette.secondary.light,
                        color: theme.palette.text.primary,
                        padding: '20px 8px',
                        borderTopRightRadius: theme.shape.borderRadius + 'px',
                        borderBottomRightRadius: theme.shape.borderRadius + 'px'
                      }}
                    >
                      <Typography color="inherit">times</Typography>
                    </InputAdornment>
                  )
                }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (parseInt(e.target.value) >= 0) {
                    handleValueChange('endAfterTimes', e.target.value);
                  }
                }}
                value={scheduleValue?.endAfterTimes ?? 0}
              />
            </Stack>
          }
        />
        <FormControlLabel
          value="END_ON_DATE"
          control={<Radio />}
          label={
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography>On</Typography>
              <DatePicker
                value={new Date(scheduleValue?.endOnTime ?? '01 Jan 1970 00:00:00 GMT')}
                onChange={(date: any) => {
                  if (date) {
                    const newDate = new Date(date);
                    handleValueChange('endOnTime', newDate.toISOString());
                    // handleChangeTime(newDate);
                    // console.log('date timepicker:', date);
                  }
                }}
              />
            </Stack>
          }
        />
      </RadioGroup>
    );
  }, [scheduleValue]);

  //console.log('scheduleValue', scheduleValue);
  //render
  return (
    <Stack sx={{ px: 1, maxWidth: '100%' }}>
      <Stack direction="row" alignItems={'center'}>
        <InputLabel>
          <SpanLang keyLang={'ncrm_common_use'} />
        </InputLabel>
        <Switch id="repeatTaskSwitch" checked={scheduleValue.use || false} onChange={handleRepeatChange} />
      </Stack>
      {scheduleValue.use && (
        <Stack spacing={1}>
          <Stack spacing={0.5} justifyContent="center">
            <InputLabel>
              <SpanLang keyLang={'ncrm_common_recurrence'} />
            </InputLabel>
            {RecurrenceType}
          </Stack>
          {/* <Stack spacing={0.5}>{scheduleValue.type === RECURRENCE_TYPE.hourly && RecurrenceTime}</Stack> */}
          <Stack spacing={0.5}>
            {/* <InputLabel>
              <SpanLang keyLang={'ncrm_common_days'} />
            </InputLabel> */}
            <Stack spacing={0.5}>
              <Stack spacing={0.5}>
                <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
                  <InputLabel>
                    <SpanLang keyLang={'ncrm_common_every'} />
                  </InputLabel>
                  {scheduleValue.type !== RECURRENCE_TYPE.hourly && scheduleValue.type !== RECURRENCE_TYPE.daily && RecurrenceEvery}
                </Stack>
                <Stack>
                  {scheduleValue.type !== RECURRENCE_TYPE.monthly && scheduleValue.type !== RECURRENCE_TYPE.yearly && WeekdayOptions}
                </Stack>
              </Stack>

              <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
                {scheduleValue.type === RECURRENCE_TYPE.monthly && MonthlyRecurrence}
              </Stack>
              <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
                {scheduleValue.type === RECURRENCE_TYPE.yearly && YearlyRecurrence}
              </Stack>
            </Stack>
            <Stack spacing={0.5}>
              <InputLabel>
                <SpanLang keyLang={'Ends'} />
              </InputLabel>
              <Stack direction={'row'} alignItems={'center'}>
                {EndsRecurrence}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default RepeatTime;
