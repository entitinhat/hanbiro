import { useEffect, useState } from 'react';
import { Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { isEqual } from 'lodash';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { parseStrTimeToDate } from './utils';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

interface DateRangePickerProps {
  hideTitle?: boolean;
  customLabelStart?: string | React.ReactElement;
  customLabelEnd?: string | React.ReactElement;
  value: any;
  onChange: (time: any) => void;
}

const TimeRangePicker = (props: DateRangePickerProps) => {
  const { hideTitle = false, customLabelStart, customLabelEnd, value, onChange } = props;
  const { t } = useTranslation();
  //state
  const [crrValue, setCrrValue] = useState<any>(null);
  // const [minMaxStart, setMinMaxStart] = useState<any>({
  //   minTime: null,
  //   maxTime: value?.endTime || null,
  // });
  // const [minMaxEnd, setMinMaxEnd] = useState<any>({
  //   minTime: value?.startTime || null,
  //   maxTime: null,
  // });

  //init
  useEffect(() => {
    function initValue() {
      if (crrValue === null) {
        setCrrValue({
          startTime: parseStrTimeToDate('00:00'),
          endTime: parseStrTimeToDate('23:59')
        });
      }
    }
    if (value) {
      if (value.startTime !== '' && value.endTime !== '') {
        const inputValue = {
          startTime: parseStrTimeToDate(value.startTime),
          endTime: parseStrTimeToDate(value.endTime)
        };
        if (!isEqual(inputValue, crrValue)) {
          setCrrValue(inputValue);
        }
      }
      if (value.startTime === '' && value.endTime === '') {
        initValue();
      }
    } else {
      initValue();
    }
  }, [value]);

  //value change
  const handleChangeTime = (_value: Date | null, _type: string) => {
    if (_value) {
      const valueClone = new Date(_value);
      const newDateTimeData = {
        ...crrValue,
        [_type]: valueClone
      };
      const newTimeData = {
        ...value,
        [_type]: `${valueClone.getHours()}:${valueClone.getMinutes()}`
      };
      setCrrValue(newDateTimeData);
      //callback
      onChange && onChange(newTimeData);
    }
  };


  //set min, max
  // const handleMinMax = (_data: any) => {
  //   const { startTime = '', endTime = '' } = _data;
  //   const rs: any = getMinMax(startTime, endTime);
  //   setMinMaxStart(rs?.minMaxStart);
  //   setMinMaxEnd(rs?.minMaxEnd);
  // };

  //console.log('time crrValue', crrValue);
  return (
    <Grid container spacing={2} alignItems="center">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid item xs={12} lg={5.5}>
          <Stack direction={'row'} spacing={2} alignItems="center">
            {!hideTitle && <InputLabel>{customLabelStart ? customLabelStart : t('ncrm_common_start')}</InputLabel>}
            <TimePicker
              //label="Time"
              value={crrValue?.startTime || null} //format: Date | null
              onChange={(date: Date | null) => handleChangeTime(date, 'startTime')}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} lg={1}>
          <Typography variant="h6" textAlign="center">
            ~
          </Typography>
        </Grid>
        <Grid item xs={12} lg={5.5}>
          <Stack direction={'row'} spacing={2} alignItems="center">
            {!hideTitle && <InputLabel>{customLabelEnd ? customLabelEnd : t('ncrm_common_end')}</InputLabel>}
            <TimePicker
              //label="Time"
              value={crrValue?.endTime || null} //format: Date | null
              onChange={(date: Date | null) => handleChangeTime(date, 'endTime')}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </Grid>
      </LocalizationProvider>
    </Grid>
  );
};

export default TimeRangePicker;
